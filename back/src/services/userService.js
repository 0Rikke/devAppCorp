// src/services/userService.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

class UserService {
  static async registerUser(user) {
    const { email, password, role } = user;

    const existing = await  Users.first({ email });

    if (existing) {
      throw new Error("Usuário já existe");
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    const id = await Users.create(user);

    return { message: "Usuário registrado com sucesso", id };
  }

  // Método para autenticar o usuário e gerar token JWT
  static async loginUser({ email, password }) { 
    const user = await Users.first({email});

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
    return { token, user: { email: user.email, role: user.role } };
  }
}

export default UserService;
