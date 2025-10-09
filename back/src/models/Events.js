// src/models/events.js
import Model from "./Model.js";

/**
 * Model para a tabela `events`.
 * Fornece operações básicas herdadas de `Model` e um helper `first`.
 */
class Events extends Model {
  static tableName = "events";

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

export default Events;
