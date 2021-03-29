<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePaygroupProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if ( !Schema::hasTable('paygroup_project') ) {

            Schema::create('paygroup_project', function (Blueprint $table) {
                $table->unsignedInteger('project_id');
                $table->foreign('project_id', 'project_id_fk_1357514')->references('id')->on('projects')->onDelete('cascade');
                $table->unsignedInteger('paygroup_id');
                $table->foreign('paygroup_id', 'paygroup_id_fk_1357554')->references('id')->on('paygroups')->onDelete('cascade');
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
        Schema::dropIfExists('paygroup_project');
    }
}
