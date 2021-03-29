@extends('layouts.default')
@section('title', '| Project')
@section('bodyClass', 'bodyJobShow')

@section('head')
    @parent
    <!-- Custom head here -->
@endsection


@section('main_content')
<div class="__jobs-page kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
    <!-- begin:: Content -->
    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

        <!--Begin::Dashboard 1-->
        
        <div class="row">
            <div class="col-lg-12">

                <!--begin::Portlet-->
                <div class="kt-portlet kt-portlet--last kt-portlet--head-lg kt-portlet--responsive-mobile" id="kt_page_portlet">
                    <div class="kt-portlet__head kt-portlet__head--lg">
                        <div class="kt-portlet__head-label">
                            <h3 class="kt-portlet__head-title">Start Date: <span class="kt-font-success">4/12/2020</small></h3>
                        </div>
                        <div class="kt-portlet__head-toolbar">
                            <!-- <a href="#" class="btn btn-clean kt-margin-r-10">
                                <i class="la la-arrow-left"></i>
                                <span class="kt-hidden-mobile">Back</span>
                            </a> -->
                            <div class="">
                                <a href="/jobs/workDiary?pid={{$project->id}}" class="btnBlue btn btn-brand btn-pill btn-tall btn-wide">
                                    <span>View Work Diary</span>
                                </a>
                                <button type="button" class="btn-edit-jobs btn btn-brand btn-pill btn-tall btn-wide">
                                    <span>Edit Project</span>
                                </button>
                                <button type="button" class="btn-save-jobs btn btn-brand btn-pill btn-wide btn-tall d-none" data-ktwizard-type="action-submit">
                                    <i class="la la-check"></i>
                                    <span>Save Project</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="kt-portlet__body">
                        <form class="kt-form" id="kt_form" method="POST">
                        @method('PUT')
                        @csrf
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="kt-section kt-section--first">
                                        <div class="kt-section__body">
                                            <!-- <h3 class="kt-section__title kt-section__title-lg">Project Name</h3> -->
                                            <div class="form-group row border-0">
                                                <label for="_ip_job_name" class="col-12 col-form-label kt-font-bold">Project Name</label>
                                                <div class="col-12">
                                                    <div class="row view-wrap">
                                                        <div class="col">
                                                            <h3 class="kt-font-dark _op_job_name">{{$project->name}}</h3>
                                                        </div>
                                                    </div>
                                                    <input id="_ip_job_name" class="form-control edit-field" name="_ip_job_name" type="text" value="{{$project->name}}" placeholder="Enter your project name...">
                                                </div>
                                            </div>
                                            <div class="form-group row border-0">
                                                <label for="_ip_job_des" class="col-12 col-form-label kt-font-bold">Description</label>
                                                <div class="col-12">
                                                    <div class="row view-wrap">
                                                        <div class="col">
                                                            <div class="_op_job_des kt-section__desc">
                                                                {{$project->desc}} 
                                                            </div>
                                                        </div>
                                                        <div class="col-1  text-center ">
                                                            <span class="icon-edit kt-font-lg kt-font-success"><i class="fa fa-edit"></i></span>
                                                        </div>
                                                    </div>
                                                    <textarea id="_ip_job_des" class="form-control edit-field" name="_ip_job_des" rows="4">{{$project->desc}}</textarea>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-12 view-wrap">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="project-mn-show kt-font-bold">Project Manager: <span class="kt-font-primary _op_job_pm">{{$project->pm->name}}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-12 view-wrap">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="project-mn-show kt-font-bold">Project Foreman: <span class="kt-font-primary _op_job_pf">{{$project->foreman->name}}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-12 view-wrap">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="project-mn-show kt-font-bold">Number of Employees assigned: <span class="kt-font-primary _op_job_num_employees">{{count($project->users)}}</span></div>
                                                        </div>
                                                        <div class="col-auto  text-center ">
                                                            <a href="#" data-toggle="modal" data-target="modalEmp" class="manageEmp kt-font-lg kt-font-success kt-font-bold text-uppercase">Manage Employees</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-12 view-wrap-multiple">
                                                    <div class="cost-codes-show kt-font-bold">
                                                        Assigned Cost codes:
                                                        <span class="_op_job_cost_codes">
                                                            @foreach($pCostCodes as $pc)
                                                                <span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">{{$pc['id']}}</span>
                                                            @endforeach
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-12 edit-field-multiple">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="row align-items-center">
                                                                <div class="col-auto">
                                                                    <label for="_ip_job_cost_codes" class="m-0 kt-font-bold">Assigned Cost codes</label>
                                                                </div>
                                                                <div class="col">
                                                                    <select class="form-control kt-select2" id="_ip_job_cost_codes" name="_ip_job_cost_codes[]" multiple="multiple">
                                                                        @foreach($costCodes as $c)
                                                                            <?php $claz = (array_search($c->id, array_column($pCostCodes, 'id'))!==false) ? 'selected':''; ?>
                                                                            <option {{ $claz }} value="{{$c->id}}">{{$c->id}} {{$c->name}}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-1 text-center ">
                                                            <span class="_icon-add-item kt-font-lg kt-font-success"><i class="fa fa-plus"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-12 view-wrap-multiple">
                                                    <div class="paygroups-show kt-font-bold">Assigned Paygroups: 
                                                        <span class="_op_job_paygroups">
                                                        @foreach($pPaygroups as $projectPaygroup)
                                                            <span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">{{$projectPaygroup['name']}}</span>
                                                        @endforeach
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-12 edit-field-multiple">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="row align-items-center">
                                                                <div class="col-auto">
                                                                    <label for="_ip_job_cost_codes" class="m-0 kt-font-bold">Assigned Paygroups</label>
                                                                </div>
                                                                <div class="col">
                                                                    <select class="form-control kt-select2" id="_ip_job_paygroups" name="_ip_job_paygroups[]" multiple="multiple">
                                                                    @foreach($paygroups as $paygroup)
                                                                            <?php $claz = (array_search($paygroup->id, array_column($pPaygroups, 'id'))!==false) ? 'selected':''; ?>
                                                                            <option {{ $claz }} value="{{$paygroup->id}}">{{$paygroup->name}}</option>
                                                                    @endforeach
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-1 text-center ">
                                                            <span class="_icon-add-item kt-font-lg kt-font-success"><i class="fa fa-plus"></i></span>
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>

                                            <h5 class="kt-font-dark">Deadline: <span class="kt-font-danger">5/12/2020</span></h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-2"></div>
                            </div>
                        </form>
                    </div>
                </div>

                <!--end::Portlet-->
            </div>
        </div>
        
        <!--End::Dashboard 1-->
    </div>

    <!-- end:: Content -->
</div>

<!-- Modal -->
<div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">ADD NEW EMPLOYEE</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <!--begin: Form Wizard Form-->
                <div class="modal-body">
                        <div class="form-group">
                            <label class="col-form-label">Employee Name</label>
                                <select class="form-control kt-select2" id="selEmp" name="param">
                                    <option value=""></option>
                                    @foreach($empToChoose as $one)
                                    <option value="{{$one->id}}">{{$one->name}}</option>
                                    @endforeach
                                </select>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Assign Cost Codes:</label>
                            <input type="text" class="form-control" id="costCodeAdd">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Assign Paygroup:</label>
                            <select class="form-control kt-select2" id="pgAdd">
                                <option value=""></option>
                                @foreach($paygroups as $one)
                                <option value="{{$one->id}}">{{$one->name}}</option>
                                @endforeach
                            </select>
                        </div>
                </div>
                <div class="modal-footer">
                    <button data-ktwizard-type="action-submit" class="btnAddEmp btn btn-primary">ADD NEW</button>
                </div>
        </div>
    </div>
</div>
<!-- Edit Employee Modal -->
<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">EDIT EMPLOYEE</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <!--begin: Form Wizard Form-->
                <div class="modal-body">
                        <div class="form-group">
                            <label class="col-form-label">Employee Name</label>
                            <input type="text" class="form-control" disabled="disabled" id="nameEdit">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Assign Cost Codes:</label>
                            <input type="text" class="form-control" id="costCodeEdit">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Assign Paygroup:</label>
                            <select class="form-control kt-select2" id="pgEdit">
                                @foreach($paygroups as $one)
                                <option value="{{$one->id}}">{{$one->name}}</option>
                                @endforeach
                            </select>
                        </div>
                </div>
                <div class="modal-footer">
                    <button data-ktwizard-type="action-submit" class="btnUpdateEmp btn btn-primary">UPDATE</button>
                </div>
        </div>
    </div>
</div>
                    
    <!-- Modal -->
    <div class="modal fade" id="modalEmp" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div style="max-width: 70%;" class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="btnAddNewEmp btnBlue btn btn-brand">ADD NEW</button>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                    <div class="kt-datatable" id="kt_apps_emp_list_datatable"></div>
            </div>
        </div>
    </div>

@endsection

@section('body_last')
    <script type="text/javascript">
        var id = {!! json_encode($project->id) !!};
    </script>
    <script src="{{ url('js/jobs.js') }}" type="text/javascript"></script>
@endsection
