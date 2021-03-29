<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectDaily;
use App\Models\CostCode;
use App\Models\ProjectWorkDiary;
use App\User;
use App\Models\Paygroup;

use Response;

use Illuminate\Support\Facades\Auth;

class JobsController extends Controller
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
        $pageTitle = "Jobs Dashboard";
        $user = Auth::user();
 

        if (isset($request->dat)) {
            $dat = date('Y-m-d', strtotime($request->dat));
        } else {
            $dat = date('Y-m-d');
        }

        if($request->ajax){
            $userField = 'projects.pm_id';
            if ($user->type == 3) {
                $userField = 'projects.foreman_id';
            }
            $projects = Project::join('users as U1', 'projects.pm_id', '=', 'U1.id')->join('users as U2', 'projects.foreman_id', '=', 'U2.id')->where([$userField=>$user->id])
                    ->get(['projects.id as id','projects.name as Name','projects.desc as Description','projects.start_date as start_date','U1.name as Manager','U2.name as Foreman']);



            foreach ($projects as $oneP) {
                $oneP->start_date = date('n/j/Y', strtotime($oneP->start_date));
                $oneP->comment = '';
                $daily = ProjectDaily::where(['project_id'=>$oneP->id])->whereDate('dat', '=', $dat)->first();
                if ($daily) {
                    $oneP->comment = $daily->comment;
                }

                if ($oneP->comment == 'null' || $oneP->comment == null) $oneP->comment = '';
            }

            return Response::json($projects);
        }

        $data = ['menu'=>'jobs'];
        $projectManagers = User::where("type",1)->get();
        $foremans = User::where("type",3)->get();
        $employees = User::where("type",4)->get();
        $paygroups = Paygroup::all();

        $username  = $user->name;

        $dat = date('m/d/Y', strtotime($dat));
        return view('pages.jobs.index', compact("dat", "pageTitle", "username","projectManagers","foremans","employees","paygroups"));
    }

    public function getEmps(Request $request) {
        $id = $request->id;

        $project = Project::find($id);
        $emps = $project->users;
        foreach ($emps as $one) {
            $pg = Paygroup::find($one->pivot->paygroup_id);
            if ($pg) {
                $one->pivot->paygroup = $pg->name;
                $one->pivot->apprentice = $pg->class;
            }
        }
        return Response::json($emps);
    }

    public function removeEmp(Request $req) {
        $pid = $req->id;
        $uid = $req->uid;
        $project = Project::find($pid);
        $project->users()->detach($uid);
        echo 'ok';
    }

    public function getEmp(Request $req) {
        $pid = $req->id;
        $uid = $req->uid;
        $project = Project::find($pid);
        $user = $project->users()->find($uid);
        $return = array();
        $return['name'] = $user->name;
        $return['costCode'] = $user->pivot->cost_code;
        $return['pgId'] = $user->pivot->paygroup_id;
        return Response::json($return);
    }

    public function addEmp(Request $req) {
        $pid = $req->id;
        $uid = $req->uid;
        $project = Project::find($pid);
        if ($project->users()->find($uid)) {
            echo 'exist'; die;
        }
        $project->users()->attach($uid, ['paygroup_id'=>$req->pgid, 'cost_code'=>$req->cost_code]);
        echo 'ok';
    }

    public function updateEmp(Request $req) {
        $pid = $req->id;
        $uid = $req->uid;
        $project = Project::find($pid);
        $project->users()->updateExistingPivot($uid, ['paygroup_id'=>$req->pgid, 'cost_code'=>$req->cost_code], false);
        echo 'ok';
    }

    public function getEmpDefaultPG(Request $req) {
        $user = User::find($req->id);
        $desig = $user->desig;
        $pg = Paygroup::where(['name'=>$desig])->first();
        return Response::json($pg);
    }

    public function saveComment(Request $req) {
   
        $id = $req->id;
        $comment = $req->comment;
        $dat = date('Y-m-d', strtotime($req->dat));
        $user = Auth::user();

        $exist = ProjectDaily::where(['project_id'=>$id, 'dat'=>$dat])->first();
        if ($exist) {
            $data = [
                "comment"=>$comment,
                "user_id"=>$user->id,
            ];
            $exist->update($data);
        } else {
            $model = ProjectDaily::create([
                "project_id"=>$id,
                "comment"=>$comment,
                "dat"=>$dat,
                "user_id"=>$user->id,
            ]);
        }

        echo 'ok';
    }


    public function show($id)
    {
        $user = Auth::user();
        $username=$user->name;
        


        $project = Project::find($id);

        $projectManagers = User::where("type",1)->get();
        $foremans = User::where("type",3)->get();
        $employees = User::where("type",4)->get();
        $costCodes = CostCode::all();
        $paygroups = Paygroup::all();
        $empToChoose = User::where("type",4)->get();

        $jobTitle = $project->name;
        $pCostCodes = $project->costCodes;
        $pCostCodes = $pCostCodes->toArray();
        $pPaygroups = $project->paygroups->toArray();
        $pageTitle = "<a style='color:white' href='/jobs'><i style='color: chocolate;font-size: 35px;' class='fa fa-folder-open'></i></a> &nbsp; JOB: $jobTitle";
        return view('pages.jobs.show',compact('pageTitle', 'username','project','projectManagers','foremans','employees','paygroups','empToChoose','costCodes','pCostCodes','pPaygroups'));
    }

    public function workDiarySave(Request $req) {
        $field = $req['field'];
        $costCode = $req['costCode'];
        $costCodeSage = $costCode.'.000';
        $val = $req['val'];
        $pid = $req['pid'];
        if (isset($req->dat)) {
            $dat = date('Y-m-d', strtotime($req->dat));
           
        } else {
            $dat = date('Y-m-d');
        }

        $wd = ProjectWorkDiary::where(['project_id'=>$pid, 'cost_code'=>$costCode])->whereDate('dat','=',$dat)->first();

        if (!$wd) {
            $wd = new ProjectWorkDiary();
            $wd['project_id'] = $pid;
            $wd['cost_code'] = $costCode;
            $wd['dat'] = $dat;
            if (intval($field)==0) {
                $wd[$field] = $val;
            }

            $wd->save();

        }

        if (intval($field)>0) {
            if (intval($val)>0) {
                $uid = intval($field);
                
                $profile = User::where('id', $uid)->first();
                $USERID = $profile->user_id;

                $wdu = $wd->workDiaryUsers()->find(['user_id'=>$uid])->first();
                if (!$wdu) {
                    $wdu = $wd->workDiaryUsers()->attach($uid, ['hours'=>$val]);

                } else {
                    $wd->workDiaryUsers()->updateExistingPivot($uid, array('hours' => $val), false);
                }
            }
        } else {
            $wd[$field] = $val;
            $wd->save();
        }


    }


    // This is beta version and will be adjusted when more detailed API documentation is provided
    

    
    
    public function sendWDToSage(Request $req) {

        $pid = $req['pid'];
        $project = Project::find($pid);
        $wds = ProjectWorkDiary::where(['project_id'=>$pid])->get();
        $query = "";
        $dates = array();
        foreach($wds as $wd) {
            $costCodeSage = $wd->cost_code.'.000';
            $wdus = $wd->workDiaryUsers()->wherePivot('submitted', '=', null)->get();

            $jobnum = '20200'.$pid;
            $jobdesc = 'Work for project '.$pid;
            $dat = date('Y-m-d', strtotime($wd->dat));

            $datShow = date('n/j', strtotime($wd->dat));
            if(count($wdus)>0 && !in_array($datShow, $dates, true)){
                array_push($dates, $datShow);
            }

            foreach ($wdus as $wdu) {
                $uid = $wdu['id'];
                $profile = User::where('id', $uid)->first();
                $USERID = $profile->user_id;

                $puser = $project->users()->where('id','=',$uid)->first();
                $paygroup_id = isset($puser)?$puser->pivot->paygroup_id:null;

                $class = ''; $rate1 = 0;
                $paygroup = Paygroup::find($paygroup_id);
                if ($paygroup) {
                    $class = $paygroup->class;
                    $rate1 = intval($paygroup->rate1);
                }

                $hours = $wdu->pivot->hours;

     
                
//removed pay group api error                
//\"paygrp\":\"$class\",\r\n\t
                if (intval($hours)>0) {
                    $query .= "{\"paydte\":\"$dat\",\r\n\t
                                \"empnum\":\"$USERID\",\r\n\t
                                \"dscrpt\":\"$jobdesc\",\r\n\t
                                \"wrkord\":\"\",\r\n\t
                                \"jobnum\":\"$jobnum\",\r\n\t
                                \"loctax\":\"\",\r\n\t
                                \"crtfid\":\"N\",\r\n\t
                                \"phsnum\":\"\",\r\n\t
                                \"cstcde\":\"$costCodeSage\",\r\n\t
                                \"paytyp\":\"1\",\r\n\t
                                \"paygrp\":\"\",\r\n\t
                                \"payrte\":\"$rate1\",\r\n\t
                                \"payhrs\":\"$hours\",\r\n\t
                                \"pcerte\":\"\",\r\n\t
                                \"pieces\":\"\",\r\n\t
                                \"cmpcde\":\"8810\",\r\n\t
                                \"dptmnt\":\"\",\r\n\t
                                \"eqpnum\":\"\",\r\n\t
                                \"opreqp\":\"\",\r\n\t
                                \"eqpunt\":\"\",\r\n\t
                                \"oprhrs\":\"\",\r\n\t
                                \"stdhrs\":\"\",\r\n\t
                                \"idlhrs\":\"\",\r\n\t
                                \"bllunt\":\"\",\r\n\t
                                \"oprbll\":\"\",\r\n\t
                                \"stdbll\":\"\",\r\n\t
                                \"idlbll\":\"\",\r\n\t
                                \"usrdf1\":\"\",\r\n\t
                                \"absnce\":\"\",\r\n\t
                                \"ntetxt\":\"\"\r\n\t},";
                }
                    
            }
        }


        $ret = array();
        if (strlen($query) > 0) {
            $sageApiService = app('SageApiService');
            $query = substr($query, 0, strlen($query)-1);

            $reqData = [
                "uri" => "PR_DAILY_PAYROLL_CREATE?company=Default",
                "query" => $query
            ];

            $response = $sageApiService->call($reqData);
            
   
   
            
            
            

            if (strpos($response, 'SUCCESS') != false) {
                foreach($wds as $wd) {
                    $wdus = $wd->workDiaryUsers()->wherePivot('submitted', '=', null)->get();
                    foreach ($wdus as $wdu) {
                        $uid = $wdu['id'];
                        $wd->workDiaryUsers()->updateExistingPivot($uid, array('submitted' => 1), false);
                    }
                }
            }

           $ret['result'] = $response;
            $ret['data'] = $dates;
            


            return Response::json($ret);
        }

        $ret['result'] = 'no_data_to_submit';
        return Response::json($ret);
        

    }


    public function workDiaryData(Request $request)
    {
        $pid = $request['pid'];
        if (isset($request->dat)) {
            $dat = date('Y-m-d', strtotime($request->dat));
           
        } else {
            $dat = date('Y-m-d');
        }
        $p = Project::find($pid);
        $wds = ProjectWorkDiary::whereDate('dat','=',$dat)->where(['project_id'=>$pid])->get();
        $ret = array();

        foreach($wds as $wd) {
            $hours = 0;
            $ccode = $wd->costCode;
            $row = array();
            $row['cost_code'] = $ccode->id;
            $row['work_completed'] = $ccode->name;
            foreach($p->users as $e) {
                $wdu = $wd->workDiaryUsers()->find($e->id);
                $row[$e->id] = '';
                if ($wdu) {
                    $row[$e->id] = $wdu->pivot->hours;
                    $hours += $wdu->pivot->hours;
                }
            }
            $row['amount_installed'] = $wd->amount_installed;
            $row['hours'] = $hours;
            $row['productivity'] = $wd->productivity;
            $row['unit'] = $wd->unit;
            $row['comment'] = $wd->comment;
            array_push($ret, $row);

        }

        $costCodes = $p->costCodes;
        foreach ($costCodes as $c) {
            $exist = false;
            foreach ($ret as $r) {
                if ($r['cost_code'] == $c->id) {
                    $exist = true; break;
                }
            }
            if ($exist == false) {
                $row = array();
                $row['cost_code'] = $c->id;
                $row['work_completed'] = $c->name;
                foreach($p->users as $e) {
                    $row[$e->id] = '';
                }
                $row['amount_installed'] = '';
                $row['hours'] = '';
                $row['productivity'] = '';
                $row['unit'] = '';
                $row['comment'] = '';
                array_push($ret, $row);
               
            }
        }

        $r = array();
        $r['data'] = $ret;

        $ret1 = array();
        foreach($p->users as $e) {
            $ret1[$e->id] = $e->name;
        }
        $r['cols'] = $ret1;
        return Response::json($r);
    }

    public function workDiary(Request $request)
    {
        $pid = $request->pid;
        $dat = $request->dat;
        if (isset($request->dat)) {
            $dat = date('m/d/Y', strtotime($request->dat));
        } else {
            $dat = date('m/d/Y');
        }

        $project = Project::find($pid);
        $user = Auth::user();

        $data = ['menu'=>'jobs'];
        $projectManagers = User::where("type",1)->get();
        $foremans = User::where("type",3)->get();
        $employees = User::where("type",4)->get();
        $paygroups = Paygroup::all();

        $username  = $user->name;
        $userType = $user->type;
        $jobTitle = $project->name;
        $pageTitle = "<a style='color:white' href='/jobs'><i style='color: chocolate;font-size: 35px;' class='fa fa-folder-open'></i></a> &nbsp; JOB: $jobTitle";

        return view('pages.jobs.workDiary', compact("pageTitle", "username","projectManagers","foremans","employees","paygroups", "dat", "project", "userType"));
    }

    public function workDiaryCols(Request $request)
    {
    }

    public function store(Request $request)
    {
        $project = Project::create([
            "name"=>$request->_ip_add_project_name,
            "desc"=>$request->_ip_add_des,
            "pm_id"=>$request->_ip_add_pm,
            "foreman_id"=>$request->_ip_add_pf,
            "start_date"=>$request->_ip_add_start_date.' 00:00:00',
            "status"=>1
        ]);
        $project->users()->sync($request->input('_ip_add_employee', []));
        $project->paygroups()->sync($request->input('_ip_add_paygroups', []));
        
        $project = Project::join('users as U1', 'projects.pm_id', '=', 'U1.id')->join('users as U2', 'projects.foreman_id', '=', 'U2.id')
        ->where('projects.id',$project->id)->get(['projects.id as id','projects.name as Name','projects.desc as Description','U1.name as Manager','U2.name as Foreman'])->first();
        
        return Response::json($project);
    }

    public function update($id, Request $request)
    {
        $project = Project::find($id);
        $data = [
                "desc"=>$request->_ip_job_des,
                "status"=>1
        ];
        $project->update($data);
        $project->paygroups()->sync($request->input('_ip_job_paygroups', []));
        $project->costCodes()->sync($request->input('_ip_job_cost_codes', []));
         return redirect()->action( 'JobsController@show', $id);

    }


    public function destroy($id)
    {
        $project = Project::find($id);
        $project->delete();

        return back();

    }


}
