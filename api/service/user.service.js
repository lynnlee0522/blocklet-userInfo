const db = require('../controller/database');

class UserService {
  async findUser(did) {
    // 1.查询用户传递过来的信息
    const result = await db.findOne({ did });
    return result;
  }

  async createUser(user) {
    const result = await db.insert(user);
    return result;
  }

  async updateUser(user) {
    const result = await db.update({ did: user.did }, user);
    return result;
  }
}

module.exports = new UserService();
