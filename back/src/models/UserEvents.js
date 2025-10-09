// src/models/userEvents.js
import Model from "./Model.js";

/**
 * Model para a tabela de associação `users_events`.
 */
class UserEvents extends Model {
  static tableName = "users_events";

  /**
   * Retorna o primeiro registro que satisfaz a condição ou `false`.
   * @param {Object} cond - Condições para busca.
   * @returns {Promise<Object|boolean>} Primeiro registro ou false.
   */
  static async first(cond) {
    const rows = await this.find(cond);

    return rows?.[0] ?? false;
  }
}

export default UserEvents;
