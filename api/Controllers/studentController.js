import { Student, User, Course, Certificate, Student_course } from '../models/index.js';

const studentController = {

  async getAll(req, res) {
    try {
      const students = await Student.findAll({
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
      const student = await Student.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'name', 'email'] },
          { model: Course, through: Student_course, attributes: ['id', 'name'] },
          { model: Certificate, attributes: ['id', 'certificate_code', 'status'] }
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

     
      const user = await User.findByPk(user_id);
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

      const student = await Student.findByPk(id);
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
      const student = await Student.findByPk(id);
      if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

      await student.destroy();
      res.json({ message: 'Estudante deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar estudante', details: error.message });
    }
  }
};

export default studentController;
