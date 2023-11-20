<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/reservacion', 'App\Http\Controllers\EstudianteController@index');
Route::post('/libro', 'App\Http\Controllers\EstudianteController@libroSearch');
Route::post('/getuser', 'App\Http\Controllers\EstudianteController@getCredentials');
Route::post('/setpartial', 'App\Http\Controllers\EstudianteController@setPrestamoParcial');
Route::post('/disponiblebook', 'App\Http\Controllers\EstudianteController@setDisponibleLibro');
Route::post('/listprestamo', 'App\Http\Controllers\EstudianteController@listPrestamosEstudiantes');
Route::post('/cancelarprestamo', 'App\Http\Controllers\EstudianteController@cancelarPrestamo');
Route::get('/reservacionpendiente', 'App\Http\Controllers\EstudianteController@reservacionPendiente');

Route::post('/aceptarreservacion', 'App\Http\Controllers\EstudianteController@aceptarReservacion');
Route::post('/rechazarreservacion', 'App\Http\Controllers\EstudianteController@rechazarReservacion');

Route::post('/listarlibrosdevueltos', 'App\Http\Controllers\EstudianteController@listarLibrosDevueltos');

Route::post('/devolverlibros', 'App\Http\Controllers\EstudianteController@devolverLibros');


Route::get('/obtenertodoslibros', 'App\Http\Controllers\EstudianteController@obtenerTodosLibros');
Route::get('/obtenercategorialibro', 'App\Http\Controllers\EstudianteController@obtenerCategoriaLibro');
Route::post('/crearlibro', 'App\Http\Controllers\EstudianteController@crearLibro');
Route::get('/actulizarlibro/{id}', 'App\Http\Controllers\EstudianteController@actulizarLibro');
Route::post('/actualizarguardarlibro', 'App\Http\Controllers\EstudianteController@actualizarGuardarLibro');

Route::post('/desactivarlibro', 'App\Http\Controllers\EstudianteController@desactivarLibro');
Route::post('/adduser', 'App\Http\Controllers\EstudianteController@aniadirUsuario');
Route::get('/getusers', 'App\Http\Controllers\EstudianteController@obtenerUsuarios');
Route::get('/getroles', 'App\Http\Controllers\EstudianteController@obtenerRoles');












