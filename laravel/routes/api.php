<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Public Routes (Tidak butuh token)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Wajib menyertakan Bearer Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Endpoint ini sangat berguna nanti di Next.js untuk mengecek sesi user
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // CRUD Posts (Otomatis mendaftarkan index, show, store, update, destroy)[cite: 1]
    Route::apiResource('posts', PostController::class);
});