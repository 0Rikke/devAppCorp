// src/controllers/protectedController.js

import UserEvents from "../models/UserEvents.js";
import EventService from "../services/eventService.js";
import Controller from "./base.controller.js";

class ProtectedController extends Controller {
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

  static async volunteer(req, res) {
    try {
      const result = await EventService.volunteer(req)

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao acessar a área admin",
        error: error.message,
      });
    }
  }
}

export default ProtectedController;
