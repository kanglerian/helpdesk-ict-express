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
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      name_room: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      not_save: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      uuid_sender: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name_sender: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      role_sender: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reply: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
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