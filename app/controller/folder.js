'use strict';

const Controller = require('egg').Controller;

class FolderController extends Controller {
  // 查找根目录
  async root() {
    const { ctx } = this;
    try {
      await ctx.service.folder.findRootFolder(ctx.session.account.id);
    } catch (e) {
      console.log(e);
    }
  }
  // 创建文件夹
  async create() {
    const { ctx } = this;

  }
}

module.exports = FolderController;