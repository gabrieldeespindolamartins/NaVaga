-- Usuários do sistema
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

-- Vagas de estacionamento
CREATE TABLE vagas (
  id SERIAL PRIMARY KEY,
  localizacao VARCHAR(150) NOT NULL,
  status VARCHAR(10) CHECK (status IN ('livre', 'ocupada')) DEFAULT 'livre'
);

-- Sensores vinculados a vagas
CREATE TABLE sensores (
  id SERIAL PRIMARY KEY,
  codigo_sensor VARCHAR(50) UNIQUE NOT NULL,
  vaga_id INT UNIQUE,
  FOREIGN KEY (vaga_id) REFERENCES vagas(id)
);

-- Histórico de uso das vagas
CREATE TABLE historico (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL,
  vaga_id INT NOT NULL,
  data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_saida TIMESTAMP NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (vaga_id) REFERENCES vagas(id)
);
















INSERT INTO usuarios (nome, email, senha) VALUES
('Gabriel Martins', 'gabriel.martins@email.com', '123456'),
('Gabriella Francisco', 'gabriella@email.com', 'abcdef'),
('Heitor Rachadel', 'heitor@email.com', 'senha123'),
('Gabriel Padilha', 'padilha@email.com', 'qwerty'),
('Maria Silva', 'maria.silva@email.com', '123abc');


INSERT INTO vagas (localizacao, status) VALUES
('Shopping Beira-Mar - Piso 1', 'livre'),
('Shopping Beira-Mar - Piso 2', 'ocupada'),
('Centro - Rua XV de Novembro', 'livre'),
('UFSC - Estacionamento CSE', 'ocupada'),
('Lagoa da Conceição - Praça Central', 'livre');

INSERT INTO sensores (codigo_sensor, vaga_id) VALUES
('SENSOR001', 1),
('SENSOR002', 2),
('SENSOR003', 3),
('SENSOR004', 4),
('SENSOR005', 5);

INSERT INTO historico (usuario_id, vaga_id, data_entrada, data_saida) VALUES
(1, 2, '2025-08-18 10:00:00', '2025-08-18 12:00:00'),
(2, 3, '2025-08-19 09:30:00', '2025-08-19 10:15:00'),
(3, 4, '2025-08-19 14:00:00', '2025-08-19 16:00:00'),
(4, 1, '2025-08-20 08:45:00', '2025-08-20 09:50:00'),
(5, 5, '2025-08-20 11:00:00', NULL); -- NULL = usuário ainda está estacionado


