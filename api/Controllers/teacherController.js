import db from '../models/index.js';
import bcrypt from 'bcrypt';

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
          { model: db.User, as:'User'},
        ]
      });

      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professor', details: error.message });
    }
  },

  async searchByTerm(req, res) {
    try {
      const { term } = req.params;
      const teachers = await db.Teacher.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            {academic_formation: {[db.Sequelize.Op.like]: `%${term}%` }},
            {tecnic_especialization: {[db.Sequelize.Op.like]: `%${term}%` }},
            {user_id: {
              [db.Sequelize.Op.in]: db.Sequelize.literal(
                `(SELECT id FROM users WHERE name LIKE '%${term}%')`
              )
            }}
          ]
        },
        include: [{ model: db.Users, as: 'User' }]
      });
      if (teachers.length == 0) {
        return res.status(404).json({ error: 'Nenhum professor encontrado com esse termo' });
      }
      res.status(200).json(teachers);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao pesquisar professor', details: err.message });
    }
  },

  async create(req, res) {
    try {
      const { name, email, cpf, phone_number, academic_formation, tecnic_especialization } = req.body;

      const hashedPassword = await bcrypt.hash("12345678", 10);
      const type = "teacher";


      const newUser = await db.Users.create({ name, email, password: hashedPassword, type, cpf, phone_number });
      const user_id = newUser.id;

      const newTeacher = await db.Teachers.create({ user_id, academic_formation, tecnic_especialization });

      res.status(201).json(newTeacher);
      
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      res.status(500).json({ error: 'Erro ao cadastrar professor', details: error.message });
    }
  },

  async update(req, res) {
  async update(req, res) { // atualizar o user, depois o teacher e colocar pra ir com a máscara
    try {
      const { id } = req.params;
      const { academic_formation, tecnic_especialization } = req.body;

      const teacher = await db.Teacher.findByPk(id);
      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      await teacher.update({ academic_formation, tecnic_especialization });

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
