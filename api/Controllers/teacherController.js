import db from '../models/index.js';

const teacherController = {
  async getAll(req, res) {
    try {
      const teachers = await db.Teachers.findAll({
        include: [
          { model: db.User, attributes: ['id', 'name', 'email'] },
          { model: db.Module, attributes: ['id', 'name'] }
        ]
      });
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professores', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const teacher = await db.Teachers.findByPk(id, {
        include: [
          { model: db.User, attributes: ['id', 'name', 'email'] },
          { model: db.Module, attributes: ['id', 'name'] }
        ]
      });

      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professor', details: error.message });
    }
  },

  async create(req, res) {
    try {
      const { user_id, academic_formation, tecnic_especialization } = req.body;

      const newTeacher = await db.Teachers.create({ user_id, academic_formation, tecnic_especialization });

      res.status(201).json(newTeacher);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar professor', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { academic_formation, bio } = req.body;

      const teacher = await db.Teacher.findByPk(id);
      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      await teacher.update({ academic_formation, bio });

      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar professor', details: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const teacher = await db.Teacher.findByPk(id);
      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      await teacher.destroy();
      res.json({ message: 'Professor deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar professor', details: error.message });
    }
  }
};

export default teacherController;
