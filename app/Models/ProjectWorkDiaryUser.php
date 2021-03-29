<?php

namespace App\Models;
use App\User;
use App\Models\CostCode;

use Illuminate\Database\Eloquent\Model;

class ProjectWorkDiaryUser extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_work_diary_user';

    protected $fillable = [
        'project_work_diary_id',
        'user_id',
        'hours',
        'submitted',
    ];

    public $timestamps = false;
  
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
