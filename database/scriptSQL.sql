CREATE DATABASE db_locadora_filme_ds2m_25_2

CREATE TABLE tbl_idioma(
id_idioma INT PRIMARY KEY auto_increment NOT NULL,
nome VARCHAR(100) NOT NULL,
sigla VARCHAR(10) NOT NULL);

CREATE TABLE tbl_genero(
id_genero INT PRIMARY KEY auto_increment NOT NULL,
nome VARCHAR(100) NOT NULL);

CREATE TABLE tbl_personagem(
id_personagem INT PRIMARY KEY auto_increment NOT NULL,
nome VARCHAR(255) NOT NULL,
codinome VARCHAR(255) NULL,
descricao VARCHAR(300) NULL,
historia_origem TEXT NULL,
foto_url VARCHAR(255) NULL,
ocupacao VARCHAR(100) NULL);

CREATE TABLE tbl_pais(
id_pais INT PRIMARY KEY auto_increment NOT NULL,
nome VARCHAR(100) NOT NULL,
sigla CHAR(2) NOT NULL,
nacionalidade VARCHAR(100) NOT NULL);

CREATE TABLE tbl_estudio(
id_estudio INT PRIMARY KEY auto_increment NOT NULL,
nome VARCHAR(255) NOT NULL,
data_fundacao DATE NULL,
especialidade VARCHAR(30) null,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_produtora(
id_produtora INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(255) NOT NULL,
data_fundacao DATE NULL,
resumo_historia TEXT NULL,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_dublador(
id_dublador INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(255) NOT NULL,
data_nascimento DATE NULL,
data_falecimento DATE NULL,
biografia TEXT NULL,
estudio_principal VARCHAR(255) NULL,
ativo BOOLEAN DEFAULT TRUE NOT NULL,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_ator(
id_ator INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(255) NOT NULL,
idade INT NULL,
nome_artistico VARCHAR(255) NULL,
biografia TEXT NULL,
altura_cm INT NULL,
data_nascimento DATE NULL,
data_falecimento DATE NULL,
premio_destaque VARCHAR(255) NULL,
foto_perfil_url VARCHAR(256) NULL,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_roterista(
id_roterista INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(255) NOT NULL,
mini_bio VARCHAR(300) NOT NULL,
data_nascimento DATE NULL,
data_falecimento DATE NULL,
biografia TEXT NULL,
ativo BOOLEAN DEFAULT TRUE NOT NULL,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_diretor(
id_diretor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(255) NOT NULL,
data_nascimento DATE NULL,
data_falecimento DATE NULL,
biografia TEXT NULL,
foto_url VARCHAR(256) NULL,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_filme(
id_filme INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
sinopse TEXT NOT NULL,
data_lancamento DATE NOT NULL,
duracao TIME NOT NULL,
orcamento DECIMAL(11,2) NOT NULL,
trailler VARCHAR(200) NULL,
capa VARCHAR(200) NULL,
id_pais INT NOT NULL,
FOREIGN KEY (id_pais) REFERENCES tbl_pais(id_pais));

CREATE TABLE tbl_elenco(
id_elenco INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_atuacao VARCHAR(100) NOT NULL,
funcao_dramatica VARCHAR(100) NOT NULL,
id_filme INT NOT NULL,
id_personagem INT NOT NULL,
id_ator INT NOT NULL,
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id_filme),
FOREIGN KEY (id_personagem) REFERENCES tbl_personagem(id_personagem),
FOREIGN KEY (id_ator) REFERENCES tbl_ator(id_ator));

CREATE TABLE tbl_dublagem(
id_dublagem INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_dublagem VARCHAR(100) NULL,
id_idioma INT NOT NULL,
id_dublador INT NOT NULL,
id_elenco INT NOT NULL,
FOREIGN KEY (id_idioma) REFERENCES tbl_idioma(id_idioma),
FOREIGN KEY (id_dublador) REFERENCES tbl_dublador(id_dublador),
FOREIGN KEY (id_elenco) REFERENCES tbl_elenco(id_elenco));

CREATE TABLE tbl_estudio_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_associacao VARCHAR(50) NOT NULL,
id_estudio INT NOT NULL,
id_filme INT NOT NULL,
FOREIGN KEY (id_estudio) REFERENCES tbl_estudio(id_estudio),
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id_filme));

CREATE TABLE tbl_diretor_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_direcao VARCHAR(100) NULL,
id_diretor INT NOT NULL,
id_filme INT NOT NULL,
FOREIGN KEY (id_diretor) REFERENCES tbl_diretor(id_diretor),
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id_filme));

CREATE TABLE tbl_roterista_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_credito VARCHAR(50) NULL,
detalhe_adaptacao VARCHAR(255) NULL,
id_roterista INT NOT NULL,
id_filme INT NOT NULL,
FOREIGN KEY (id_roterista) REFERENCES tbl_roterista(id_roterista),
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id_filme));

CREATE TABLE tbl_produtora_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_participacao VARCHAR(50) NULL,
produtora_principal BOOLEAN DEFAULT TRUE NOT NULL,
id_produtora INT NOT NULL,
id_filme INT NOT NULL,
FOREIGN KEY (id_produtora) REFERENCES tbl_produtora(id_produtora),
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id_filme));

CREATE TABLE tbl_genero_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
id_genero INT NOT NULL,
id_filme INT NOT NULL,
FOREIGN KEY (id_genero) REFERENCES tbl_genero(id_genero),
FOREIGN KEY (id_filme) REFERENCES tbl_filme(id_filme));