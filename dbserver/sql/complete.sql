DROP DATABASE IF EXISTS dbreservacion;
CREATE DATABASE dbreservacion;
USE dbreservacion;

CREATE TABLE rol (
    idRol INT PRIMARY KEY AUTO_INCREMENT,
    tipoRol VARCHAR(100)
);

CREATE TABLE categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    tipoCategoria VARCHAR(100)
);

CREATE TABLE libro (
    idLibro INT PRIMARY KEY AUTO_INCREMENT,
    idCategoria INT DEFAULT 1,
    titulo VARCHAR(200),
    autor VARCHAR(200),
    codigo VARCHAR(100),
    estado BOOLEAN DEFAULT TRUE,
    disponible BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    idRol INT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    usuario VARCHAR(100),
    contrasenia VARCHAR(100),
    FOREIGN KEY (idRol) REFERENCES rol(idRol)
);

CREATE TABLE prestamolibro (
    idPrestamoLibro INT PRIMARY KEY AUTO_INCREMENT,
    idLibro INT,
    idBlibliotecario INT,
    idEstudiante INT,
    estadoSolicitud ENUM('Solicitado','Aceptada', 'Rechazada', 'Cancelado'),
    estadoLibro BOOLEAN,
    fechaInicio DATETIME,
    fechaFin DATETIME,
    terminado BOOLEAN,
    fechaSolicitud DATETIME,
    FOREIGN KEY (idBlibliotecario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idEstudiante) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idLibro) REFERENCES libro(idLibro)
);

-- roles
INSERT INTO rol(tipoRol) VALUES ('Estudiante');
INSERT INTO rol(tipoRol) VALUES ('Bibliotecario');

-- categorias
INSERT INTO categoria(tipoCategoria) VALUES ('Libro');
INSERT INTO categoria(tipoCategoria) VALUES ('Tesis');
INSERT INTO categoria(tipoCategoria) VALUES ('Revista');


-- libros
INSERT INTO libro(titulo, autor, codigo, disponible) VALUES ('El Principito', 'Exupery', 'CFJ87', false);
INSERT INTO libro(titulo, autor, codigo, disponible) VALUES ('Don Quijote', 'Miguel Cervantes', 'CFR53', true);
INSERT INTO libro(titulo, autor, codigo, disponible) VALUES ('Hacking', 'Chema Alonso', 'ER432', false);
INSERT INTO libro(titulo, autor, codigo) VALUES ('Criptografia', 'Luis Hernan', 'ZAD34');
INSERT INTO libro(titulo, autor, codigo) VALUES ('Python a fondo', 'Oscar Ramos', 'WERA2');
INSERT INTO libro(titulo, autor, codigo) VALUES ('Cerebro de metal', 'Jorge Llanos', 'GGR23');
INSERT INTO libro(titulo, autor, codigo) VALUES ('La iliad', 'Homero', 'CJ781');

-- libros - tesis
INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (2, 'DESARROLLO DE APP WEB CON CYTHON', 'Pedro Apaza', 'DFSD23');
INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (2, 'IMPLEMENTACION DE ARDUINO CON C++ PURO', 'Rogelio Ticona', 'QWEER23');
INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (2, 'DESARROLLO DE APP WEB CON MACHINE LEARNING', 'Maria Perez', '2343RDFF');

-- libro - revista
INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (3, 'Prepacion para un matriminio feliz', 'Werbling Mendoza', 'WERWD23V');
INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (3, 'Evidencias cientficas de que Dios existe', 'Rigoberto Magne', 'YHFD234');
INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (3, '¿La programación, un arte?', 'Ernesto Duque', 'POFF5TR');



-- Usuarios

-- Usuario = Estudiante
INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia) VALUES (1, 'Pedro', 'Alanoca', 'palanoca', 'palanoca');
INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia) VALUES (1, 'Rosendo', 'Loza', 'rloza', 'rloza');
INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia) VALUES (1, 'Clintz', 'Iswod', 'ciswod', 'ciswod');

-- Usuario = Bibliotecario
INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia) VALUES (2, 'German', 'Garcia', 'ggarcia', 'ggarcia');
INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia) VALUES (2, 'Alfredo', 'Ramos', 'aramos', 'aramos');
INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia) VALUES (2, 'Jose', 'Xerez', 'jxerez', 'jxerez');


-- Prestamo Libro

INSERT INTO prestamolibro(idLibro, idBlibliotecario, idEstudiante, estadoSolicitud, estadoLibro, fechaInicio, fechaFin, fechaSolicitud, terminado) VALUES (3, 4, 2, 2, false, '2022-10-19 14:43', '2022-10-20 14:43', '2022-10-19 12:30', false);
INSERT INTO prestamolibro(idLibro, idBlibliotecario, idEstudiante, estadoSolicitud, estadoLibro, fechaInicio, fechaFin, fechaSolicitud, terminado) VALUES (2, 4, 2, 2, true, '2022-10-19 13:43', '2022-10-20 13:43', '2022-10-19 12:43', true);
INSERT INTO prestamolibro(idLibro, idBlibliotecario, idEstudiante, estadoSolicitud, estadoLibro, fechaInicio, fechaFin, fechaSolicitud, terminado) VALUES (1, 4, 2, 1, false, null, null, '2022-10-19 13:43', false);

INSERT INTO prestamolibro(idLibro, idBlibliotecario, idEstudiante, estadoSolicitud, estadoLibro, fechaInicio, fechaFin, fechaSolicitud, terminado) VALUES (4, 4, 3, 3, false, null, null, '2022-10-19 10:43', true);
INSERT INTO prestamolibro(idLibro, idBlibliotecario, idEstudiante, estadoSolicitud, estadoLibro, fechaInicio, fechaFin, fechaSolicitud, terminado) VALUES (3, 4, 3, 2, true, '2022-10-19 14:43', '2022-10-20 14:43', '2022-10-19 12:43', true);
