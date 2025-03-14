'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('12345678', salt); 

    const userId = uuidv4();
    const adminId = uuidv4();

    await queryInterface.bulkInsert('Users', [
      {
        id: userId,
        name: 'Jorge',
        email: 'jorge@gmail.com',
        password: hashedPassword,
        type: 'admin',
        cpf: '123.456.789-00',
        phone_number: '(99) 99999-9999',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Admin', [
      {
        id: adminId,
        role: 'admin',
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};