CREATE DATABASE db_locadora_filme_ds2m_25_2

CREATE TABLE tbl_filme(
id int primary key auto_increment not null,
nome VARCHAR(100) not null,
sinopse TEXT not null,
data_lancamento DATE not null,
duracao TIME not null,
orcamento DECIMAL(11,2) not null,
trailer VARCHAR(200),
capa VARCHAR(200)
);

ALTER TABLE tbl_filme MODIFY COLUMN sinopse TEXT null;
ALTER TABLE tbl_filme MODIFY COLUMN data_lancamento DATE null;
ALTER TABLE tbl_filme MODIFY COLUMN capa VARCHAR(200) not null;
ALTER TABLE tbl_filme MODIFY COLUMN orcamento DECIMAL(11,2) not null;

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES ('Demon Slayer: Kimetsu no Yaiba - Castelo Infinito', 
'Em Demon Slayer: Kimetsu no Yaiba - Castelo Infinito, a vida do jovem Tanjiro muda por completo quando descobre que sua família foi assassinada por uma raça demoníaca conhecida como Onis. 
A única sobrevivente deste massacre foi Nezuko, irmã de Tanjiro, que não saiu ilesa desse confronto e foi transformada em um demônio. Diante dessa trágica e sombria circunstância, ele parte numa jornada em busca de uma cura para Nezuko. 
Para isso, decide se juntar a uma organização dedicada a caçar demônios, pronto para também matar o responsável pela morte de seus pais. Enquanto se fortalece e aprofunda seus laços com outros membros da tropa de caçadores, Tanjiro enfrenta diferentes inimigos em parceria com seus companheiros Zenitsu Agatsuma e Inosuke Hashibira.
Ao lado também dos espadachins mais poderosos da organização, tudo precisará valer a pena.
No rigoroso programa de fortalecimento coletivo, suas habilidades serão precisas para fazê-lo escapar de um espaço misterioso onde ocorrerá a batalha final.',
'2025-07-11', 
'02:36:00', 
20000000.00,
'https://youtu.be/KN921po7cEE?si=ntX6STAyeGy8lHRg',
'https://br.web.img3.acsta.net/c_310_420/img/9c/0f/9c0f6e33b4fafe1a3490b3fe4b4d7cce.jpg'
)

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES ('Godzilla', 
'Um gigantesco réptil mutante com 50 metros de altura surge em virtude de testes nucleares. 
A monstruosa criatura cria um rastro de destruição no seu caminho até Tóquio, que corre o risco de ser totalmente destruída se o monstro, imenso como um dinossauro, não for detido. 
Cabe às autoridades conter o pânico da população e tentar deter ou, em última instância, matar o que ameaça a cidade.',
'1956-10-27',
'01:38:00',
900000.00,
'https://youtu.be/IVONRrcn9TI?si=ChzvxILiCBSoejfu',
'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/80/17/19961691.jpg'
)