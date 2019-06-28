'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('accounts', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      nickname: { type: STRING(30), allowNull: false },
      email: { type: STRING(30), unique: true, allowNull: false },
      password: { type: STRING, allowNull: false },
      description: TEXT,
      avatar_url: STRING,
      create_time: DATE,
      update_time: DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  },
};
