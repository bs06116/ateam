<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CostCode extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cost_codes';

    protected $fillable = [
        'id',
        'name',
    ];
}
