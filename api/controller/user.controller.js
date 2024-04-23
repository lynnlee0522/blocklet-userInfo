const userService = require('../service/user.service');

class UserController {
  /**
   * @description: 此中间件用于：用户注册
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  async findUser(req, res) {
    // 1.查询用户传递过来的信息
    const { did } = req.body;
    const result = await userService.findUser(did);
    res.json({
      errno: '0',
      data: result,
    });
  }

  async saveUser(req, res) {
    const user = req.body;
    const { did } = user;

    // 判断是否有该用户信息
    const result = await userService.findUser(did);
    if (!result) {
      const res = await userService.createUser(user);
    } else {
      const res = await userService.updateUser(user);
    }

    res.json({
      errno: '0',
      data: {},
    });
  }
}

module.exports = new UserController();
