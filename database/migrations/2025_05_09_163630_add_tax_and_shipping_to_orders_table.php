<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('subtotal', 10, 2)->after('user_id')->default(0);
            $table->decimal('tax', 10, 2)->after('subtotal')->default(0);
            $table->decimal('shipping', 10, 2)->after('tax')->default(0);
            // The total column already exists
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['subtotal', 'tax', 'shipping']);
        });
    }
};
