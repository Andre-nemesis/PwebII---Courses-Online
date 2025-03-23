import db from '../models/index.js';

const studentController = {
  async getAll(req, res) {
    try {
      const students = await db.Student.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'email'] },
          { model: Course, through: Student_course, attributes: ['id', 'name'] },
          { model: Certificate, attributes: ['id', 'certificate_code', 'status'] }
        ]
      });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estudantes', details: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const student = await db.Student.findByPk(id, {
        include: [
          { model: User, as:'User'},
        ]
      });

      if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estudante', details: error.message });
    }
  },

  async create(req, res) {
    try {
      const { user_id, phone_number, city } = req.body;
      const user = await db.User.findByPk(user_id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      const newStudent = await Student.create({ user_id, phone_number, city });

      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar estudante', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { phone_number, city } = req.body;

      const student = await db.Student.findByPk(id);
      if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

      await student.update({ phone_number, city });

      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar estudante', details: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const student = await db.Student.findByPk(id);
      if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

      await student.destroy();
      res.json({ message: 'Estudante deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar estudante', details: error.message });
    }
  },

  async viewStudent(req, res) {
    try {
      const students = await db.Student.findAll({ include: [{ model: User, attributes: ['id', 'name', 'email'] }] });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao visualizar estudantes', details: error.message });
    }
  },

  async viewTeacher(req, res) {
    try {
      const teachers = await db.Teacher.findAll({ include: [{ model: User, attributes: ['id', 'name', 'email'] }] });
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao visualizar professores', details: error.message });
    }
  },

  async searchCourse(req, res) {
    try {
      const { name } = req.query;
      const courses = await db.Course.findAll({
        where: { name: { [Op.like]: `%${name}%` } }
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao pesquisar curso', details: error.message });
    }
  },

  async resetPassword(req, res) {
    try {
      const { id } = req.params;
      const { newPassword } = req.body;
      const student = await db.Student.findByPk(id, { include: [User] });

      if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

      await student.User.update({ password: newPassword });

      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao redefinir senha', details: error.message });
    }
  },

  async viewCompletedCourses(req, res) {
    try {
      const { id } = req.params;
      const completedCourses = await db.Student_course.findAll({
        where: { student_id: id, completed: true },
        include: [{ model: Course, attributes: ['id', 'name'] }]
      });
      res.json(completedCourses);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao visualizar cursos concluídos', details: error.message });
    }
  },

  async viewModules(req, res) {
    try {
      const { id } = req.params;
      const studentCourses = await db.Student_course.findAll({
        where: { student_id: id },
        include: [{ model: Course, include: [{ model: Module, attributes: ['id', 'name'] }] }]
      });

      const modules = studentCourses.flatMap(sc => sc.Course.Modules);

      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao visualizar módulos', details: error.message });
    }
  },

  async subcribeCourse(req,res){
    const {user} = req.params;
    const {id} = req.params;
    try{
      const studentCourse = await db.Student_courses.findOne({
        where: {student_id:user, course_id:id}
      });
      if(studentCourse){
        return res.status(400).json({error: 'Você já está inscrito neste curso'});
      }
      await db.Student_courses.create({student_id:user, course_id:id});
      res.status(201).json({message: 'Inscrição realizada com sucesso'});
    }
    catch(error){
      res.status(500).json({error: 'Erro ao inscrever-se no curso', details: error.message});
    }
  },
  async unsubcribeCourse(req,res){
    const {user} = req.params;
    const {id} = req.params;
    try{
      const studentCourse = await db.Student_courses.findOne({
        where: {student_id:user, course_id:id}
      });
      if(!studentCourse){
        return res.status(404).json({error: 'Você não está inscrito neste curso'});
      }
      await studentCourse.destroy();
      res.status(200).json({message: 'Inscrição cancelada com sucesso'});
    }
    catch(error){
      res.status(500).json({error: 'Erro ao cancelar inscrição no curso', details: error.message});
    }
  }
};

export default studentController;
