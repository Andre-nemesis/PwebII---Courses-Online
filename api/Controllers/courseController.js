import db from '../models/index.js';

const courseController = {
  async getAll(req, res) {
    try {
      const courses = await db.Course.findAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cursos', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const course = await db.Course.findByPk(id, {
        include: [
          { model: db.Student, through: 'Student_course', attributes: ['id', 'name'] },
          { model: db.Teacher, attributes: ['id', 'academic_formation'] },
          { model: db.Module, through: 'Course_module', attributes: ['id', 'name'] }
        ]
      });

      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar curso', details: error.message });
    }
  },

  async getModulesByCourseId(req, res) {
    try {
      const { id } = req.params;
      const course = await db.Course.findByPk(id, {
        include: [{ model: db.Module, through: 'Course_module', attributes: ['id', 'name', 'description'] }]
      });

      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      res.json(course.Modules);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar módulos do curso', details: error.message });
    }
  },

  async getCourseByStudentId(req, res) {
    const studentId = req.params.id;
  
    try {
      const courses = await db.Course.findAll({
        include: [
          {
            model: db.Student,
            where: { id: studentId }, 
            through: { attributes: [] }, 
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
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: 'Não há inscrições em cursos para este aluno!' });
      }
  
      res.status(200).json(courses);
    } catch (error) {
      console.error('Erro ao buscar cursos do aluno:', error.message);
      return res.status(500).json({ message: 'Ocorreu um erro ao procurar os cursos do aluno!' });
    }
  },

  async create(req, res) {
    try {
      const { name, course_duration, num_hours, percent_complete } = req.body;
      const newCourse = await db.Course.create({ name, course_duration, num_hours, percent_complete });
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar curso', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, course_duration, num_hours, percent_complete } = req.body;

      const course = await db.Course.findByPk(id);
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
      const course = await db.Course.findByPk(id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      await course.destroy();
      res.json({ message: 'Curso deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar curso', details: error.message });
    }
  }
};

export default courseController;
