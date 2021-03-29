<?php

namespace App\Models;
use App\User;

use Illuminate\Database\Eloquent\Model;

class ProjectDaily extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_daily';

    protected $fillable = [
        'project_id',
        'comment',
        'dat',
        'user_id',
    ];
  
}
