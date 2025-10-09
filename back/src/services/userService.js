// src/services/userService.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

/**
 * Serviços relacionados a usuários (registro, login, CRUD).
 */
class UserService {
  /**
   * Registra um novo usuário.
   * @param {object} user - Objeto com { email, password, role }
   * @returns {Promise<object>} Resultado com ID do usuário criado.
   */
  static async registerUser(user) {
    const { email, password, role } = user;

    const existing = await Users.first({ email });

    if (existing) {
      throw new Error("Usuário já existe");
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    const id = await Users.create(user);

    return { message: "Usuário registrado com sucesso", id };
  }

  /**
   * Auth: valida credenciais e retorna token JWT.
   * @param {object} param0 - { email, password }
   * @returns {Promise<object>} Token e dados do usuário.
   */
  static async loginUser({ email, password }) {
    const user = await Users.first({ email });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Verifica se a senha fornecida é válida
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Senha inválida");
    }

    // Gera o token JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retorna o token e o usuário para o controller
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  /**
   * Busca usuários. Se `id` for fornecido, retorna o usuário correspondente.
   * @param {object|number|string} id
   * @returns {Promise<object>} Resultado com dados.
   */
  static async getUser(id) {
    const user = await Users.find(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return {
      message: "Usuário encontrado.",
      data: id ? user?.[0] ?? null : user,
    };
  }

  /**
   * Atualiza um usuário.
   * @param {object} values - Campos a atualizar.
   * @param {number|string} id - ID do usuário.
   * @returns {Promise<object>} Resultado da atualização.
   */
  static async updateUser(values, id) {
    // { name: "aqui" }
    const updated = await Users.update(values, { id });

    return { message: "Usuário atualizado com suceesso", updated };
  }

  /**
   * Deleta um usuário.
   * @param {number|string} id - ID do usuário.
   * @returns {Promise<object>} Resultado da exclusão.
   */
  static async deleteUser(id) {
    const updated = await Users.delete({ id });

    return { message: "Usuário deletado com suceesso", updated };
  }
}

export default UserService;
