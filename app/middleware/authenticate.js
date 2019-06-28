'use strict';

/**
 *  认证中间件
 *  @param options
 *  @returns {authenticate}
 *
 */

module.exports = options => {
  return async function authenticate(ctx, next) {
    if (ctx.session.account) {
      await next();
    } else if (ctx.path === '/api/v1/account/login' || ctx.path === '/api/v1/account/register') {
      await next();
    } else {
      ctx.body = {
        message: '无权限, 请先登录',
      };
      ctx.status = 400;
    }
  };
};

