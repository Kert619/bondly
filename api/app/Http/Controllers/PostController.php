<?php

namespace App\Http\Controllers;

use App\Events\PostLiked;

class PostController extends Controller
{
    public function sendPostNotification()
    {
        $postId = 1;
        $postUserId = 5;

        broadcast(new PostLiked($postId, $postUserId, auth()->id));
    }
}
