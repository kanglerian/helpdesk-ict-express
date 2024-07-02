'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        uuid: "0194818248",
        name: "Student Helpdesk",
        username: "student",
        password: "studenthelpdesk",
        role: "S",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        uuid: "0019238908",
        name: "Administrator",
        username: "teacher",
        password: "helpdeskteacher",
        role: "A",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
