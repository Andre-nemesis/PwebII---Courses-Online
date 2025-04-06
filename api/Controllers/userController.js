import db from '../models/index.js';
import sendResetPasswordEmail from '../service/emailService.js';
import bcrypt from 'bcrypt';

const userController = {
  async getAll(req, res) {
    try {
      const users = await db.Users.findAll({
        include: [
          { model: db.Students, attributes: ['id'] },
          { model: db.Teachers, attributes: ['id'] },
          { model: db.Admin, attributes: ['id'] }
        ]
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await db.Users.findByPk(id, {
        include: [
          { model: db.Students, attributes: ['id'] },
          { model: db.Teachers, attributes: ['id'] },
          { model: db.Admin, attributes: ['id'] }
        ]
      });

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const newUser = await db.Users.create({ name, email, password, type });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await db.Users.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.update({ name, email, password });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await db.Users.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.destroy();
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
  },

  async searchUserByEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await db.Users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      const link = await sendResetPasswordEmail(email, user.id);
      res.status(200).json({ message: 'E-mail enviado com sucesso.',link });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
  },

  async resetPassword(req, res) {
    try {
      const { id, password } = req.body;
      const user = await db.Users.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await user.update({ password:hashedPassword });
      res.json({ message: 'Senha modificada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao resetar senha', details: error.message });
    }
  }
};

export default userController;
