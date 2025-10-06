import UserService from "../services/userService.js";
import Controller from "./base.controller.js";

class UsersController extends Controller {
  static async index(req, res) {
    try {
      const result = await UserService.getUser();
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  static async create(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

  static async show(req, res) {
    try {
      const result = await UserService.getUser({ id: req.params.id });
      return super.success(res, result);
    } catch (error) {
      const status = error.message === "Usuário já existe" ? 409 : 500;
      return super.error(res, { message: error.message }, status);
    }
  }

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
