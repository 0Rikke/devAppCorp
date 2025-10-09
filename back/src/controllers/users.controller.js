import UserService from "../services/userService.js";
import Controller from "./base.controller.js";

/**
 * Controller para CRUD de usuários.
 * @extends Controller
 */
class UsersController extends Controller {
  /**
   * Lista todos os usuários (GET /users).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async index(req, res) {
    try {
      const result = await UserService.getUser();
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  /**
   * Cria um novo usuário (POST /users).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  /**
   * Mostra um usuário pelo ID (GET /users/:id).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async show(req, res) {
    try {
      const result = await UserService.getUser({ id: req.params.id });
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  /**
   * Atualiza um usuário (PUT /users/:id).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async update(req, res) {
    try {
      const result = await UserService.updateUser(req.body, req.params.id);

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao atualizar usuário.",
        error: error.message,
      });
    }
  }

  /**
   * Deleta um usuário (DELETE /users/:id).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async delete(req, res) {
    try {
      const result = await UserService.deleteUser(req.params.id);

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao deletar usuário",
        error: error.message,
      });
    }
  }
}

export default UsersController;
