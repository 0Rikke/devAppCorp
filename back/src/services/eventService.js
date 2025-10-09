import Events from "../models/Events.js";
import UserEvents from "../models/UserEvents.js";
import Users from "../models/Users.js";

/**
 * Serviços relacionados a eventos e voluntariado.
 */
class EventService {
  /**
   * Retorna uma lista de eventos opcionalmente filtrada.
   * @param {object} [cond={}] - Condições para filtrar eventos.
   * @returns {Promise<Array>} Lista de eventos.
   */
  static async listEvents(cond = {}) {
    const events = await Events.find(cond);

    return events;
  }

  /**
   * Registra um usuário como voluntário em um evento.
   * @param {import('express').Request} req - Deve conter `req.user.email` e `req.body.event`.
   * @returns {Promise<object>} Resultado da operação.
   */
  static async volunteer(req) {
    const { event } = req.body;

    const user = await Users.first({ email: req.user.email });

    if (!user) {
      return { messagee: "Usuario não encontrado", status: "error" };
    }

    const isVolunteer = await UserEvents.first({
      event_id: event.id,
      user_id: user.id,
    });

    if (isVolunteer) {
      return { message: "O usuário já é voluntario.", status: "error" };
    }

    const id = await UserEvents.create({
      event_id: event.id,
      user_id: user.id,
    });

    return { message: "Voluntariado com sucesso", id };
  }

  /**
   * Cria um novo evento.
   * @param {object} values - Dados do evento.
   * @returns {Promise<object>} Resultado com id do novo evento.
   */
  static async createEvent(values) {
    // { name: "aqui" }
    console.log(values);
    
    const updated = await Events.create(values);

    return { message: "Evento criado com suceesso", id:updated };
  }

  /**
   * Atualiza um evento existente.
   * @param {object} values - Campos a atualizar.
   * @param {number|string} id - ID do evento.
   * @returns {Promise<object>} Resultado da atualização.
   */
  static async updateEvent(values, id) {
    // { name: "aqui" }
    const updated = await Events.update(values, { id });

    return { message: "Evento atualizado com suceesso", updated };
  }

  /**
   * Remove um evento.
   * @param {number|string} id - ID do evento.
   * @returns {Promise<object>} Resultado da exclusão.
   */
  static async deleteEvent(id) {
    const updated = await Events.delete({ id });

    return { message: "Evento atualizado com suceesso", updated };
  }
}

export default EventService;
