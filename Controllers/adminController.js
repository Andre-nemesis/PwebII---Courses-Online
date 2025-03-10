import { Admin, User } from '../models/index.js';

const adminController = {
  async getAll(req, res) {
    try {
      const admins = await Admin.findAll({
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
      });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administradores', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findByPk(id, {
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
      });

      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administrador', details: error.message });
    }
  },

  async create(req, res) {
    try {
      const { user_id, role } = req.body;

      const newAdmin = await Admin.create({ user_id, role });

      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar administrador', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const admin = await Admin.findByPk(id);
      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      await admin.update({ role });

      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar administrador', details: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findByPk(id);
      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      await admin.destroy();
      res.json({ message: 'Administrador deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar administrador', details: error.message });
    }
  }
};

export default adminController;
