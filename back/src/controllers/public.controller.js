// src/controllers/publicController.js

import Controller from "./base.controller.js";

class PublicController extends Controller {
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
