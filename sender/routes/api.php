<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['cors']], function () {
    Route::get('get-messages', [ChatController::class, 'getMessages']);
    Route::post('store-messages', [ChatController::class, 'storeMessages']);
});
