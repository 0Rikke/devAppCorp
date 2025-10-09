// src/controllers/publicController.js

import Controller from "./base.controller.js";

/**
 * Controller para rotas públicas simples.
 * @extends Controller
 */
class PublicController extends Controller {
  /**
   * Rota pública de boas-vindas.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static home(req, res) {
    try {
      return res.status(200).send("Bem-vindo à API pública!");
    } catch (error) {
      return this.error(res, {
        message: "Erro ao acessar a rota pública",
        error: error.message,
      });
    }
  }
}

export default PublicController;
