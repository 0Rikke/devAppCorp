// src/models/user.js
import Model from "./Model.js";

class Users extends Model {
  static tableName = "users";

  static async first(cond) {
    const rows = await this.find(cond);

    return rows?.[0] ?? false;
  }
}

// Exporta a classe Users para ser usada nos services
export default Users;
