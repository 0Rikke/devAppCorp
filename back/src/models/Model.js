import db from "../config/database.js"; // Importa a conexão pool com o banco de dados

export default class Model {
  // Create a new record
  static async create(data) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new Error("No data provided for insert");

    // columns list: col1, col2, col3
    const columns = keys.join(", ");
    // placeholders: ?, ?, ?
    const placeholders = keys.map(() => "?").join(", ");

    const values = Object.values(data);
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

    const [result] = await db.execute(query, values);
    return result.insertId; // Return the ID of the inserted row
  }

  // Retrieve records with optional conditions
  static async find(conditions = {}, bool) {
    const keys = this.getTemplateSet(conditions).join(" AND ");
    const values = Object.values(conditions);
    const query = keys
      ? `SELECT * FROM ${this.tableName} WHERE ${keys}`
      : `SELECT * FROM ${this.tableName}`;

    if (bool) {
      return { query, values };
    }
    // return {query,values};
    const [rows] = await db.execute(query, values);
    return rows;
  }

  // Update records with conditions
  static async update(data, conditions) {
    const dataKeys = this.getTemplateSet(data);
    const conditionKeys = this.getTemplateSet(conditions).join(" AND ");

    const dataValues = Object.values(data);
    const conditionValues = Object.values(conditions);

    const query = `UPDATE ${this.tableName} SET ${dataKeys} WHERE ${conditionKeys}`;
    const [result] = await db.execute(query, [
      ...dataValues,
      ...conditionValues,
    ]);
    return { result, dataValues, conditionKeys, query };
    return result.affectedRows; // Return the number of updated rows
  }

  // Delete records with conditions
  static async delete(conditions) {
    const keys = this.getTemplateSet(conditions).join(" AND ");
    const values = Object.values(conditions);
    const query = `DELETE FROM ${this.tableName} WHERE ${keys}`;
    const [result] = await db.execute(query, values);
    return result.affectedRows; // Return the number of deleted rows
  }

  static getTemplateSet(fields = {}) {
    return Object.keys(fields).map((key) => `${key} = ?`);
  }
}
