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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::post('/login',[\App\Http\Controllers\UserController::class,'login']);
    Route::group(['middleware'=>'auth:sanctum'],function (){
    Route::post('/logout',[\App\Http\Controllers\UserController::class,'logout']);
    Route::post('/register',[\App\Http\Controllers\UserController::class,'register']);
    Route::post('/modificar',[\App\Http\Controllers\UserController::class,'modificar']);
    Route::post('/modpass',[\App\Http\Controllers\UserController::class,'modpass']);
    Route::post('/eliminar/{id}',[\App\Http\Controllers\UserController::class,'eliminar']);
    Route::post('/listuser',[\App\Http\Controllers\UserController::class,'listuser']);
    Route::post('/lusuario',[\App\Http\Controllers\UserController::class,'lusuario']);
    Route::post('/libro',[\App\Http\Controllers\SaleController ::class,'libro']);
    Route::post('/libro2',[\App\Http\Controllers\SaleController ::class,'libro2']);
    Route::post('/me',[\App\Http\Controllers\UserController::class,'me']);
    Route::apiResource('/product',\App\Http\Controllers\ProductController::class);
    Route::apiResource('/sale',\App\Http\Controllers\SaleController::class);
    Route::apiResource('/logproducto',\App\Http\Controllers\LogproductoController::class);
    Route::post('/verdatos',[\App\Http\Controllers\LogproductoController::class,'verdatos']);
    Route::get('/factura/{id}',[\App\Http\Controllers\SaleController::class,'factura']);
    Route::get('/comanda/{id}',[\App\Http\Controllers\SaleController::class,'comanda']);
    Route::apiResource('/deliveri',\App\Http\Controllers\DeliveriController::class);
    Route::apiResource('/rubro',\App\Http\Controllers\RubroController::class);
    Route::apiResource('/dosage',\App\Http\Controllers\DosageController ::class);
    Route::apiResource('/client',\App\Http\Controllers\ClientController ::class);
    Route::post('/anular',[\App\Http\Controllers\SaleController ::class,'anular']);
    Route::post('/resumen',[\App\Http\Controllers\SaleController ::class,'resumen']);
    Route::post('/productadd',[\App\Http\Controllers\ProductController ::class,'productadd']);
    Route::post('/productsub',[\App\Http\Controllers\ProductController ::class,'productsub']);
    Route::post('/resproducto',[\App\Http\Controllers\SaleController ::class,'resproducto']);
    Route::post('/activarprod',[\App\Http\Controllers\ProductController ::class,'activarprod']);
    Route::post('/imprimirresumen',[\App\Http\Controllers\SaleController ::class,'imprimirresumen']);
    Route::post('/imprimirresumenrec',[\App\Http\Controllers\SaleController ::class,'imprimirresumenrec']);
    Route::post('/imprimirresumenfac',[\App\Http\Controllers\SaleController ::class,'imprimirresumenfac']);
    Route::post('/imprimirresumen',[\App\Http\Controllers\SaleController ::class,'imprimirresumen']);
    Route::post('/todoimprimirresumen',[\App\Http\Controllers\SaleController ::class,'todoimprimirresumen']);
    Route::post('/todoimprimirresumenrec',[\App\Http\Controllers\SaleController ::class,'todoimprimirresumenrec']);
    Route::post('/todoimprimirresumenfac',[\App\Http\Controllers\SaleController ::class,'todoimprimirresumenfac']);
    Route::post('/listclient/{ci}',[\App\Http\Controllers\ClientController ::class,'lista']);
    Route::post('/listabuscar/{fecha}',[\App\Http\Controllers\SaleController ::class,'buscar']);
    Route::post('/listabuscar2',[\App\Http\Controllers\SaleController ::class,'buscar2']);
    Route::post('/informe',[\App\Http\Controllers\SaleController ::class,'informe']);
    Route::apiResource('/permiso',\App\Http\Controllers\PermisoController ::class);
    Route::post('/upload',[\App\Http\Controllers\RubroController::class,'upload']);
});
