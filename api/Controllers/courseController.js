import { Course, Student, Teacher, Module } from '../models/index.js';

const courseController = {
  async getAll(req, res) {
    try {
      const courses = await Course.findAll({
        include: [
          { model: Student, through: 'Student_course', attributes: ['id', 'name'] },
          { model: Teacher, attributes: ['id', 'academic_formation'] },
          { model: Module, through: 'Course_module', attributes: ['id', 'name'] }
        ]
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cursos', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: [
          { model: Student, through: 'Student_course', attributes: ['id', 'name'] },
          { model: Teacher, attributes: ['id', 'academic_formation'] },
          { model: Module, through: 'Course_module', attributes: ['id', 'name'] }
        ]
      });

      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar curso', details: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, course_duration, num_hours, percent_complete } = req.body;
      const newCourse = await Course.create({ name, course_duration, num_hours, percent_complete });
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar curso', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, course_duration, num_hours, percent_complete } = req.body;

      const course = await Course.findByPk(id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      await course.update({ name, course_duration, num_hours, percent_complete });

      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar curso', details: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      await course.destroy();
      res.json({ message: 'Curso deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar curso', details: error.message });
    }
  }
};

export default courseController;
