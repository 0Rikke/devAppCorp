import db from "../config/database.js"; // Importa a conexão pool com o banco de dados

/**
 * Base Model com operações reutilizáveis para interação com o banco.
 * As classes que estendem `Model` devem definir `static tableName`.
 */
export default class Model {
  /**
   * Insere um registro na tabela.
   * @param {Object} data - Objeto com chave:valor representando colunas e valores.
   * @returns {Promise<number>} insertId do registro criado.
   * @throws {Error} se `data` estiver vazio.
   */
  static async create(data) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new Error("No data provided for insert");

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const values = Object.values(data);
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

    const [result] = await db.execute(query, values);
    return result.insertId; // ID do registro inserido
  }

  /**
   * Busca registros com condições opcionais.
   * @param {Object} [conditions={}] - Condições no formato { col: value }.
   * @param {boolean} [bool] - Se true retorna objeto {query, values} em vez de executar.
   * @returns {Promise<Array|Object>} Linhas encontradas ou query/values quando `bool`.
   */
  static async find(conditions = {}, bool) {
    const keys = this.getTemplateSet(conditions).join(" AND ");
    const values = Object.values(conditions);
    const query = keys
      ? `SELECT * FROM ${this.tableName} WHERE ${keys}`
      : `SELECT * FROM ${this.tableName}`;

    if (bool) {
      return { query, values };
    }

    const [rows] = await db.execute(query, values);
    return rows;
  }

  /**
   * Atualiza registros que satisfazem `conditions` com os campos em `data`.
   * @param {Object} data - Campos a atualizar.
   * @param {Object} conditions - Condições para selecionar registros.
   * @returns {Promise<Object>} Resultado do driver (affectedRows, etc.).
   */
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
    return result; // objeto do driver (affectedRows, etc.)
  }

  /**
   * Deleta registros conforme as condições fornecidas.
   * @param {Object} conditions - Condições para seleção dos registros a deletar.
   * @returns {Promise<number>} Número de linhas afetadas.
   */
  static async delete(conditions) {
    const keys = this.getTemplateSet(conditions).join(" AND ");
    const values = Object.values(conditions);
    const query = `DELETE FROM ${this.tableName} WHERE ${keys}`;
    const [result] = await db.execute(query, values);
    return result.affectedRows;
  }

  /**
   * Converte um objeto em uma lista de expressões `col = ?` para uso em queries.
   * @param {Object} fields
   * @returns {string[]} Array de expressões.
   */
  static getTemplateSet(fields = {}) {
    return Object.keys(fields).map((key) => `${key} = ?`);
  }
}
