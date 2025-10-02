
import UserService from "../services/userService.js";

class AuthController {
  static async register(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return res.status(status).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await UserService.loginUser(req.body);
      return res.status(200).json(result);
    } catch (error) {
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401
          : 500;
      return res.status(status).json({ message: error.message });
    }
  }
}

export default AuthController;
    
