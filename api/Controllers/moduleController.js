import { where } from 'sequelize';
import db from '../models/index.js';

const moduleController = {
  async getAll(req, res) {
    try {
      const modules = await db.Module.findAll({
        include: [
          {
            model: db.Teachers,
            as:'Author',
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
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar módulos', details: error.message });
    }
  },

  async getAllLast(req, res) {
    try {
      const {id} = req.params;
      const modules = await db.Module.findAll({
        where: {teacher_id:id},
        include: [
          {
            model: db.Teachers,
            as:'Author',
            include: [
              {
                model: db.Users,
                as: 'User',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
        order: [['id', 'DESC']],
      });
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
            as: 'Author',
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
          { model: db.Teachers, as:'Author' },
          { model: db.Course, through: 'Course_module', as:'Courses', attributes: ['id', 'name'] }
        ]
      });

      if (!module) return res.status(404).json({ error: 'Módulo não encontrado' });

      res.json(module);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar módulo', details: error.message });
    }
  },

  async getTeacherModuleCount(req, res) {
    try {
      const teacherModuleCount = await db.Module.findAll({
        attributes: [
          [db.Sequelize.fn('COUNT', db.Sequelize.col('Module.id')), 'moduleCount'],
          [db.Sequelize.col('Author.User.name'), 'userName']
        ],
        include: [
          {
            model: db.Teachers,
            as: 'Author',
            attributes: [],
            include: [
              {
                model: db.Users,
                as: 'User',
                attributes: []
              }
            ]
          }
        ],
        group: ['Author.User.name'],
        order: [[db.Sequelize.literal('moduleCount'), 'DESC']],
        raw: true
      });
  
      res.json({ teachers: teacherModuleCount });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao contar módulos por professor', details: error.message });
    }
  },
  
  

  async create(req, res) {
    try {
      const { name, teacher_id,qtd_hours } = req.body;

      const newModule = await db.Module.create({ name, teacher_id,qtd_hours });

      res.status(201).json(newModule);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar módulo', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, teacher_id, qtd_hours } = req.body;

      const module = await db.Module.findByPk(id);
      if (!module) return res.status(404).json({ error: 'Módulo não encontrado' });

      await module.update({ name, teacher_id,qtd_hours });

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
