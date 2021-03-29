<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (Auth::check()) {
            // The user is logged in...
        }
        $user = Auth::user();
        return view('home', ['username'=>$user->name]);
    }

    public function show($id)
    {
        if (Auth::check()) {
            // The user is logged in...
        }
        $user = Auth::user();
        return view('pages.project_managers.show', ['username'=>$user->name]);
    }
}
