<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AdminController;

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

Route::post('createtag', [AdminController::class, 'addTag']);
Route::post('edittag', [AdminController::class, 'editTag']);
Route::post('delete_tag', [AdminController::class, 'deletTag']);
Route::get('gettag', [AdminController::class, 'getTag']);