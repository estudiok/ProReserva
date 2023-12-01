<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mytime = Carbon::now('america/la_paz')->toDateString();

        $data = DB::select('
            SELECT *
            FROM libro
            WHERE disponible = true
            AND estado = true;
        ');


        return $data;
    }

    public function libroSearch(Request $request) {

        $sql = "
        SELECT *
        FROM libro
        WHERE disponible = true
        AND idLibro IN (
            SELECT idLibro
            FROM libro
            WHERE titulo LIKE '%".$request['dato']."%'
            OR autor LIKE '%".$request['dato']."%'
            OR codigo LIKE '%".$request['dato']."%'
        );
        ";

        $data = DB::select($sql);

        return $data;
    }

    public function getCredentials(Request $request) {
        $sql = "
            SELECT *
            FROM usuario
            WHERE usuario = '".$request['user']."';
            
        ";
        // AND contrasenia = '".$request['pass']."';

       
        $data = DB::select($sql);
        if (isset($data[0]->contrasenia)) {
            if (password_verify($request['pass'], $data[0]->contrasenia)){
                $token = hash('sha256', $plainTextToken = Str::random(40));
                
                $datafull = json_encode($data[0]);
                $arrayData = json_decode($datafull, true);
                $arrayData['token'] = $token;
                DB::select("UPDATE token_custom SET token=? WHERE id_user=?;", [$arrayData['token'], $arrayData['idUsuario']]);

                return json_encode([$arrayData]);
            }
        }

        return json_encode([]);
        // return json_encode($arrayData);
    }

    public function setPrestamoParcial(Request $request) {
        $sql = "
            INSERT INTO prestamolibro(idLibro, idEstudiante, fechaSolicitud, estadoSolicitud, terminado) VALUES(?, ?, ?, 1, false);
        ";

        $status = DB::insert($sql, [$request['idLibro'], $request['idEstudiante'], $request['fechaSolicitud']]);
        // echo $status;
        return $status;
    }

    public function setDisponibleLibro(Request $request) {
        $sql = "
            UPDATE libro SET disponible = ? WHERE idLibro = ?;
        ";

        $status = DB::update($sql, [$request['disponible'], $request['idLibro']]);
        // echo $status;
        return $status;
    }


    public function listPrestamosEstudiantes(Request $request) {
        $sql = "
            SELECT *
            FROM prestamolibro p
            JOIN libro l on l.idLibro = p.idLibro
            AND p.idEstudiante = ?;
        ";

        $data = DB::select($sql, [$request['idEstudiante']]);
        // echo $status;
        return $data;
    }

    public function cancelarPrestamo(Request $request) {
        $sql = "
            UPDATE prestamolibro
            SET terminado = true, estadoSolicitud = 4
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND terminado = false;
        ";

        $status = DB::update($sql, [$request['idEstudiante'], $request['idLibro']]);
        return $status;
    }

    public function reservacionPendiente(Request $request) {
        $sql = "
            SELECT libro.*, p.*,u.idUsuario, u.nombre, u.apellido, u.idRol
            FROM libro
            JOIN prestamolibro p on libro.idLibro = p.idLibro
            AND p.terminado = false
            AND p.estadoSolicitud = 1
            JOIN usuario u on u.idUsuario = p.idEstudiante
            ;
        ";



        $data = DB::select($sql);
        return $data;
    }


    public function aceptarReservacion(Request $request) {
        $sql = "
            UPDATE prestamolibro
            SET idBlibliotecario = ?,
                estadoSolicitud = ?,
                estadoLibro = ?,
                fechaInicio = ?,
                fechaFin = ?
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND terminado = ?;

        ";
        $status = DB::update($sql, [$request['idBlibliotecario'],
                                    $request['estadoSolicitud'],
                                    $request['estadoLibro'],
                                    $request['fechaInicio'],
                                    $request['fechaFin'],
                                    $request['idEstudiante'],
                                    $request['idLibro'],
                                    $request['terminado']
                                ]);
        return $status;
    }

    public function rechazarReservacion(Request $request) {
        $sql = "
            UPDATE prestamolibro
            SET idBlibliotecario = ?,
                estadoSolicitud = ?,
                terminado = ?
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND terminado = ?;
        ";

        $status = DB::update($sql, [$request['idBlibliotecario'],
                                    $request['estadoSolicitud'],
                                    $request['terminadoUser'],
                                    $request['idEstudiante'],
                                    $request['idLibro'],
                                    $request['terminado']
                                ]);

        return $status;
    }

    public function listarLibrosDevueltos(Request $request) {
        $sql = "
            SELECT libro.*, p.*,u.idUsuario, u.nombre, u.apellido, u.idRol
            FROM libro
            JOIN prestamolibro p on libro.idLibro = p.idLibro
            AND p.estadoSolicitud = 2
            JOIN usuario u on u.idUsuario = p.idEstudiante
            AND p.idBlibliotecario = ?
            ORDER BY p.terminado;
        ";

        $data = DB::select($sql, [$request['idBibliotecario']]);

        return $data;
    }

    public function devolverLibros(Request $request) {
        $sql = "
            UPDATE prestamolibro
            SET estadoLibro = true,
                terminado = true
            WHERE idEstudiante = ?
            AND idLibro = ?
            AND idBlibliotecario = ?
            AND terminado = false
            AND estadoSolicitud = 2;
        ";

        $status = DB::update($sql, [$request['idEstudiante'],
                                    $request['idLibro'],
                                    $request['idBibliotecario']]);
        return $status;
    }




    public function obtenerTodosLibros(Request $request) {
        $data = DB::select("
                SELECT l.*, c.tipoCategoria
                FROM libro l
                JOIN categoria c on c.idCategoria = l.idCategoria;
            ");
        return $data;
    }


    public function obtenerCategoriaLibro(Request $request) {
        $data = DB::select('SELECT * FROM categoria;');
        return $data;
    }

    public function crearLibro(Request $request) {
        $sql = "
            INSERT INTO libro(idCategoria, titulo, autor, codigo) VALUES (?, ?, ?, ?);
        ";
        $status = DB::insert($sql, [$request['idCategoria'], $request['titulo'], $request['autor'], $request['codigo']]);
        return $status;
    }

    public function actulizarLibro($id, Request $request) {
        $data = DB::select('SELECT * FROM libro WHERE idLibro = ?;', [$id]);
        return $data;
    }

    public function actualizarGuardarLibro(Request $request) {
        $sql = "
        UPDATE libro
        SET idCategoria = ?,
            titulo = ?,
            autor = ?,
            codigo = ?
        WHERE idLibro = ?;
        ";

        $status = DB::update($sql, [$request['idCategoria'],
                                    $request['titulo'],
                                    $request['autor'],
                                    $request['codigo'],
                                    $request['idLibro']]);
        return $status;
    }


    public function desactivarLibro(Request $request) {
        $sql = "
            UPDATE libro
                SET estado = ?
            WHERE idLibro = ?;
        ";

        $status = DB::update($sql, [$request['estado'],
                                    $request['idLibro']]);
        return $status;
    }

    public function aniadirUsuario(Request $request){
        $sql = "
            INSERT INTO usuario(idRol, nombre, apellido, usuario, contrasenia)
            VALUES (?, ?, ?, ?, ?);
        ";

        $status = DB::update($sql, [$request['idRol'],
                                    $request['nombre'],
                                    $request['apellido'],
                                    $request['usuario'],
                                    $request['contrasenia']]);
        return $status;
    }

    public function obtenerUsuarios() {
        $data = DB::select('
            SELECT *
            FROM usuario;
        ');

        return $data;
    }

    public function obtenerRoles() {
        $data = DB::select('
            SELECT *
            FROM rol;
        ');

        return $data;
    }

    public function obtenerReporteCantidad() {
        $data = DB::selectOne("
        SELECT
        COUNT(CASE WHEN r.tipoRol = 'Estudiante' THEN 1 END) AS cantEstudiantes,
        COUNT(CASE WHEN r.tipoRol = 'Bibliotecario' THEN 1 END) AS cantBibliotecarios
        FROM
            usuario JOIN rol r on r.idRol = usuario.idRol;
        ");

    return $data;

    }

    public function obetenerReporteCategoria() {
        $data = DB::selectOne("
            SELECT
            COUNT(CASE WHEN c.idCategoria = 1 THEN 1 END) AS libros,
            COUNT(CASE WHEN c.idCategoria = 2 THEN 1 END) AS tesis,
            COUNT(CASE WHEN c.idCategoria = 3 THEN 1 END) AS revistas
            FROM libro l JOIN categoria c on c.idCategoria = l.idCategoria;
        ");

        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
