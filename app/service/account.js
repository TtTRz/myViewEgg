'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  // 创建账户
  async create(account) {
    try {
      const result = await this.ctx.model.Account.create(account)
      if (result) {
        await this.ctx.service.folder.createRoot(result);
      }
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  // 删除账户
  // TODO 删除账户
  async delete(account) {
    const result = await this.ctx.model.Account.findByPk(account.id);
    if (!result) {
      return false;
    }
    await result.destroy();
    return true;
  }
  // 更新账户
  // TODO 更新账户
  async update(account) {
    const result = await this.ctx.model.Account.findByPk(account.id);
    if (!result) {
      return false;
    }
    result.update(account);
    return result;
  }
  // 查找账户（账户名）
  // TODO 查找账户email
  async findByEmail(account) {
    try {
      const result = await this.ctx.model.Account.findAll({
        where: {
          email: account.email,
        },
      });
      if (result.length === 0) {
        return null;
      }
      return result[0];
    } catch (e) {
      console.log(e);
    }
  }
  // 查找账户（id）
  // TODO 查找账户id
  async findById(account) {
    const result = await this.ctx.model.Account.findByPk(account.id);
    if (!result) {
      return false;
    }
    return result;
  }
  // 校验密码
  // TODO 校验密码
  async checkPass(account) {
    try {
      const findAccount = await this.findByEmail(account);
      if (!findAccount) {
        return false;
      } else if (findAccount.password === account.password) {
        return { id: findAccount.id };
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = AccountService;
