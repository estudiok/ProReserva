<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['tokentiddleware'])->group(function () {
    Route::get('/', function () {
        $passpro = bcrypt('jculbi');
        var_dump($passpro);
    
        // if (password_verify('padad', $passpro)) {
        //     var_dump('entro rata');
        // }
    
        return '';
        // return view('welcome');
    });

});

