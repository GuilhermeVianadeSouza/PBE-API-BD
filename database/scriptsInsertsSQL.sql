INSERT INTO tbl_idioma (nome, sigla) VALUES
('Português', 'PT-BR'),
('Inglês', 'EN-US'),
('Espanhol', 'ES'),
('Francês', 'FR'),
('Alemão', 'DE'),
('Italiano', 'IT'),
('Japonês', 'JP'),
('Mandarim', 'ZH'),
('Russo', 'RU'),
('Coreano', 'KO');

INSERT INTO tbl_genero (nome) VALUES
('Ação'),
('Aventura'),
('Comédia'),
('Drama'),
('Ficção Científica'),
('Terror'),
('Romance'),
('Fantasia'),
('Suspense'),
('Animação'),
('Documentário');

INSERT INTO tbl_pais (nome, sigla, nacionalidade) VALUES
('Brasil', 'BR', 'Brasileira'),
('Estados Unidos', 'US', 'Norte-americana'),
('Japão', 'JP', 'Japonesa'),
('Reino Unido', 'GB', 'Britânica'),
('França', 'FR', 'Francesa'),
('Alemanha', 'DE', 'Alemã'),
('Itália', 'IT', 'Italiana'),
('Canadá', 'CA', 'Canadense'),
('Espanha', 'ES', 'Espanhola'),
('Austrália', 'AU', 'Australiana');

INSERT INTO tbl_personagem (nome, codinome, descricao, historia_origem, foto_url, ocupacao) VALUES
('Tony Stark', 'Homem de Ferro', 'Gênio, bilionário, playboy e filantropo.', 'Construiu uma armadura de alta tecnologia para escapar de um cativeiro e decidiu usá-la para proteger o mundo.', 'http://img.url/ironman.jpg', 'Engenheiro / CEO'),
('Bruce Wayne', 'Batman', 'O Cavaleiro das Trevas de Gotham City.', 'Após testemunhar o assassinato de seus pais quando criança, jurou vingança contra o crime, treinando física e mentalmente.', 'http://img.url/batman.jpg', 'Empresário / Vigilante'),
('Clark Kent', 'Superman', 'O último filho de Krypton.', 'Enviado à Terra como um bebê antes da destruição de seu planeta natal, foi criado no Kansas e usa seus poderes solares para o bem.', 'http://img.url/superman.jpg', 'Jornalista'),
('Diana Prince', 'Mulher-Maravilha', 'Princesa das Amazonas.', 'Filha de Hipólita e Zeus, treinada como uma guerreira invencível na ilha de Themyscira antes de vir para o mundo dos homens.', 'http://img.url/wonderwoman.jpg', 'Curadora de Museu'),
('Peter Parker', 'Homem-Aranha', 'O amigão da vizinhança.', 'Mordido por uma aranha radioativa, ganhou habilidades de aracnídeo e aprendeu que com grandes poderes vêm grandes responsabilidades.', 'http://img.url/spiderman.jpg', 'Estudante / Fotógrafo'),
('James Bond', '007', 'Espião do MI6 com licença para matar.', 'Recrutado pela Inteligência Britânica, tornou-se o melhor agente de campo, conhecido por sua sofisticação e eficácia.', 'http://img.url/007.jpg', 'Espião'),
('Luke Skywalker', NULL, 'Jedi que trouxe equilíbrio à Força.', 'Criado em Tatooine, descobriu sua herança Jedi, destruiu a Estrela da Morte e redimiu seu pai, Darth Vader.', 'http://img.url/luke.jpg', 'Mestre Jedi'),
('Ellen Ripley', NULL, 'Sobrevivente da nave Nostromo.', 'Oficial de voo que enfrentou sozinha uma forma de vida alienígena hostil no espaço profundo.', 'http://img.url/ripley.jpg', 'Tenente'),
('Frodo Bolseiro', NULL, 'O portador do Anel.', 'Um hobbit do Condado que aceitou a perigosa missão de viajar até Mordor para destruir o Um Anel.', 'http://img.url/frodo.jpg', 'Aventureiro'),
('Wade Wilson', 'Deadpool', 'O Mercenário Tagarela.', 'Submetido a um experimento para curar seu câncer, ganhou fator de cura acelerado, mas ficou desfigurado e mentalmente instável.', 'http://img.url/deadpool.jpg', 'Mercenário');

INSERT INTO tbl_estudio (nome, data_fundacao, especialidade, id_pais) VALUES
('Estúdios Globo (Projac)', '1995-10-02', 'Teledramaturgia/Cinema', 1),
('Warner Bros. Studios Burbank', '1923-04-04', 'Cinema/TV', 2),
('Pinewood Studios', '1936-09-30', 'Filmes de Ação/007', 4),
('Studio Ghibli', '1985-06-15', 'Animação 2D', 3),
('Cinecittà', '1937-04-28', 'Cinema Clássico', 7),
('Babelsberg Studio', '1912-02-12', 'Cinema Europeu', 6),
('Village Roadshow Studios', '1986-01-01', 'Blockbusters', 10),
('Vancouver Film Studios', '1999-01-01', 'Séries/Sci-Fi', 8),
('Toei Animation', '1948-01-23', 'Animes/Tokusatsu', 3),
('Gaumont', '1895-07-01', 'Cinema Francês', 5);

INSERT INTO tbl_produtora (nome, data_fundacao, resumo_historia, id_pais) VALUES
('O2 Filmes', '1991-01-01', 'Produtora brasileira aclamada internacionalmente, fundada por Fernando Meirelles.', 1),
('A24', '2012-08-20', 'Conhecida por filmes independentes de terror e drama elevado.', 2),
('Lucasfilm Ltd.', '1971-12-10', 'Criadora das franquias Star Wars e Indiana Jones.', 2),
('BBC Film', '1990-01-01', 'Braço cinematográfico da emissora pública britânica.', 4),
('Toho Co., Ltd.', '1932-08-12', 'Famosa por criar o Godzilla e distribuir filmes do Ghibli.', 3),
('EuropaCorp', '2000-09-01', 'Fundada por Luc Besson, foca em ação e sci-fi europeu.', 5),
('Constantin Film', '1950-04-01', 'Principal produtora alemã, responsável por Resident Evil.', 6),
('Lionsgate', '1997-07-03', 'Produtora canadense-americana focada em franquias jovens.', 8),
('El Deseo', '1987-01-01', 'Produtora dos irmãos Almodóvar.', 9),
('Kennedy Miller Mitchell', '1973-01-01', 'Produtora australiana famosa pela saga Mad Max.', 10);

INSERT INTO tbl_dublador (nome, data_nascimento, data_falecimento, biografia, estudio_principal, ativo, id_pais) VALUES
('Guilherme Briggs', '1970-07-25', NULL, 'Voz do Superman, Buzz Lightyear e Mickey Mouse no Brasil.', 'Delart', TRUE, 1),
('Wendel Bezerra', '1974-06-18', NULL, 'Voz icônica de Goku e Bob Esponja.', 'Unidub', TRUE, 1),
('Isaac Bardavid', '1931-02-13', '2022-02-01', 'Lendária voz do Wolverine e Esqueleto.', 'Wan Macher', FALSE, 1),
('Mel Blanc', '1908-05-30', '1989-07-10', 'O homem de mil vozes, criador das vozes dos Looney Tunes.', 'Warner Bros', FALSE, 2),
('Masako Nozawa', '1936-10-25', NULL, 'A voz original japonesa de Goku desde os anos 80.', 'Toei', TRUE, 3),
('Fernanda Bullara', '1985-02-11', NULL, 'Voz de diversas personagens de animes e da Capitã Marvel.', 'Centauro', TRUE, 1),
('James Earl Jones', '1931-01-17', NULL, 'A voz original de Darth Vader e Mufasa.', 'Disney', FALSE, 2),
('Rie Kugimiya', '1979-05-30', NULL, 'Famosa dubladora japonesa conhecida como Rainha do Tsundere.', 'Japão', TRUE, 3),
('Tara Strong', '1973-02-12', NULL, 'Voz original de Timmy Turner, Ravena e Arlequina.', 'Cartoon Network', TRUE, 8),
('Waldyr Sant’anna', '1941-11-26', '2018-04-21', 'A voz clássica de Homer Simpson no Brasil.', 'VTI Rio', FALSE, 1);

INSERT INTO tbl_ator (nome, idade, nome_artistico, biografia, altura_cm, data_nascimento, data_falecimento, premio_destaque, foto_perfil_url, id_pais) VALUES
('Fernanda Montenegro', 94, NULL, 'Dama do teatro e cinema brasileiro, indicada ao Oscar.', 163, '1929-10-16', NULL, 'Urso de Prata', 'url_fernanda.jpg', 1),
('Robert Downey Jr.', 59, NULL, 'Ator que revitalizou sua carreira como Homem de Ferro.', 174, '1965-04-04', NULL, 'Oscar de Melhor Ator Coadjuvante', 'url_rdj.jpg', 2),
('Ken Watanabe', 64, NULL, 'Ator japonês conhecido por O Último Samurai.', 184, '1959-10-21', NULL, 'Japan Academy Prize', 'url_ken.jpg', 3),
('Emma Watson', 34, NULL, 'Famosa pelo papel de Hermione Granger.', 165, '1990-04-15', NULL, 'MTV Movie Award', 'url_emma.jpg', 4),
('Marion Cotillard', 48, NULL, 'Atriz francesa aclamada internacionalmente.', 169, '1975-09-30', NULL, 'Oscar de Melhor Atriz', 'url_marion.jpg', 5),
('Christoph Waltz', 67, NULL, 'Ator austro-alemão famoso pelos vilões de Tarantino.', 170, '1956-10-04', NULL, 'Oscar de Melhor Ator Coadjuvante', 'url_waltz.jpg', 6),
('Roberto Benigni', 71, NULL, 'Diretor e ator italiano de A Vida é Bela.', 168, '1952-10-27', NULL, 'Oscar de Melhor Ator', 'url_benigni.jpg', 7),
('Ryan Reynolds', 47, NULL, 'Ator canadense conhecido pelo humor sarcástico.', 188, '1976-10-23', NULL, 'People Choice', 'url_ryan.jpg', 8),
('Penélope Cruz', 50, NULL, 'Musa do cinema espanhol.', 168, '1974-04-28', NULL, 'Oscar de Melhor Atriz Coadjuvante', 'url_penelope.jpg', 9),
('Hugh Jackman', 55, NULL, 'Conhecido por interpretar Wolverine.', 188, '1968-10-12', NULL, 'Tony Award', 'url_hugh.jpg', 10);

INSERT INTO tbl_roterista (nome, mini_bio, data_nascimento, data_falecimento, biografia, ativo, id_pais) VALUES
('Quentin Tarantino', 'Famoso por diálogos não lineares e violência.', '1963-03-27', NULL, 'Começou trabalhando em locadora.', TRUE, 2),
('Christopher Nolan', 'Conhecido por roteiros complexos e tempo não-linear.', '1970-07-30', NULL, 'Escreve a maioria de seus filmes com o irmão.', TRUE, 4),
('Hayao Miyazaki', 'Lenda da animação japonesa.', '1941-01-05', NULL, 'Escreve roteiros baseados em storyboards.', TRUE, 3),
('Pedro Almodóvar', 'Roteirista espanhol de dramas complexos.', '1949-09-25', NULL, 'Foca em personagens femininas fortes.', TRUE, 9),
('Braulio Mantovani', 'Roteirista brasileiro indicado ao Oscar.', '1963-07-01', NULL, 'Escreveu Cidade de Deus e Tropa de Elite.', TRUE, 1),
('Phoebe Waller-Bridge', 'Conhecida por quebrar a quarta parede.', '1985-07-14', NULL, 'Criadora de Fleabag.', TRUE, 4),
('Aaron Sorkin', 'Mestre dos diálogos rápidos.', '1961-06-09', NULL, 'Escreveu A Rede Social.', TRUE, 2),
('Luc Besson', 'Roteirista de ação e sci-fi.', '1959-03-18', NULL, 'Escreveu O Quinto Elemento.', TRUE, 5),
('George Miller', 'Criador do universo Mad Max.', '1945-03-03', NULL, 'Escreve roteiros com foco visual.', TRUE, 10),
('Michael Haneke', 'Roteirista de dramas psicológicos.', '1942-03-23', NULL, 'Conhecido por Violência Gratuita.', TRUE, 6);

INSERT INTO tbl_diretor (nome, data_nascimento, data_falecimento, biografia, foto_url, id_pais) VALUES
('Steven Spielberg', '1946-12-18', NULL, 'Diretor mais comercialmente bem-sucedido da história.', 'url_spielberg.jpg', 2),
('Fernando Meirelles', '1955-11-09', NULL, 'Diretor brasileiro de renome internacional.', 'url_meirelles.jpg', 1),
('Martin Scorsese', '1942-11-17', NULL, 'Mestre dos filmes de máfia.', 'url_scorsese.jpg', 2),
('Akira Kurosawa', '1910-03-23', '1998-09-06', 'Um dos cineastas mais influentes do Japão.', 'url_kurosawa.jpg', 3),
('Alfred Hitchcock', '1899-08-13', '1980-04-29', 'O Mestre do Suspense.', 'url_hitchcock.jpg', 4),
('Jean-Luc Godard', '1930-12-03', '2022-09-13', 'Pioneiro da Nouvelle Vague.', 'url_godard.jpg', 5),
('Federico Fellini', '1920-01-20', '1993-10-31', 'Conhecido por seu estilo visual distinto.', 'url_fellini.jpg', 7),
('Denis Villeneuve', '1967-10-03', NULL, 'Mestre moderno da ficção científica.', 'url_denis.jpg', 8),
('Guillermo del Toro', '1964-10-09', NULL, 'Diretor mexicano focado em fantasia (baseado em estúdio US/ES).', 'url_del_toro.jpg', 9),
('Baz Luhrmann', '1962-09-17', NULL, 'Conhecido por filmes visualmente extravagantes.', 'url_baz.jpg', 10);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailler, capa, id_pais) VALUES
('Cidade de Deus', 'Jovens crescem em meio à violência no Rio de Janeiro.', '2002-08-30', '02:10:00', 3300000.00, 'url_cdd_trailer', 'capa_cdd.jpg', 1),
('Vingadores: Ultimato', 'Os heróis tentam reverter as ações de Thanos.', '2019-04-26', '03:01:00', 356000000.00, 'url_endgame_trailer', 'capa_endgame.jpg', 2),
('A Viagem de Chihiro', 'Uma garota entra em um mundo de espíritos.', '2001-07-20', '02:05:00', 19000000.00, 'url_chihiro_trailer', 'capa_chihiro.jpg', 3),
('007 - Skyfall', 'Bond deve provar sua lealdade a M.', '2012-10-26', '02:23:00', 200000000.00, 'url_skyfall_trailer', 'capa_skyfall.jpg', 4),
('O Fabuloso Destino de Amélie Poulain', 'Uma garçonete decide mudar a vida das pessoas.', '2001-04-25', '02:02:00', 10000000.00, 'url_amelie_trailer', 'capa_amelie.jpg', 5),
('A Queda! As Últimas Horas de Hitler', 'Os últimos dias do ditador em seu bunker.', '2004-09-16', '02:36:00', 13500000.00, 'url_downfall_trailer', 'capa_downfall.jpg', 6),
('A Vida é Bela', 'Um pai judeu protege o filho no campo de concentração usando humor.', '1997-12-20', '01:56:00', 20000000.00, 'url_lifeisbeautiful', 'capa_vib.jpg', 7),
('Duna: Parte 2', 'Paul Atreides se une aos Fremen.', '2024-03-01', '02:46:00', 190000000.00, 'url_dune2', 'capa_dune2.jpg', 2),
('O Labirinto do Fauno', 'Uma menina encontra um fauno na Espanha pós-guerra.', '2006-10-11', '01:58:00', 19000000.00, 'url_pans_labyrinth', 'capa_pans.jpg', 9),
('Mad Max: Estrada da Fúria', 'Uma perseguição alucinante no deserto.', '2015-05-15', '02:00:00', 150000000.00, 'url_madmax', 'capa_madmax.jpg', 10);

INSERT INTO tbl_elenco (tipo_atuacao, funcao_dramatica, id_filme, id_personagem, id_ator) VALUES
('Live Action', 'Protagonista', 2, 1, 2), 
('Live Action', 'Protagonista', 7, 10, 7),  
('Voz Original', 'Protagonista', 3, 7, 3),  
('Live Action', 'Coadjuvante', 1, 8, 1),    
('Live Action', 'Antagonista', 6, 6, 6),    
('Live Action', 'Protagonista', 4, 6, 10), 
('Live Action', 'Coadjuvante', 8, 7, 4),    
('Live Action', 'Protagonista', 5, 4, 5),   
('Live Action', 'Antagonista', 10, 10, 8),  
('Live Action', 'Coadjuvante', 9, 4, 9);    

INSERT INTO tbl_dublagem (tipo_dublagem, id_idioma, id_dublador, id_elenco) VALUES
('Dublagem Oficial BR', 1, 1, 1),  
('Dublagem Oficial BR', 1, 10, 2), 
('Voz Original JP', 7, 5, 3),     
('Dublagem Oficial BR', 1, 6, 7), 
('Dublagem Oficial BR', 1, 3, 9), 
('Dublagem Oficial BR', 1, 2, 6),  
('Redublagem TV', 1, 1, 5),      
('Voz Original EN', 2, 7, 1), 
('Dublagem PT-BR', 1, 6, 8),      
('Voz Original JP', 7, 8, 3); 

INSERT INTO tbl_estudio_filme (tipo_associacao, id_estudio, id_filme) VALUES
('Coprodução', 1, 1),
('Produção Principal', 2, 2), 
('Produção Principal', 4, 3), 
('Filmagens', 3, 4),   
('Produção Associada', 7, 5), 
('Locação', 6, 6),    
('Produção Principal', 7, 7),  
('Efeitos Visuais', 8, 8), 
('Distribuição', 5, 9), 
('Filmagens', 7, 10);  

INSERT INTO tbl_diretor_filme (tipo_direcao, id_diretor, id_filme) VALUES
('Direção Geral', 2, 1),
('Produção Executiva', 1, 2), -
('Consultoria Criativa', 4, 3),
('Direção Geral', 1, 4), 
('Direção de Arte', 6, 5), 
('Direção Geral', 6, 6),
('Direção Geral', 7, 7),   
('Direção Geral', 8, 8),
('Direção Geral', 9, 9), 
('Direção Geral', 10, 10); 

INSERT INTO tbl_roterista_filme (tipo_credito, detalhe_adaptacao, id_roterista, id_filme) VALUES
('Roteiro Adaptado', 'Baseado no livro de Paulo Lins', 5, 1), 
('Roteiro Original', NULL, 3, 3),
('Roteiro Adaptado', 'Baseado na obra de Frank Herbert', 2, 8), 
('Argumento', NULL, 9, 10),
('Roteiro Original', NULL, 4, 9),  
('Colaboração', NULL, 1, 2),
('Roteiro Original', NULL, 8, 5),
('Roteiro Adaptado', NULL, 10, 6),
('Diálogos', NULL, 6, 4),  
('Roteiro Original', NULL, 7, 7);  

INSERT INTO tbl_produtora_filme (tipo_participacao, produtora_principal, id_produtora, id_filme) VALUES
('Produção', TRUE, 1, 1), 
('Coprodução', FALSE, 2, 8), 
('Produção', TRUE, 5, 3),    
('Produção', TRUE, 4, 4),   
('Distribuição', FALSE, 6, 5), 
('Produção', TRUE, 7, 6),    
('Produção', TRUE, 9, 7),    
('Financiamento', TRUE, 3, 2), 
('Produção', TRUE, 9, 9), 
('Produção', TRUE, 10, 10);

INSERT INTO tbl_genero_filme (id_genero, id_filme) VALUES
(4, 1),
(1, 2),  
(10, 3), 
(1, 4),  
(3, 5),   
(4, 6),  
(3, 7),   
(5, 8),   
(8, 9),  
(1, 10);  