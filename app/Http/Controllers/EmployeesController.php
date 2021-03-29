<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

use Response;

use Illuminate\Support\Facades\Auth;

class EmployeesController extends Controller
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
            $employees = User::where(['type'=>4])
                    ->get();
            return Response::json($employees);
        }


        $data = ['menu'=>'employees'];

        $username  = $user->name;
        return view('pages.employees.index', compact("username"));
    }

    public function show($id)
    {
        if(request()->ajax()){
            $employee = User::find($id);
            return Response::json($employee);
        }
        $user = Auth::user();
        $username=$user->name;

        $employee = User::join('users as U1', 'projects.pm_id', '=', 'U1.id')->join('users as U2', 'projects.employee_id', '=', 'U2.id')
        ->where('projects.id',$id)->first(['projects.*','U1.name as Manager','U2.name as Foreman']);
        $employee->load('paygroups');
        $employeeManagers = User::where("type",1)->get();
        $employees = User::where("type",3)->get();
        $employees = User::where("type",4)->get();
        $paygroups = Paygroup::all();

        return view('pages.jobs.show',compact('username','project','projectManagers','employees','employees','paygroups'));
    }

    public function store(Request $request)
    {
        $employee = User::create([
            "type"=>4,
            "name"=>$request->name,
            "email"=>$request->email,
            "phone"=>$request->phone,
            "desig"=>$request->desig,
            "password"=>Hash::make($request->password)
        ]);
        
        return Response::json($employee);

    }

    public function update($id, Request $request)
    {
        $employee = User::find($id);
        $data = [
                "name"=>$request->name,
                "email"=>$request->email,
                "phone"=>$request->phone,
                "desig"=>$request->desig,
                "password"=>Hash::make($request->password)
        ];
        $employee->update($data);
        return Response::json($employee);
    }


    public function destroy($id)
    {
        $employee = User::find($id);
        $employee->delete();

        return back();

    }

}
