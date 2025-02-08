<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cart_details', function (Blueprint $table) {
            $table->id('id_cart_detail');
            $table->unsignedBigInteger('id_cart');
            $table->unsignedBigInteger('id_product');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();

            $table->foreign('id_cart')
                  ->references('id_cart')
                  ->on('carts')
                  ->onDelete('cascade');

            $table->foreign('id_product')
                  ->references('id_product')
                  ->on('products')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('cart_details');
    }
};
