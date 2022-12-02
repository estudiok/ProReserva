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

