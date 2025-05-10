<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShopSettingsController extends Controller
{
    /**
     * Get the shop settings like shipping and tax rates
     *
     * @return JsonResponse
     */
    public function getSettings(): JsonResponse
    {
        $settings = [
            'shipping' => [
                'flat_rate' => (float) config('shop.shipping.flat_rate'),
            ],
            'tax' => [
                'rate' => (float) config('shop.tax.rate'),
            ],
        ];

        return response()->json($settings);
    }
}
