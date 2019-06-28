'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 注册登录
  router.post('/api/v1/account/register', controller.account.register);
  router.post('/api/v1/account/login', controller.account.login);
  router.get('/api/v1/account/logout', controller.account.logout);
  // 账户
  router.get('/api/v1/account', controller.account.me);
  router.post('/api/v1/account', controller.account.info);
  router.delete('/api/v1/account', controller.account.delete);
  router.put('/api/v1/account', controller.account.updateMe);
  // 文件夹
  router.get('/api/v1/folder/root', controller.folder.root);
};
