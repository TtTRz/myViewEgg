'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('folders', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      parent_id: INTEGER,
      name: STRING(30),
      account_id: INTEGER,
      description: TEXT,
      create_time: DATE,
      update_time: DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('folders');
  }
};
