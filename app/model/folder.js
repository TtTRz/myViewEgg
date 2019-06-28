'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Folder = app.model.define('folders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    parent_id: INTEGER,
    name: STRING(30),
    account_id: INTEGER,
    description: TEXT,
    create_time: DATE,
    update_time: DATE,
  });
  Folder.associate = function() {
    app.model.Folder.belongsTo(app.model.Account, { foreignKey: 'account_id', targetKey: 'id' });
  };
  return Folder;
};
