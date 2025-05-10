<?php
namespace App\Listeners;

use App\Events\OrderPlaced;
use App\Jobs\SendOrderNotificationJob;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendOrderNotification implements ShouldQueue
{
    public function handle(OrderPlaced $event): void
    {
        // Just dispatch the job
        SendOrderNotificationJob::dispatch($event->order);
    }
}
