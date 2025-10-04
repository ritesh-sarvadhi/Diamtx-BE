'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('User', [{
      id: 1,
      name: 'admin.sarvadhi',
      email: 'admin@sarvadhi.com',
      password: '$2a$10$GKF8Hb8LeNLxYaf85Z3.G.THaOhOC859FViZhTkgOYN3hlyh6jxmq', //rahul123
      roleId: 47,
      status: true,
      loginType: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.sequelize.query('ALTER SEQUENCE "User_id_seq" RESTART WITH 2;');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
