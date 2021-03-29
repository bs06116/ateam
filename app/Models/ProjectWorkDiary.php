<?php

namespace App\Models;
use App\User;
use App\Models\CostCode;
use App\Models\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectWorkDiary extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_work_diary';

    protected $fillable = [
        'project_id',
        'dat',
        'cost_code',
        'work_completed',
        'amount_installed',
        'unit',
        'productivity',
        'comment',
    ];
  
    public function costCode()
    {
        return $this->belongsTo(CostCode::class, 'cost_code');
    }

    public function workDiaryUsers()
    {
        return $this->belongsToMany(User::class)->withPivot('hours', 'submitted');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

}
