<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Models\Paygroup;

use Response;

use Illuminate\Support\Facades\Auth;

class PaygroupsController extends Controller
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
            $paygroups = Paygroup::get();
            return Response::json($paygroups);
        }


        $data = ['menu'=>'paygroups'];

        $username  = $user->name;
        return view('pages.paygroups.index', compact("username"));
    }

    public function show($id)
    {
        if(request()->ajax()){
            $paygroup = Paygroup::find($id);
            return Response::json($paygroup);
        }
        $user = Auth::user();
        $username=$user->name;

        $paygroup = User::join('users as U1', 'projects.pm_id', '=', 'U1.id')->join('users as U2', 'projects.paygroup_id', '=', 'U2.id')
        ->where('projects.id',$id)->first(['projects.*','U1.name as Manager','U2.name as Foreman']);
        $paygroup->load('paygroups');
        $paygroups = User::where("type",3)->get();
        $employees = User::where("type",4)->get();
        $paygroups = Paygroup::all();

        return view('pages.jobs.show',compact('username','project','projectManagers','paygroups','employees','paygroups'));
    }

    public function store(Request $request)
    {
        $paygroup = Paygroup::create([
            'name' => $request->name,
            'class' => $request->class,
            'class_level' => $request->class_level,
            'class_percent' => $request->class_percent,
            'work_class' => $request->work_class,
            'override' => $request->override,
            'rate1' => $request->rate1,
            'rate2' => $request->rate2,
            'rate3' => $request->rate3
        ]);
        
        return Response::json($paygroup);

    }

    public function update($id, Request $request)
    {
        $paygroup = Paygroup::find($id);
        $data = [
            'name' => $request->name,
            'class' => $request->class,
            'class_level' => $request->class_level,
            'class_percent' => $request->class_percent,
            'work_class' => $request->work_class,
            'override' => $request->override,
            'rate1' => $request->rate1,
            'rate2' => $request->rate2,
            'rate3' => $request->rate3
        ];
        $paygroup->update($data);
        return Response::json($paygroup);
    }


    public function destroy($id)
    {
        $paygroup = Paygroup::find($id);
        $paygroup->delete();

        return back();

    }

}
