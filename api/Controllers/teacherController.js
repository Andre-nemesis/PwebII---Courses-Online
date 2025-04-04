import db from '../models/index.js';
import bcrypt from 'bcrypt';

const teacherController = {
  async getAll(req, res) {
    try {
      const teachers = await db.Teachers.findAll({
        include: [
          { model: db.Users, as: 'User' },
          { model: db.Module, as: 'Modules' }
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
          { model: db.Users, as:'User'},
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
      const teachers = await db.Teachers.findAll({
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
    try {
      const { id } = req.params;
      const { academic_formation, tecnic_especialization, user_data } = req.body;

      const teacher = await db.Teachers.findByPk(id);
      if (!teacher) return res.status(404).json({ error: 'Professor não encontrado' });

      // Atualiza teachers
      await teacher.update({ academic_formation, tecnic_especialization });

      // Atualiza users
      if (user_data) {
        await db.Users.update(
          {
            name: user_data.name,
            email: user_data.email,
            phone_number: user_data.phone_number,
            cpf: user_data.cpf,
            type: 'teacher'
          },
          { where: { id: teacher.user_id } }
        );
      }

      const updatedTeacher = await db.Teachers.findByPk(id, { 
        include: { model: db.Users, as: 'User' } 
      });

      res.json(updatedTeacher);

    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res.status(500).json({ error: 'Erro ao atualizar professor', details: error.message });
    }
  },
  
  async delete(req, res) {
    const transaction = await db.sequelize.transaction();

    try {
      const { id } = req.params;
      const teacher = await db.Teachers.findByPk(id, { transaction });
      
      if (!teacher) {
        await transaction.rollback();
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      const userId = teacher.user_id;
      await teacher.destroy({ transaction });
      await db.Users.destroy({ where: { id: userId }, transaction });
      
      await transaction.commit();
      res.json({ message: 'Professor e usuário associado deletados com sucesso' });

    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: 'Erro ao deletar professor', details: error.message });
    }
  }
};

export default teacherController;
