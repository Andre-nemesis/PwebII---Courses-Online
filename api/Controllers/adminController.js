import db from '../Models/index.js';

const adminController = {
  async getAll(req, res) {
    try {
      const admins = await db.Admin.findAll({
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
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
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
      });

      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administrador', details: error.message });
    }
  },

  async viewStudent(req,res){
    try{
      const students = await db.Student.findAll();
      res.status(200).json(students);
    }catch(err){
      res.status(500).json({ error: 'Erro ao buscar estudantes', details: err.message });
    }
  },

  async viewTeacher(req,res){
    try{
      const teacher = await db.Teacher.findAll();
      res.status(200).json(teacher);
    }catch(err){
      res.status(500).json({ error: 'Erro ao buscar estudantes', details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const admin = await db.Admin.findByPk(id);
      if (!admin) return res.status(404).json({ error: 'Administrador não encontrado' });

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
};

export default adminController;
