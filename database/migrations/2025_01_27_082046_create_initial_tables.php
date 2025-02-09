<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Users table
        Schema::create('users', function (Blueprint $table) {
            $table->id('id_user');
            $table->string('name', 255)->nullable();
            $table->string('firstname', 255)->nullable();
            $table->string('email', 255)->unique();
            $table->string('phone', 255)->nullable();
            $table->string('address', 255)->nullable();
            $table->integer('role')->nullable();
            $table->timestamp('login_attempts')->nullable();
            $table->timestamp('last_login_attempt')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 255);
            $table->string('remember_token', 100)->nullable();
            $table->integer('status')->nullable();
            $table->timestamps();
        });

        // Categories table
        Schema::create('categories', function (Blueprint $table) {
            $table->id('id_categories');
            $table->string('name', 255);
            $table->timestamps();
        });

        // Products table
        Schema::create('products', function (Blueprint $table) {
            $table->id('id_product');
            $table->unsignedBigInteger('id_categories');
            $table->foreign('id_categories')->references('id_categories')->on('categories');
            $table->string('name', 255);
            $table->float('price');
            $table->string('image', 255);
            $table->integer('stock_quantity');
            $table->string('description',500);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        // Product translations table
        Schema::create('product_translations', function (Blueprint $table) {
            $table->id('id_product_trans');
            $table->unsignedBigInteger('id_product');
            $table->foreign('id_product')->references('id_product')->on('products');
            $table->string('locale', 255);
            $table->string('description');
            $table->timestamps();
        });

        // Bills table
        Schema::create('bills', function (Blueprint $table) {
            $table->id('id_bill');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->string('email', 255);
            $table->datetime('delivery_date');
            $table->integer('total');
            $table->integer('payment_status');
            $table->integer('payment_method');
            $table->integer('status');
            $table->timestamps();
        });

        // Vouchers table
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id('id_voucher');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->float('value');
            $table->float('type');
            $table->timestamps();
        });

        // Bill products table (pivot table for bills and products)
        Schema::create('bill_products', function (Blueprint $table) {
            $table->unsignedBigInteger('id_bill');
            $table->unsignedBigInteger('id_product');
            $table->foreign('id_bill')->references('id_bill')->on('bills');
            $table->foreign('id_product')->references('id_product')->on('products');
            $table->integer('quantity');
            $table->float('price');
            $table->float('rating')->nullable();
            $table->string('comment', 255)->nullable();
            $table->primary(['id_bill', 'id_product']);
            $table->timestamps();
        });

        // Bill vouchers table (pivot table for bills and vouchers)
        Schema::create('bill_vouchers', function (Blueprint $table) {
            $table->unsignedBigInteger('id_bill');
            $table->unsignedBigInteger('id_voucher');
            $table->foreign('id_bill')->references('id_bill')->on('bills');
            $table->foreign('id_voucher')->references('id_voucher')->on('vouchers');
            $table->primary(['id_bill', 'id_voucher']);
            $table->timestamps();
        });

        // Chats table
        Schema::create('chats', function (Blueprint $table) {
            $table->id('id_chat');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->string('email', 255);
            $table->string('message', 255);
            $table->integer('sender_id');
            $table->integer('receive_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bill_vouchers');
        Schema::dropIfExists('bill_products');
        Schema::dropIfExists('vouchers');
        Schema::dropIfExists('bills');
        Schema::dropIfExists('chats');
        Schema::dropIfExists('product_translations');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
    }
};
