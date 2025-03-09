import { User, Student, Teacher, Admin } from '../models/index.js';

const userController = {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: [
          { model: Student, attributes: ['id'] },
          { model: Teacher, attributes: ['id'] },
          { model: Admin, attributes: ['id'] }
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
      const user = await User.findByPk(id, {
        include: [
          { model: Student, attributes: ['id'] },
          { model: Teacher, attributes: ['id'] },
          { model: Admin, attributes: ['id'] }
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
      const newUser = await User.create({ name, email, password, type });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.update({ name, email, password });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.destroy();
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
  }
};

export default userController;
