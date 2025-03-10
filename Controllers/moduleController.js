import { Module, Teacher, Course } from '../models/index.js';

const moduleController = {
  async getAll(req, res) {
    try {
      const modules = await Module.findAll({
        include: [
          { model: Teacher, attributes: ['id', 'academic_formation'] },
          { model: Course, through: 'Course_module', attributes: ['id', 'name'] }
        ]
      });
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar módulos', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const module = await Module.findByPk(id, {
        include: [
          { model: Teacher, attributes: ['id', 'academic_formation'] },
          { model: Course, through: 'Course_module', attributes: ['id', 'name'] }
        ]
      });

      if (!module) return res.status(404).json({ error: 'Módulo não encontrado' });

      res.json(module);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar módulo', details: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, teacher_id } = req.body;

      const newModule = await Module.create({ name, teacher_id });

      res.status(201).json(newModule);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar módulo', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, teacher_id } = req.body;

      const module = await Module.findByPk(id);
      if (!module) return res.status(404).json({ error: 'Módulo não encontrado' });

      await module.update({ name, teacher_id });

      res.json(module);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar módulo', details: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const module = await Module.findByPk(id);
      if (!module) return res.status(404).json({ error: 'Módulo não encontrado' });

      await module.destroy();
      res.json({ message: 'Módulo deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar módulo', details: error.message });
    }
  }
};

export default moduleController;
