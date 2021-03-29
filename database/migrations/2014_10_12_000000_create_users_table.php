<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if ( !Schema::hasTable('users') ) {
            DB::statement("
                CREATE TABLE `users` (
                  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                  `user_id` varchar(45) DEFAULT NULL,
                  `type` smallint DEFAULT NULL,
                  `name` varchar(30) DEFAULT NULL,
                  `email` varchar(30) DEFAULT NULL,
                  `phone` varchar(20) DEFAULT NULL,
                  `desig` varchar(25) DEFAULT NULL,
                  `password` varchar(255) DEFAULT NULL,
                  `email_verified_at` datetime DEFAULT NULL,
                  `remember_token` varchar(200) DEFAULT NULL,
                  `created_at` datetime DEFAULT NULL,
                  `updated_at` datetime DEFAULT NULL,
                  PRIMARY KEY (`id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            ");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
