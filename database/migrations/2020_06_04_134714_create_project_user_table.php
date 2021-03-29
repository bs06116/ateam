<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateProjectUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if ( !Schema::hasTable('project_user') ) {
            Schema::create('project_user', function (Blueprint $table) {
                $table->unsignedInteger('project_id');
                $table->foreign('project_id', 'project_id_fk_1357524')->references('id')->on('projects')->onDelete('cascade');
                $table->unsignedInteger('user_id');
                $table->foreign('user_id', 'user_id_fk_1357524')->references('id')->on('users')->onDelete('cascade');

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
        Schema::dropIfExists('project_user');
    }
}
