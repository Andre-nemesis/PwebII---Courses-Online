'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('12345678', salt);
    const userId1 = uuidv4();
    const adminId = uuidv4();

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert('Users', [{
        id: userId1,
        name: 'Bruno',
        email: 'Bruno@gmail.com',
        password: hashedPassword,
        type: 'admin',
        cpf: '129.452.627-89',
        phone_number: '(88) 98374-0948',
        created_at: new Date(),
        updated_at: new Date(),
      }], { transaction });

      await queryInterface.bulkInsert('Admin', [{
        id: adminId,
        role: 'content_manager',
        user_id: userId1,
        created_at: new Date(),
        updated_at: new Date(),
      }], { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};