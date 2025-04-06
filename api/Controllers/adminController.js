import db from '../models/index.js';

const adminController = {
  async getAll(req, res) {
    try {
      const admins = await db.Admin.findAll({
        include: [{ model: db.Users, as: 'User' }]
      });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administradores', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const admin = await db.Admin.findByPk(id, {
        include: [{ model: db.Users, as: 'User' }]
      });

      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administrador', details: error.message });
    }
  },

  async searchByTerm(req, res) {
    try {
      const { term } = req.params;
      const admins = await db.Admin.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            { role: { [db.Sequelize.Op.like]: `%${term}%` } },
            {
              user_id: {
                [db.Sequelize.Op.in]: db.Sequelize.literal(
                  `(SELECT id FROM users WHERE name LIKE '%${term}%')`
                )
              }
            }
          ]
        },
        include: [{ model: db.Users, as: 'User' }]
      });
      if (admins.length == 0) {
        return res.status(404).json({ error: 'Nenhum administrador encontrado com esse termo' });
      }
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao pesquisar administradores', details: err.message });
    }
  },

  async viewStudent(req, res) {
    try {
      const students = await db.Student.findAll({
        include: [
          { model: db.Users, as: 'User' },
        ]
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estudantes', details: error.message });
    }
  },

  async viewTeacher(req, res) {
    try {
      const teachers = await db.Teachers.findAll({
        include: [
          { model: db.Users, as: 'User' },
        ]
      });
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professores', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { role, name, cpf, email, password, phone_number } = req.body;

      const admin = await db.Admin.findByPk(id);
      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      const adminUser = await db.Users.findByPk(admin.user_id);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await adminUser.update({ name, cpf, email, password:hashedPassword, phone_number });

      await admin.update({ role });

      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar administrador', details: error.message });
    }
  },

  async deleteAccount(req, res) {
    try {
      const { id } = req.params;
      const admin = await db.Admin.findByPk(id);
      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      await admin.destroy();
      res.json({ message: 'Administrador deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar administrador', details: error.message });
    }
  },

  async deleteTeacher(req, res) {
    try {
      const { id } = req.params;
      const teacher = await db.Teacher.findByPk(id);
      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      await teacher.destroy();
      res.json({ message: 'Professor deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar professor', details: error.message });
    }
  },

  async createModule(req, res) {
    try {
      const { name, teacher_id } = req.body;
      const newModule = await db.Module.create({ name, teacher_id });
      res.status(201).json(newModule);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar módulo', details: error.message });
    }
  },

  async createCourse(req, res) {
    try {
      const { name, course_duration, num_hours, percent_complete } = req.body;
      const newCourse = await db.Course.create({ name, course_duration, num_hours, percent_complete });
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar curso', details: error.message });
    }
  },

  async enrollStudent(req, res) {
    try {
      const { student_id, course_id } = req.body;
      const enrollment = await db.Student_course.create({ student_id, course_id });
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao matricular estudante no curso', details: error.message });
    }
  },

  async unenrollStudent(req, res) {
    try {
      const { student_id, course_id } = req.body;
      const enrollment = await db.Student_course.findOne({ where: { student_id, course_id } });

      if (!enrollment) return res.status(404).json({ error: 'Matrícula não encontrada' });

      await enrollment.destroy();
      res.json({ message: 'Estudante descadastrado do curso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao descadastrar estudante do curso', details: error.message });
    }
  },

  async completeCourse(req, res) {
    try {
      const { student_id, course_id } = req.body;
      const enrollment = await db.Student_course.findOne({ where: { student_id, course_id } });

      if (!enrollment) return res.status(404).json({ error: 'Matrícula não encontrada' });

      await enrollment.update({ completed: true });

      res.json({ message: 'Curso concluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao concluir curso', details: error.message });
    }
  },

  async getCourses(req, res) {
    try {
      const courses = await db.Course.findAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cursos', details: error.message });
    }
  },

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const course = await db.Course.findByPk(id);

      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });
      await course.destroy();

      res.json({ message: 'Curso deletado com sucesso' });

    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar curso', details: error.message });
    }
  },

  async assignModuleToCourse(req, res) {
    try {
      const { course_id, module_id } = req.body;
      const assignment = await db.Course_module.create({ course_id, module_id });
      res.status(201).json(assignment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao associar módulo ao curso', details: error.message });
    }
  }
};

export default adminController;
