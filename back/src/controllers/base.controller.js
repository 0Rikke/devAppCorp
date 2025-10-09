/**
 * Controller base com métodos utilitários para enviar respostas padronizadas.
 */
class Controller {
  /**
   * Envia uma resposta de sucesso (200).
   * @param {import('express').Response} res
   * @param {object} data
   * @returns {import('express').Response}
   */
  static success(res, data) {
    if (!data.status) {
      data.status = "success";
    }

    return res.status(200).json(data);
  }

  /**
   * Envia uma resposta de erro com código configurável.
   * @param {import('express').Response} res
   * @param {object} data
   * @param {number} [status=500]
   * @returns {import('express').Response}
   */
  static error(res, data, status = 500) {
    return res.status(status).json(data);
  }
}

export default Controller;
