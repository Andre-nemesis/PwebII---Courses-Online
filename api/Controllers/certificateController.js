import db from '../models/index.js';

const certificateController = {

  //busca geral

  async getAll(req, res) {
    try {
      const certificates = await db.Certificate.findAll({
        include: [
          {
            model: db.Student, as: "Student", include: [
              { model: db.Users, as: "User" },
            ]
          },
          { model: db.Course, as: "Course" }
        ]
      });
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar certificados', details: error.message });
    }
  },

  // busca por ID

  async getById(req, res) {
    try {
      const { id } = req.params;
      const certificate = await db.Certificate.findAll({
        where: { student_id:id },
        include: [
          {
            model: db.Student, as: "Student", include: [
              { model: db.Users, as: "User" },
            ]
          },
          { model: db.Course, as: "Course" }
        ]
      });

      if (!certificate) return res.status(404).json({ error: 'Certificado não encontrado' });

      res.json(certificate);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar certificado', details: error.message });
    }
  },

  // funçao para criar 

  async create(req, res) {
    try {
      const { student_id, course_id, certificate_code, status, final_score, download_link } = req.body;

      // validação de aluno
      const student = await db.Student.findByPk(student_id);
      if (!student) return res.status(404).json({ error: 'Aluno não encontrado' });

      // validação de curso
      const course = await db.Course.findByPk(course_id);
      if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

      const newCertificate = await db.Certificate.create({
        student_id,
        course_id,
        certificate_code,
        status,
        final_score,
        download_link
      });

      res.status(201).json(newCertificate);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar certificado', details: error.message });
    }
  },

  // função para atualizar

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status, final_score, download_link } = req.body;

      const certificate = await db.Certificate.findByPk(id);
      if (!certificate) return res.status(404).json({ error: 'Certificado não encontrado' });

      await certificate.update({ status, final_score, download_link });

      res.json(certificate);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar certificado', details: error.message });
    }
  },

  // funçao para deletar

  async delete(req, res) {
    try {
      const { id } = req.params;
      const certificate = await db.Certificate.findByPk(id);
      if (!certificate) return res.status(404).json({ error: 'Certificado não encontrado' });

      await certificate.destroy();
      res.json({ message: 'Certificado deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar certificado', details: error.message });
    }
  }
};

export default certificateController;
