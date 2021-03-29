<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;


   class ConfigController extends Controller
{
    public function clearRoute()
    {
        \Artisan::call('config:cache');
		
		
		//\Artisan::call('route:cache');
		
		
		//\Artisan::call('cache:clear');
		
		
		//\Artisan::call('view:clear');
    }
}







?>