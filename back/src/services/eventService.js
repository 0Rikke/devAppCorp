import Events from "../models/Events.js";
import UserEvents from "../models/UserEvents.js";
import Users from "../models/Users.js";

class EventService {
  static async listEvents(cond = {}) {
    const events = await Events.find(cond);

    return events;
  }

  static async volunteer(req) {
    const { event } = req.body;

    const user = await Users.first({ email: req.user.email });

    if (!user) {
      throw new Error("Usuario não encontrado");
    }

    const isVolunteer = await UserEvents.first({
      event_id: event.id,
      user_id: user.id,
    });

    if (isVolunteer) {
      throw new Error("O usuário já é voluntario.");
    }

    const id = await UserEvents.create({
      event_id: event.id,
      user_id: user.id,
    });

    return { message: "Voluntariado com sucesso", id };
  }

  static async updateEvent(values, id) {
    // { name: "aqui" }
    const updated = await Events.update(values, { id });

    return { message: "Evento atualizado com suceesso", updated };
  }

  static async deleteEvent(id) {
    const updated = await Events.delete({ id });

    return { message: "Evento atualizado com suceesso", updated };
  }
}

export default EventService;
