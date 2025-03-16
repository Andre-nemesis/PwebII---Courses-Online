import db from '../models/index.js';

const moduleController = {
  async getAll(req, res) {
    try {
      const modules = await db.Module.findAll();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar módulos', details: error.message });
    }
  },

  async getAllModuleForTeacherId(req, res) {
    try {
      const { id } = req.params;
      const modules = await db.Module.findAll({
        where: { teacher_id:id },
        include: [
          {
            model: db.Teachers,
            include: [
              {
                model: db.Users,
                as: 'User',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });
      if (modules.length > 0) {
        res.status(200).json(modules);
      }
      else{
        res.status(404).json({ error: 'Nenhum módulo encontrado para este professor' });
      }
      
    } catch (error) {
      res.status(404).json({ error: 'Erro ao buscar módulos', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const module = await db.Module.findByPk(id, {
        include: [
          { model: db.Teacher, attributes: ['id', 'academic_formation'] },
          { model: db.Course, through: 'Course_module', attributes: ['id', 'name'] }
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

      const newModule = await db.Module.create({ name, teacher_id });

      res.status(201).json(newModule);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar módulo', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, teacher_id } = req.body;

      const module = await db.Module.findByPk(id);
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
      const module = await db.Module.findByPk(id);
      if (!module) return res.status(404).json({ error: 'Módulo não encontrado' });

      await module.destroy();
      res.json({ message: 'Módulo deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar módulo', details: error.message });
    }
  }
};

export default moduleController;
