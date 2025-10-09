// src/controllers/protectedController.js

import UserEvents from "../models/UserEvents.js";
import EventService from "../services/eventService.js";
import Controller from "./base.controller.js";

/**
 * Controller para rotas protegidas (requerem autenticação).
 * @extends Controller
 */
class ProtectedController extends Controller {
  /**
   * Painel principal do usuário autenticado.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async dashboard(req, res) {
    try {
      const events = await EventService.listEvents();

      return super.success(res, {
        data: { events },
        message: `Bem-vindo ao painel, ${req.user.email}`,
      });
    } catch (error) {
      return super.error(res, {
        message: "Erro ao acessar o painel",
        error: error.message,
      });
    }
  }

  /**
   * Exemplo de rota acessível apenas por administradores.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static adminOnly(req, res) {
    try {
      return super.success(res, {
        message: `Bem-vindo à área admin, ${req.user.email}`,
      });
    } catch (error) {
      return this.error(res, {
        message: "Erro ao acessar a área admin",
        error: error.message,
      });
    }
  }

  /**
   * Marca o usuário como voluntário para um evento.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async volunteer(req, res) {
    try {
      const result = await EventService.volunteer(req);

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao registrar voluntário",
        error: error.message,
      });
    }
  }
}

export default ProtectedController;
