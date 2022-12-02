


SELECT * FROM prestamolibro;

SELECT titulo, idEstudiante, estadoSolicitud, estadoLibro
FROM libro l
JOIN prestamolibro p on l.idLibro = p.idLibro
AND p.estadoSolicitud != 3;


SELECT idEstudiante, estadoSolicitud, estadoLibro
FROM prestamolibro
WHERE estadoSolicitud = 1
AND estadoLibro = 1;



SELECT * FROM prestamolibro
WHERE estadoSolicitud = 2
AND estadoLibro = 1
AND '2022-10-19' = DATE(fechaSolicitud)
UNION SELECT * FROM prestamolibro
WHERE estadoSolicitud = 1
AND '2022-10-19' = DATE(fechaSolicitud);

DELIMITER //
DROP PROCEDURE IF EXISTS librosDisponibles;
CREATE PROCEDURE librosDisponibles(in fechaActual DATE, in idLibroSearch INT)
BEGIN

    IF idLibroSearch != 0 THEN
        SELECT *
        FROM libro
        WHERE idLibro NOT IN (
            SELECT prestamolibro.idLibro FROM prestamolibro
            WHERE estadoSolicitud = 2
            AND estadoLibro = false
            AND fechaActual = DATE(fechaSolicitud)
            UNION SELECT prestamolibro.idLibro FROM prestamolibro
            WHERE estadoSolicitud = 1
            AND fechaActual = DATE(fechaSolicitud)
        )
        AND libro.idLibro = idLibroSearch;

    ELSE
        SELECT *
        FROM libro
        WHERE idLibro NOT IN (
            SELECT prestamolibro.idLibro FROM prestamolibro
            WHERE estadoSolicitud = 2
            AND (estadoLibro = false)
            AND (DATE(fechaSolicitud) = fechaActual)
            UNION SELECT prestamolibro.idLibro FROM prestamolibro
            WHERE estadoSolicitud = 1
            AND DATE(fechaSolicitud) = fechaActual
        );
    END IF;



END //
DELIMITER ;

CALL librosDisponibles('2022-10-19', 0);

SELECT prestamolibro.idLibro FROM prestamolibro
            WHERE estadoSolicitud = 2
            AND (estadoLibro = false)
            AND (DATE(fechaSolicitud) = '2022-10-19')
            UNION SELECT prestamolibro.idLibro FROM prestamolibro
            WHERE estadoSolicitud = 1
            AND DATE(fechaSolicitud) = '2022-10-19';

SELECT *
FROM prestamolibro p
JOIN libro l on p.idLibro = l.idLibro
AND l.idLibro = 5
ORDER BY estadoLibro ASC
LIMIT 1;


-- 1. Consultar libros disponibles o no reservados
SELECT *
FROM libro
WHERE disponible = true;

-- 2. Consulta de prestados actualmente(activo) PARA BIBLITECARIO id = 4
 SELECT *
FROM prestamolibro p
JOIN libro l on l.idLibro = p.idLibro
AND p.terminado = false
AND p.estadoSolicitud = 1
AND p.idBlibliotecario = 4;

-- 2.1 Consultar Libros aceptados y rechazados a modo de historial.
SELECT *
FROM prestamolibro p
JOIN libro l on l.idLibro = p.idLibro
AND p.terminado = false
AND p.estadoSolicitud != 1
AND p.idBlibliotecario = 4;

-- 3 Consulta de prestados actualmente  del estudiante id = 2

SELECT *
FROM prestamolibro p
JOIN libro l on l.idLibro = p.idLibro
AND p.idEstudiante = 2;


-- 4. Busquedo por Codigo, titulo, autor
SELECT *
FROM libro
WHERE disponible = true
AND idLibro IN (
        SELECT idLibro
        FROM libro
        WHERE titulo LIKE '%cf%'
        OR autor LIKE '%cf%'
        OR codigo LIKE '%cf%'
    )
;



-- 5 Listar solicitudes de reservacion para Bibliotecario idUsuario = 4

SELECT libro.*, p.*,u.idUsuario, u.nombre, u.apellido, u.idRol
FROM libro
JOIN prestamolibro p on libro.idLibro = p.idLibro
AND p.terminado = false
AND p.estadoSolicitud = 1
JOIN usuario u on u.idUsuario = p.idEstudiante;


-- 6 Listar reservacion QUE NO HAN DEVUELTO LIBRO para biblitecario idUsuario = 4
SELECT libro.*, p.*,u.idUsuario, u.nombre, u.apellido, u.idRol
FROM libro
JOIN prestamolibro p on libro.idLibro = p.idLibro
AND p.estadoSolicitud = 2
JOIN usuario u on u.idUsuario = p.idEstudiante
AND p.idBlibliotecario = ?
ORDER BY p.terminado;


-- SELECT libro.*, p.*,u.idUsuario, u.nombre, u.apellido, u.idRol
-- FROM libro
-- JOIN prestamolibro p on libro.idLibro = p.idLibro
-- AND p.terminado = false
-- AND p.estadoSolicitud = 2
-- JOIN usuario u on u.idUsuario = p.idEstudiante
-- AND p.idBlibliotecario = ?
-- ORDER BY p.terminado;

-- 7 aceptar reservacion
INSERT INTO prestamolibro(idBlibliotecario, estadoSolicitud, estadoLibro, fechaInicio, fechaFin) 
VALUES (?, ?, ?, ?,?);

            UPDATE prestamolibro
            SET idBlibliotecario = 4,
                estadoSolicitud = 2,
                estadoLibro = false,
                fechaInicio = '2022-12-12 12:12:00',
                fechaFin = '2022-12-12 12:12:00'
            WHERE idEstudiante = 2
            AND idLibro = 1
            AND terminado = false;

-- 8 rechazar reservacion
INSERT INTO prestamolibro(idBlibliotecario, estadoSolicitud, terminado) VALUES (?, ?, ?);
-- poner disponible = true en la tabla libro

-- 9 Cuando devuelve el libro
INSERT INTO prestamolibro(estadoLibro, terminado) VALUES (?, ?);
-- poner disponible = true en la tabla libro

            UPDATE prestamolibro
            SET estadoLibro = true,
                terminado = true,
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND idBibliotecario = ?
            AND terminado = false,
            AND estadoSolicitud = 2;



SELECT *
FROM usuario
WHERE usuario = 'rloza'
AND contrasenia = 'rloza';


SELECT *
FROM rol
JOIN usuario u on rol.idRol = u.idRol

            UPDATE prestamolibro
            SET idBlibliotecario = ?,
                estadoSolicitud = ?,
                estadoLibro = ?,
                fechaInicio = ?,
                fechaFin = ?
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND terminado = ?;


UPDATE prestamolibro
            SET estadoLibro = true,
                terminado = true
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND idBlibliotecario = ?
            AND terminado = false
            AND estadoSolicitud = 2;

-- Seleccionar todos los libros

SELECT l.*, c.tipoCategoria
FROM libro l
JOIN categoria c on c.idCategoria = l.idCategoria;

SELECT * FROM categoria;

SELECT * FROM libro
WHERE idLibro = ?;

UPDATE libro
    SET idCategoria = ?,
        titulo = ?,
        autor = ?,
        codigo = ?
WHERE idLibro = ?;


UPDATE libro
    SET estado = ?
WHERE idLibro = ?;

SELECT *
FROM libro
WHERE disponible = true
AND estado = true;