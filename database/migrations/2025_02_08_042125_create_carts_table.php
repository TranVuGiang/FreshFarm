<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id('id_cart');
            $table->unsignedBigInteger('id_user');
            $table->decimal('total_price', 10, 2)->default(0);
            $table->tinyInteger('status')->default(1); // 1: active, 2: completed, 3: abandoned
            $table->timestamps();

            $table->foreign('id_user')
                  ->references('id_user')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('carts');
    }
};
