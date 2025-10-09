// src/models/users.js
import Model from "./Model.js";

/**
 * Model para a tabela `users`.
 */
class Users extends Model {
  static tableName = "users";

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

export default Users;
