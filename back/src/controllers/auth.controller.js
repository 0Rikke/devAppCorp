import UserService from "../services/userService.js";
import Controller from "./base.controller.js";

class AuthController extends Controller {
  static async register(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  static async login(req, res) {
    try {
      const result = await UserService.loginUser(req.body);

      return super.success(res, result);
    } catch (error) {
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401
          : 500;

      return super.error(res, { message: error.message }, status);
    }
  }
}

export default AuthController;
