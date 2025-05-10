<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Shop Settings
    |--------------------------------------------------------------------------
    |
    | This file contains the shop settings including shipping and tax values.
    |
    */

    'shipping' => [
        'flat_rate' => env('SHOP_SHIPPING_FLAT_RATE', 5.00),
    ],

    'tax' => [
        'rate' => env('SHOP_TAX_RATE', 0.10), // 10% tax rate
    ],
];
