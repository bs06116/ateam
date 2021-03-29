<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Models\Project;
use Illuminate\Support\Facades\Hash;

use Response;

use Illuminate\Support\Facades\Auth;

class ProjectManagersController extends Controller
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
    public function index(Request $request)
    {
        $user = Auth::user();
        if($request->ajax){
            $projectManagers = User::where(['type'=>1])
                    ->get();
            return Response::json($projectManagers);
        }


        $data = ['menu'=>'projectManagers'];

        $username  = $user->name;
        return view('pages.projectManagers.index', compact("username"));
    }

    public function show($id)
    {
        if(request()->ajax()){
            $projectManager = User::find($id);
            return Response::json($projectManager);
        }

        $user = Auth::user();
        $username=$user->name;

        $pm = User::find($id);
        $currentP = Project::where(['pm_id'=>$id])->first();

        return view('pages.projectManagers.show',compact('username','pm','currentP'));
    }

    public function store(Request $request)
    {
        $projectManager = User::create([
            "type"=>1,
            "name"=>$request->name,
            "email"=>$request->email,
            "phone"=>$request->phone,
            "password"=>Hash::make($request->password)
        ]);
        
        return Response::json($projectManager);

    }

    public function update($id, Request $request)
    {
        $projectManager = User::find($id);
        $data = [
                "name"=>$request->name,
                "email"=>$request->email,
                "phone"=>$request->phone,
                "password"=>Hash::make($request->password)
        ];
        $projectManager->update($data);
        return Response::json($projectManager);
    }


    public function destroy($id)
    {
        $projectManager = User::find($id);
        $projectManager->delete();

        return back();

    }

}
