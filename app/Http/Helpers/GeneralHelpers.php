<?php

namespace App\Http\Helpers;


use Illuminate\Support\Facades\Cache;

class GeneralHelpers
{
    public static function removeProductCache(): void
    {
        // remove any cache where any cache key starts with 'products_'
        Cache::flush('products_*');
    }
}
