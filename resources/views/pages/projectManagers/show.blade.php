@extends('layouts.default')
@section('title', '| Project Manager')

@section('head')
    @parent
    <!-- Custom head here -->
@endsection


@section('main_content')
    <div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

            <!--Begin::Dashboard 1-->
            
            <div class="row">
                <div class="col-lg-12">

                    <!--begin::Portlet-->
                    <div class="kt-portlet kt-portlet--last kt-portlet--head-lg kt-portlet--responsive-mobile" id="">
                        <div class="no_display kt-portlet__head kt-portlet__head--lg">
                            <div class="kt-portlet__head-label">
                                <form action="" class="kt-form">
                                    <div class="form-group mb-0"> 
                                        <div class="kt-input-icon kt-input-icon--left">
                                            <input type="text" class="rounded-pill form-control" placeholder="Search..." id="generalSearch">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left">
                                                <span><i class="la la-search"></i></span>
                                            </span>
                                        </div> 
                                    </div>
                                </form>
                            </div>
                            <div class="kt-portlet__head-toolbar">
                                <div class="">
                                    <button type="button" class="btn-add-project btn btn-brand btn-pill btn-tall btn-wide">
                                        <span>ADD NEW</span>
                                    </button> 
                                </div>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="kt-section kt-section--first">
                                        <div class="kt-section__body"> 
                                            <div class="user-box mt-5">
                                                <div class="align-items-center d-flex user-box__body">
                                                    <div class="user-box__icon mr-4">
                                                        <a style="width: 65px;" href="#" class="kt-media kt-media--circle kt-media--lg">
                                                            <img src="{{ url('assets/media/users/100_1.jpg') }}" alt="image">
                                                        </a>
                                                    </div>
                                                    <div class="user-box__desc">
                                                        <h4 class="user-box__title">
                                                            {{$pm->name}}
                                                        </h4>
                                                        <div class="user-box__content">
                                                            <p class="m-0">{{$pm->email}}</p> 
                                                            <p class="m-0">{{$pm->phone}}</p>   
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="kt-section">
                                        <div class="kt-section__body"> 
                                            <h3 class="kt-portlet__head-title">Work Details</h3>
                                            <p>Total {{count($pm->pmProjects)}} projects are assigned to {{$pm->name}}</p>
                                            <div class="kt-separator kt-separator--space-xl"></div>
                                            <div class="tab-wrap">
                                                <ul class="nav nav-tabs nav-tabs-line-primary nav-tabs-line justify-content-between" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link kt-font-bold kt-font-lg kt-font-transform-u active" data-toggle="tab" href="#pm_tab_current_project" role="tab" aria-selected="true">Current Project</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link kt-font-bold kt-font-lg kt-font-transform-u" data-toggle="tab" href="#pm_tab_project_completed" role="tab" aria-selected="false">Projects Completed</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                    <div class="tab-pane active" id="pm_tab_current_project" role="tabpanel">
                                                        @if(isset($currentP))
                                                            <div class="kt-portlet kt-callout">
                                                                <div class="kt-portlet__body">
                                                                    <div class="kt-callout__body">
                                                                        <div class="kt-callout__content">
                                                                            <h3 class="kt-callout__title">{{$currentP->name}}</h3>
                                                                            <p class="kt-callout__desc">
                                                                                {{$currentP->desc}}
                                                                            </p>
                                                                        </div>
                                                                        <div class="kt-callout__action">
                                                                            <a href="/jobs/{{$currentP->id}}" class="btn btn-bold btn-primary btn-upper">Edit Project</a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="kt-space-30"></div>
                                                                    <div class="row">
                                                                        <div class="col-auto border-right">
                                                                            <div class="kt-font-bold">Project Manager: <span class="kt-font-primary">{{$currentP->pm->name}}</span></div>
                                                                        </div>
                                                                        <div class="col-auto border-right">
                                                                            <div class="kt-font-bold">Project Foreman: <span class="kt-font-primary">{{$currentP->foreman->name}}</span></div>
                                                                        </div>
                                                                        <div class="col-auto">
                                                                            <div class="kt-font-bold">Number of Employees assigned: <span class="kt-font-primary">{{count($currentP->users)}}</span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="kt-separator kt-separator--space-md"></div>
                                                                    <div class="d-flex">
                                                                        <div class="pr-4">Initial date: {{date('m/d/Y', strtotime($currentP->start_date))}}</div>
                                                                        <div class="pl-4 border-left">Deadline: {{date('m/d/Y', strtotime($currentP->start_date))}}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @else
                                                            <div class="kt-portlet kt-callout">
                                                                <div class="kt-portlet__body">
                                                                    <div class="kt-callout__content">
                                                                        <h5 class="kt-callout__title">No Current Project</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @endif
                                                    </div> 
                                                    <div class="tab-pane" id="pm_tab_project_completed" role="tabpanel">
                                                        @if(count($pm->pmProjects)>0)
                                                            @foreach($pm->pmProjects as $p)
                                                                <div class="kt-portlet kt-callout">
                                                                    <div class="kt-portlet__body">
                                                                        <div class="kt-callout__body">
                                                                            <div class="kt-callout__content">
                                                                                <h3 class="kt-callout__title">{{$p->name}}</h3>
                                                                                <p class="kt-callout__desc">
                                                                                    {{$p->desc}}
                                                                                </p>
                                                                            </div>
                                                                            <div class="kt-callout__action">
                                                                                <a href="/jobs/{{$p->id}}" class="btn btn-bold btn-primary btn-upper">Edit Project</a>
                                                                            </div>
                                                                        </div>
                                                                        <div class="kt-space-30"></div>
                                                                        <div class="row">
                                                                            <div class="col-auto border-right">
                                                                                <div class="kt-font-bold">Project Manager: <span class="kt-font-primary">{{$p->pm->name}}</span></div>
                                                                            </div>
                                                                            <div class="col-auto border-right">
                                                                                <div class="kt-font-bold">Project Foreman: <span class="kt-font-primary">{{$p->foreman->name}}</span></div>
                                                                            </div>
                                                                            <div class="col-auto">
                                                                                <div class="kt-font-bold">Number of Employees assigned: <span class="kt-font-primary">{{count($p->users)}}</span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="kt-separator kt-separator--space-md"></div>
                                                                        <div class="d-flex">
                                                                            <div class="pr-4">Initial date: {{date('m/d/Y', strtotime($currentP->start_date))}}</div>
                                                                            <div class="pl-4 border-left">Deadline: {{date('m/d/Y', strtotime($currentP->start_date))}}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            @endforeach
                                                        @else
                                                            <div class="kt-portlet kt-callout">
                                                                <div class="kt-portlet__body">
                                                                    <div class="kt-callout__content">
                                                                        <h5 class="kt-callout__title">No Project Completed</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-2"></div>
                            </div>
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
    <div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ADD NEW MANAGER</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">User Name:</label>
                            <input type="text" class="form-control" id="project_name">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Email Address:</label>
                            <input type="email" class="form-control" id="classification">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Phone Number:</label>
                            <input type="text" class="form-control" id="class_level">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">Password:</label>
                            <input type="password" class="form-control" id="class_level">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">ADD NEW</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('body_last')
@endsection
