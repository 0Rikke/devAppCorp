// src/controllers/publicController.js

import EventService from "../services/eventService.js";
import Controller from "./base.controller.js";

/**
 * Controller para operações CRUD de eventos.
 * @extends Controller
 */
class EventsController extends Controller {
  /**
   * Lista eventos (GET /events).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
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

  /**
   * Cria um novo evento (POST /events).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    try {
      const result = await EventService.createEvent(req.body);

      return super.success(res, result);
    } catch (error) {
      return super.error(res, {
        message: "Erro ao criar evento.",
        error: error.message,
      });
    }
  }

  /**
   * Mostra um evento pelo ID (GET /events/:id).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async show(req, res) {
    try {
      const events = await EventService.listEvents({ id: req.params.id });

      return super.success(res, {
        data: events?.[0] ?? {},
        message: "Evento",
      });
    } catch (error) {
      return super.error(res, {
        message: "Erro ao buscar evento.",
        error: error.message,
      });
    }
  }

  /**
   * Atualiza um evento (PUT /events/:id).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
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

  /**
   * Deleta um evento (DELETE /events/:id).
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
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
