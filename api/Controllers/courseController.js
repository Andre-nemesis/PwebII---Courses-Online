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
        include: [{
          model: db.Module,
          as: 'Modules',
          through: {
            attributes: [], 
          },
        }]
      });
  
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
  
      res.json({
        courseName: course.name,
        modules: course.Modules || [] 
      });
    } catch (error) {
      console.error('Erro no backend:', error.stack);
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

  async getCountCoursesByAdmin(req, res) {
    try {
      const countCourses = await db.Course.findAll({
        attributes: [
          [db.Sequelize.fn('COUNT', db.Sequelize.col('admin_id')), 'courseCount'],
          [db.Sequelize.col('Author.User.name'), 'userName']
        ],
        include: [
          {
            model: db.Admin,
            as: 'Author',
            where: { role: 'content_manager' },
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
        order: [[db.Sequelize.literal('courseCount'), 'DESC']],
        raw: true 
      });
  
      res.json({ countCourses: result });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao contar cursos de todos os administradores', details: error.message });
    }
  },

  async getCourseStudentCount(req, res) {
    try {
      const courseStudentCount = await db.Course.findAll({
        attributes: [
          ['name', 'courseName'],  
          [db.Sequelize.fn('COUNT', db.Sequelize.col('Students.id')), 'studentCount'] 
        ],
        include: [
          {
            model: db.Student,
            as: 'Students',
            attributes: [], 
            through: { attributes: [] } 
          }
        ],
        group: ['Course.id', 'Course.name'], 
        order: [[db.Sequelize.literal('studentCount'), 'DESC']], 
        raw: true
      });
  
      res.json({ courses: courseStudentCount });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao contar estudantes por curso', details: error.message });
    }
  },

  async getCourseModuleCount(req, res) {
    try {
      const courseModuleCount = await db.Course.findAll({
        attributes: [
          ['name', 'courseName'],  
          [db.Sequelize.fn('COUNT', db.Sequelize.col('Modules.id')), 'moduleCount'] 
        ],
        include: [
          {
            model: db.Module,
            as: 'Modules',
            attributes: [], 
            through: { attributes: [] } 
          }
        ],
        group: ['Course.id', 'Course.name'], 
        order: [[db.Sequelize.literal('moduleCount'), 'DESC']], 
        raw: true
      });
  
      res.json({ courses: courseModuleCount });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao contar módulos por curso', details: error.message });
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
