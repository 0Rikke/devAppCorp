// src/models/user.js
import Model from "./Model.js";

class Events extends Model {
  static tableName = "events";

  static async first(cond) {
    const rows = await this.find(cond);

    return rows?.[0] ?? false;
  }
}

// Exporta a classe Users para ser usada nos services
export default Users;
