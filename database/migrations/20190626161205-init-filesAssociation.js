'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('filesAssociation', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      folder_id: INTEGER,
      fileId: INTEGER,
      create_time: DATE,
      update_time: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('filesAssociation');
  }
};
