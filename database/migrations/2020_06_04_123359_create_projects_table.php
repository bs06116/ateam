<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('projects')) {
            Schema::create('projects', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->longText('desc')->nullable();
                $table->unsignedInteger('pm_id')->nullable();
                $table->foreign('pm_id', 'pm_fk_1367679')->references('id')->on('users');
                $table->unsignedInteger('foreman_id');
                $table->foreign('foreman_id', 'fm_fk_1367681')->references('id')->on('users');
                $table->string('status');
                $table->datetime('start_date');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
