'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init({
    client: DataTypes.STRING,
    name_room: DataTypes.STRING,
    token: DataTypes.STRING,
    not_save: DataTypes.BOOLEAN,
    uuid_sender: DataTypes.UUID,
    name_sender: DataTypes.STRING,
    role_sender: DataTypes.CHAR,
    message: DataTypes.TEXT,
    reply: DataTypes.STRING,
    date: DataTypes.DATE,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};