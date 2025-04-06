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
    await queryInterface.bulkInsert('Users', [
      {
        id: userId1,
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: hashedPassword,
        type: 'admin',
        cpf: '129.456.789-02',
        phone_number: '(88) 99909-9999',
        created_at: new Date(),
        updated_at: new Date(),
      }]);
    
      await queryInterface.bulkInsert('Admin', [
        {
          id: adminId,
          role: 'content_manager',
          user_id: userId1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Admin', null, {});
  }
};
