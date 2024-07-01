'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        uuid: "0194818248",
        name: "Civitas LP3I",
        username: "civitaslp3i",
        password: "civitaslp3i123",
        role: "S",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        uuid: "0019238908",
        name: "Administrator",
        username: "lp3itasik",
        password: "mimin311",
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
