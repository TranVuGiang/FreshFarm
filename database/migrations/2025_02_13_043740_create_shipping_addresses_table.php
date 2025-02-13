<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {


        // Create shipping_addresses table
        Schema::create('shipping_addresses', function (Blueprint $table) {
            $table->id('id_shipping_address');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->string('address', 255);
            $table->string('phone', 255);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        // Update existing tables that need modification
        Schema::table('bills', function (Blueprint $table) {
            $table->unsignedBigInteger('id_shipping_address')->after('id_user');
            $table->foreign('id_shipping_address')->references('id_shipping_address')->on('shipping_addresses');
        });
    }

    public function down()
    {
        // Revert bills table changes
        Schema::table('bills', function (Blueprint $table) {
            $table->dropForeign(['id_shipping_address']);
            $table->dropColumn('id_shipping_address');
        });

        // Drop shipping_addresses table
        Schema::dropIfExists('shipping_addresses');
    }
};
