// src/controllers/publicController.js

import EventService from "../services/eventService.js";
import Controller from "./base.controller.js";

class EventsController extends Controller {
  static async events(req, res) {
    try {
      const events = await EventService.listEvents();

      return super.success(res, {
        data: { events },
        message: "Lista de Eventos",
      });
    } catch (error) {
      return super.error(res, {
        message: "Erro ao buscar eventos.",
        error: error.message,
      });
    }
  }

  static async show(req, res) {
    try {
      const events = await EventService.listEvents({ id: req.params.id });

      return super.success(res, {
        data: events?.[0] ?? {},
        message: "Lista de Eventos",
      });
    } catch (error) {
      return super.error(res, {
        message: "Erro ao buscar evento.",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = await EventService.updateEvent(req.body, req.params.id);

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao atualizar evento.",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const result = await EventService.deleteEvent(req.params.id);

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao deletar",
        error: error.message,
      });
    }
  }
}

export default EventsController;
