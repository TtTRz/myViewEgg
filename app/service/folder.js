'use strict';

const Service = require('egg').Service;

class FolderService extends Service {
  // 创建文件夹
  async create() {
    try {

    } catch (e) {
      console.log(e);
    }
  }
  // 创建根目录
  async createRoot(account) {
    const { id } = account;
    try {
      const result = await this.ctx.model.Folder.create({ name: '根目录', parent_id: null, account_id: id, description: '无' })
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  // 查找根目录
  async findRootFolder(accountId) {
    try {
      const result = await this.ctx.model.Account.findAll({
        where: {
          id: accountId,
        },
        include: {
          model: this.ctx.model.Folder,
        },
      });
      console.log('12321321', result);
      this.ctx.body = {
        result,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FolderService;
