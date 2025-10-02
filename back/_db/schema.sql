CREATE DATABASE IF NOT EXISTS prova_rosito CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usa o banco de dados
USE prova_rosito;

-- Cria a tabela de usuários
CREATE TABLE
    IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        nome VARCHAR(255) NOT NULL 
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        date date NOT NULL,
        description VARCHAR(555) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE 
    IF NOT EXISTS users_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

-- Insere dois tipos de usuários
INSERT INTO
    users (email, password, role)
VALUES
    (
        'usuario@ifrs.edu.br',
        '$2b$10$382cEJJYi5YxSBNvWmufHeoPHX3dqIB9NP2R2XWzt/w.DnC0gmCr2',
        'user'
    ),
    (
        'admin@ifrs.edu.br',
        '$2b$10$/JLXJ62EBlk1bNq0xmpvMuTLDJb6AWmZUs74lgEJb4Z.J9.3kFJM.',
        'admin'
    );