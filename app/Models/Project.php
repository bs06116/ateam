<?php

namespace App\Models;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'projects';

    protected $fillable = [
        'name',
        'desc',
        'pm_id',
        'foreman_id',
        'start_date',
        'status',
    ];

  
    public function paygroups()
    {
        return $this->belongsToMany(Paygroup::class);

    }

    public function costCodes()
    {
        return $this->belongsToMany(CostCode::class);
        // return $this->belongsToMany(User::class)->withPivot('hours', 'paygroup_id', 'cost_code')->as('extra');
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('hours', 'paygroup_id', 'cost_code');
        // return $this->belongsToMany(User::class)->withPivot('hours', 'paygroup_id', 'cost_code')->as('extra');
    }

    public function pm()
    {
        return $this->belongsTo(User::class, 'pm_id');
    }

    public function foreman()
    {
        return $this->belongsTo(User::class, 'foreman_id');
    }
}
