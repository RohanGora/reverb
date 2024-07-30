<?php

namespace App\Http\Controllers;

use App\Events\SendMessage;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getMessages(Request $request)
    {
        return Chat::get()->toArray();
    }

    public function storeMessages(Request $request)
    {
        $message = Chat::create(['message' => $request->message]);
        broadcast(new SendMessage($message))->toOthers();
        return 'message sent';
    }
}
