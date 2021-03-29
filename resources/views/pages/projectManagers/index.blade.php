@extends('layouts.default')
@section('title', '| Project Managers')
@section('bodyClass', '__job-list-page')

@section('head')
    @parent
    <!-- Custom head here -->
@endsection


@section('main_content')
    <div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

        <!-- begin:: Content Head -->
        <div class="kt-subheader   kt-grid__item" id="kt_subheader" style="background-color: transparent;">
            <div class="kt-container  kt-container--fluid ">
                <div class="kt-subheader__main">
                    <div class="kt-subheader__group" id="kt_subheader_search">
                        <form class="" id="kt_subheader_search_form">
                            <div class="kt-input-icon kt-input-icon--left">
                                <input type="text" class="radius form-control" placeholder="Search Here" id="generalSearch">
                                <span class="kt-input-icon__icon kt-input-icon__icon--left">
                                    <span><i class="la la-search"></i></span>
                                </span>
                            </div>                                          
                        </form>
                    </div>
                </div>
                <div class="kt-subheader__toolbar">
                    <a href="#" class="">
                    </a>
                    <a href="#" class="radius btn btn-brand btn-elevate btn-pill" data-toggle="modal" data-target="#modalAdd">
                        ADD NEW
                    </a>
                </div>
            </div>
        </div>

        <!-- end:: Content Head -->

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

            <!--begin::Portlet-->
<!--             <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit">
 -->
                    <!--begin: Datatable -->
                    <div class="kt-datatable" id="kt_apps_user_list_datatable"></div>

                    <!--end: Datatable -->
<!--                 </div>
            </div>
 -->
            <!--end::Portlet-->

            <!--begin::Modal-->
            <div class="modal fade" id="kt_datatable_records_fetch_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Selected Records</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="kt-scroll" data-scroll="true" data-height="200">
                                <ul id="kt_apps_user_fetch_records_selected"></ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-brand" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--end::Modal-->
        </div>

        <!-- end:: Content -->
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ADD NEW PROJECT MANAGER</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <!--begin: Form Wizard Form-->
                <form class="kt-form" id="frmAdd" method="POST">
                    @csrf
                    <div class="modal-body">
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">User Name:</label>
                                <input type="text" class="form-control" name="name">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">Email Address:</label>
                                <input type="email" class="form-control" name="email">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">Phone Number:</label>
                                <input type="text" class="form-control" name="phone">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">Password:</label>
                                <input type="password" class="form-control" name="password">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button data-ktwizard-type="action-submit" class="btn btn-primary">ADD NEW</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">EDIT PROJECT MANAGER</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <!--begin: Form Wizard Form-->
                <form class="kt-form" id="frmEdit" method="POST">
                    @csrf
                    <input type="hidden" name="_method" value="PUT">\
                    <input type="hidden" id="eid" name="eid" value="">
                    <div class="modal-body">
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">User Name:</label>
                                <input type="text" class="form-control" id="ename" name="name">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">Email Address:</label>
                                <input type="email" class="form-control" id="eemail" name="email">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">Phone Number:</label>
                                <input type="text" class="form-control" id="ephone" name="phone">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="form-control-label">Password:</label>
                                <input type="password" class="form-control" id="epassword" name="password">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button data-ktwizard-type="action-submit" class="btn btn-primary">UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('body_last')
    <script src="{{ url('js/projectManagers.js') }}" type="text/javascript"></script>
@endsection
