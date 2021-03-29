<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Project;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'type', 'phone', 'desig',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    public static function getList($q) {
        $users = User::where([
            ['type', '=', $q['type']],
            // ['subscribed', '<>', '1'],
        ])->get();

        return $users;
    }

    public function empProjects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function pmProjects()
    {
        return $this->hasMany(Project::class, 'pm_id');
    }

    public function foremanProjects()
    {
        return $this->hasMany(Project::class, 'foreman_id');
    }

}
