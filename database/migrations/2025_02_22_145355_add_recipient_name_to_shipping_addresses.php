<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('shipping_addresses', function (Blueprint $table) {
            $table->string('recipient_name', 255)->after('id_user'); // Thêm cột mới
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::table('shipping_addresses', function (Blueprint $table) {
        $table->dropColumn('recipient_name');
    });
}
};
