<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::view('', 'welcome');
Route::view('chats', 'chats');
Route::get('get-messages', [ChatController::class, 'getMessages']);
Route::post('store-messages', [ChatController::class, 'storeMessages']);
