const User = require("../models/index").User;
const bcrypt = require("bcryptjs");

module.exports = class UserController {
  static async register(req, res) {
    try {
      let { email, password } = req.body;
      let user = await User.create({ email, password: bcrypt.hashSync(password, 10) });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
