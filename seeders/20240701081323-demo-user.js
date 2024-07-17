'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        uuid: "2a504130-35bf-44cf-8450-cd44094a7968",
        name: "Student",
        username: "student",
        password: "helpdeskstudent",
        role: "S",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        uuid: "4e239493-477d-41b8-87e0-8a32255b4c07",
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
