'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('12345678', salt);
    
    const userId1 = uuidv4();
    const userId2 = uuidv4();
    const userId3 = uuidv4();
    const userId4 = uuidv4();
    const userId5 = uuidv4();
    const userId6 = uuidv4();
    const userId7 = uuidv4();
    const userId8 = uuidv4();
    
    const adminId = uuidv4();

    const studentId1 = uuidv4();
    const studentId2 = uuidv4();
    const studentId3 = uuidv4();
    const studentId4 = uuidv4();

    const teacherId1 = uuidv4();
    const teacherId2 = uuidv4();
    const teacherId3 = uuidv4();
    
    const courseId1 = 1;
    const courseId2 = 2;
    const courseId3 = 3;
    const courseId4 = 4;

    const moduleId1 = 1;
    const moduleId2 = 2;
    const moduleId3 = 3;


    await queryInterface.bulkInsert('Users', [
      {
        id: userId1,
        name: 'Jorge',
        email: 'jorge@gmail.com',
        password: hashedPassword,
        type: 'admin',
        cpf: '123.456.789-00',
        phone_number: '(99) 99999-9999',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId2,
        name: 'Maria',
        email: 'maria@gmail.com',
        password: hashedPassword,
        type: 'student',
        cpf: '234.567.890-11',
        phone_number: '(88) 88888-8888',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId3,
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: hashedPassword,
        type: 'teacher',
        cpf: '345.678.901-22',
        phone_number: '(77) 77777-7777',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId4,
        name: 'Ramon',
        email: 'ramon@gmail.com',
        password: hashedPassword,
        type: 'teacher',
        cpf: '478.147.321-58',
        phone_number: '(88) 55555-7777',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId5,
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: hashedPassword,
        type: 'teacher',
        cpf: '145.778.801-22',
        phone_number: '(85) 96587-7777',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId6,
        name: 'Ana',
        email: 'ana@gmail.com',
        password: hashedPassword,
        type: 'student',
        cpf: '456.789.012-33',
        phone_number: '(66) 66666-6666',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId7,
        name: 'Guilherme',
        email: 'gui@gmail.com',
        password: hashedPassword,
        type: 'student',
        cpf: '786.729.912-63',
        phone_number: '(11) 11111-1111',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: userId8,
        name: 'Yasmin',
        email: 'yasmin@gmail.com',
        password: hashedPassword,
        type: 'student',
        cpf: '456.123.789-99',
        phone_number: '(22) 22222-2222',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Admin', [
      {
        id: adminId,
        role: 'admin',
        user_id: userId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Students', [
      {
        id: studentId1,
        user_id: userId2,
        city: 'São Paulo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: studentId2,
        user_id: userId6,
        city: 'Rio de Janeiro',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: studentId3,
        user_id: userId7,
        city: 'Iguatu',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: studentId4,
        user_id: userId8,
        city: 'Icó',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Teachers', [
      {
        id: teacherId1,
        user_id: userId3,
        academic_formation: 'PhD em Educação',
        tecnic_especialization: 'Matemática Aplicada',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: teacherId2,
        user_id: userId4,
        academic_formation: 'Mestrado em Analise e Desenvolvimento de Sistemas',
        tecnic_especialization: 'Inteligência Artificial',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: teacherId3,
        user_id: userId5,
        academic_formation: 'Bacharelado em Ciência da Computação',
        tecnic_especialization: 'Engenharia de Software',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Courses', [
      {
        id: courseId1,
        name: 'Matemática Básica',
        qtd_hours: 40,
        admin_id: adminId,
        percent_complet: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: courseId2,
        name: 'Desenvolvimento de Software',
        qtd_hours: 120,
        admin_id: adminId,
        percent_complet: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: courseId3,
        name: 'Desenvolvimento Web e Suas Tecnologias',
        qtd_hours: 80,
        admin_id: adminId,
        percent_complet: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: courseId4,
        name: 'Redes de Computadores',
        qtd_hours: 80,
        admin_id: adminId,
        percent_complet: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Modules', [
      {
        id: moduleId1,
        name: 'Álgebra',
        teacher_id: teacherId1,
        qtd_hours: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: moduleId2,
        name: 'Algorítmos',
        teacher_id: teacherId3,
        qtd_hours: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: moduleId3,
        name: 'Banco de Dados',
        teacher_id: teacherId2,
        qtd_hours: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Course_module', [
      {
        id: 1,
        module_id: moduleId1,
        course_id: courseId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        module_id: moduleId2,
        course_id: courseId2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        module_id: moduleId3,
        course_id: courseId3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Certificates', [
      {
        id: 1,
        student_id: studentId1,
        course_id: courseId1,
        issue_date: new Date(),
        certificate_code: 'CERT123456',
        status: 'Aprovado',
        final_score: 3.5,
        download_link: 'https://example.com/cert123456.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        student_id: studentId2,
        course_id: courseId1,
        issue_date: new Date(),
        certificate_code: 'CERT456789',
        status: 'Aprovado',
        final_score: 9.5,
        download_link: 'https://example.com/cert456789.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        student_id: studentId3,
        course_id: courseId2,
        issue_date: new Date(),
        certificate_code: 'CERT456123',
        status: 'Aprovado',
        final_score: 8.4,
        download_link: 'https://example.com/cert456123.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        student_id: studentId4,
        course_id: courseId3,
        issue_date: new Date(),
        certificate_code: 'CERT789123',
        status: 'Aprovado',
        final_score: 7.8,
        download_link: 'https://example.com/cert789123.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Student_courses', [
      {
        id: 1,
        student_id: studentId1,
        course_id: courseId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        student_id: studentId2,
        course_id: courseId2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        student_id: studentId3,
        course_id: courseId3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        student_id: studentId4,
        course_id: courseId1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Student_courses', null, {});
    await queryInterface.bulkDelete('Certificates', null, {});
    await queryInterface.bulkDelete('Course_module', null, {});
    await queryInterface.bulkDelete('Modules', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
    await queryInterface.bulkDelete('Teachers', null, {});
    await queryInterface.bulkDelete('Students', null, {});
    await queryInterface.bulkDelete('Admin', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
