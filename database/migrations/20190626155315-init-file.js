'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('files', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false },
      hash: { type: STRING, allowNull: false },
      url: { type: STRING, allowNull: false },
      description: TEXT,
      create_time: DATE,
      update_time: DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('files');
  },
};
