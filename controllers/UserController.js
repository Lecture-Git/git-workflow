const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      let { email, password } = req.body;
      let user = await User.create({ email, password: hashPassword(password) });
      res.status(201).json(user);
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("Email & Password required!");
      }

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password)) {
        throw new Error("User Not Found!");
      }

      res.status(200).json({ user: signToken(user.id) });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
