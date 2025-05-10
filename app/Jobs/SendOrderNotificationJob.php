<?php

namespace App\Jobs;

use App\Mail\OrderPlacedMail;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendOrderNotificationJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;

    public function __construct(public Order $order)
    {
    }

    public function handle(): void
    {
        Mail::to(config('mail.admin_address', 'admin@example.com'))
            ->send(new OrderPlacedMail($this->order));

        if ($this->order->user && $this->order->user->email) {
            Mail::to($this->order->user->email)
                ->send(new OrderPlacedMail($this->order));
        }
    }
}
