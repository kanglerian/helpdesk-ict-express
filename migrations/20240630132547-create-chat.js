'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client: {
        type: Sequelize.STRING(20)
      },
      name_room: {
        type: Sequelize.STRING(50)
      },
      token: {
        type: Sequelize.STRING(20)
      },
      not_save: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      uuid_sender: {
        type: Sequelize.STRING(10)
      },
      name_sender: {
        type: Sequelize.STRING(50)
      },
      role_sender: {
        type: Sequelize.CHAR(1)
      },
      message: {
        type: Sequelize.TEXT
      },
      reply: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  }
};