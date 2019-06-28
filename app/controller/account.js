'use strict';
const ms = require('ms');
const Controller = require('egg').Controller;
// 定义创建接口的请求参数规则
const implRule = {
  register: {
    // accesstoken: 'string',
  },
};

class AccountController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { email, nickname, password, description } = ctx.request.body;
    try {
      // 检查是否存在此账户
      // TODO 账户检查
      const checkEmail = await ctx.service.account.findByEmail({ email });
      console.log(checkEmail);
      if (checkEmail) {
        ctx.body = {
          message: '账户已存在',
        };
        ctx.status = 500;
      }
      // TODO 创建账户
      const account = await ctx.service.account.create({ email, password, nickname, description, avatar_url: null });
      ctx.body = {
        id: account.id,
      };
      ctx.status = 200;
    } catch (e) {
      console.log(e);
    } finally {
      console.log('controller register');
    }
  }
  // 登录
  async login() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    try {
      // 搜索账户 校验密码
      // TODO 搜索账户 校验密码
      const result = await ctx.service.account.checkPass({ email, password });
      if (!result) {
        ctx.body = {
          message: '登录失败',
        };
        ctx.status = 400;
      } else {
        // 设置 Session
        ctx.session.account = { email, id: result.id }
        ctx.session.maxAge = ms('24h');
        ctx.body = {
          message: '登录成功',
        };
        ctx.status = 200;
      }
      // TODO 登录
    } catch (e) {
      console.log(e);
    } finally {
      console.log('login');
    }
  }
  // 退出登录
  async logout() {
    const { ctx } = this;
    try {
      ctx.session = null;
      ctx.body = {
        message: '退出成功',
      };
      ctx.status = 200;
    } catch (e) {
      console.log(e);
    }
  }
  // 修改我的账户信息
  async updateMe() {
    const { ctx } = this;
    try {
      const { id } = ctx.session.account;
      const result = await ctx.service.account.update({ id, ...ctx.request.body });
      if (result) {
        ctx.body = {
          data: {
            result,
          },
          message: '成功',
        };
        return;
      }
      ctx.body = {
        message: '更新失败',
      }
    } catch (e) {
      console.log(e);
    }
  }
  // 修改账户信息(管理员)
  // 查询我的信息
  async me() {
    const { ctx } = this;
    try {
      const account = { id: ctx.session.account.id };
      // 查询我的信息
      // TODO 查询我的信息
      const result = await ctx.service.account.findById(account);
      ctx.body = {
        data: {
          result,
        },
        message: 'success',
      };
    } catch (e) {
      console.log(e);
    } finally {
      console.log('me');
    }
  }
  // 查询账户信息
  async info() {
    const { ctx } = this;
    try {
      // 查询账户信息
      // TODO 查询账户信息
    } catch (e) {
      console.log(e);
    } finally {
      console.log('info');
    }
  }
  // 删除账户
  async delete() {
    const { ctx } = this;
    try {
      // 删除账户
      // TODO 删除账户
      const { accountId } = ctx.request.body;
      // 不可删除自己或管理员
      if (parseInt(accountId, 10) === parseInt(ctx.session.account.id, 10)) {
        ctx.body = {
          message: '不可删除',
        };
      } else {
        const result = await ctx.service.account.delete({ id: accountId });
        if (result) {
          ctx.body = {
            data: {
              id: accountId,
            },
            message: '删除成功',
          };
          ctx.status = 200;
        } else {
          ctx.body = {
            message: '删除失败',
          };
          ctx.status = 404;
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('delete');
    }
  }

}

module.exports = AccountController;

