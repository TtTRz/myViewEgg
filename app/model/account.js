'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Account = app.model.define('accounts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: STRING(30), allowNull: false },
    email: { type: STRING(30), unique: true, allowNull: false },
    password: { type: STRING, allowNull: false },
    description: TEXT,
    avatar_url: STRING,
    create_time: DATE,
    update_time: DATE,
  });
  Account.associate = function() {
    // 一个用户对应一个仓库
    app.model.Account.hasOne(app.model.Folder, { foreignKey: 'account_id' });
  };
  return Account;
};

