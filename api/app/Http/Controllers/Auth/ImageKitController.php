<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use ImageKit\ImageKit;

class ImageKitController extends Controller
{
    public function auth()
    {
        $imageKit = new ImageKit(
            config('imagekit.ik_public_key'),
            config('imagekit.ik_private_key'),
            config('imagekit.ik_endpoint')
        );

        return json_encode($imageKit->getAuthenticationParameters());
    }
}
