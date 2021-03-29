<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paygroup extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'paygroups';

    protected $fillable = [
        'name',
        'class',
        'class_level',
        'class_percent',
        'work_class',
        'override',
        'rate1',
        'rate2',
        'rate3'
    ];
}
