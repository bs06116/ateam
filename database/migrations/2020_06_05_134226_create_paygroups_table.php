<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePaygroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if ( !Schema::hasTable('paygroups') ) {
            Schema::create('paygroups', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('class');
                $table->unsignedInteger('class_level');
                $table->float('class_percent', 4, 2);
                $table->string('work_class')->nullable();
                $table->boolean('override')->nullable();
                $table->float('rate1', 6, 4)->nullable();
                $table->float('rate2', 6, 4)->nullable();
                $table->float('rate3', 6, 4)->nullable();
                $table->timestamps();
            });

            // DB::statement("
            //     CREATE TABLE `paygroups` (
            //       `id` INT UNSIGNED NOT NULL,
            //       `name` varchar(100) NOT NULL,
            //       `class` varchar(100) DEFAULT NULL,
            //       `class_level` int DEFAULT NULL,
            //       `class_percent` int DEFAULT NULL,
            //       `work_class` varchar(45) DEFAULT NULL,
            //       `override` tinyint DEFAULT NULL,
            //       `rate1` float DEFAULT NULL,
            //       `rate2` float DEFAULT NULL,
            //       `rate3` float DEFAULT NULL,
            //       PRIMARY KEY (`id`)
            //     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            // ");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paygroups');
    }
}
