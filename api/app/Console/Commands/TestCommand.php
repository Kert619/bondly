<?php

namespace App\Console\Commands;

use App\Events\PostCommented;
use App\Events\PostLiked;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:notify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $postId = 8;
        $postUserId = 1;
        $currentUserId = 15;

        broadcast(new PostLiked($postId, $postUserId, $currentUserId));
        broadcast(new PostCommented($postId, $postUserId, $currentUserId));
    }
}
