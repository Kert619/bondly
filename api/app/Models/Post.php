<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    protected $guarded = [];

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
