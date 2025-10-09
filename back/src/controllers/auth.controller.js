import UserService from "../services/userService.js";
import Controller from "./base.controller.js";

/**
 * Controller para autenticação (registro e login).
 * Responsável por receber requisições relacionadas à autenticação e delegar
 * a lógica para o service apropriado.
 * @extends Controller
 */
class AuthController extends Controller {
  /**
   * Registra um novo usuário.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async register(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  /**
   * Autentica um usuário e retorna token JWT em caso de sucesso.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
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
