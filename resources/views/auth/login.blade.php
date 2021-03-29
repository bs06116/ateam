@extends('layouts.base')
@section('title', '| Login')
@section('head')
    @parent
    <link href="assets/css/pages/login/login-3.css" rel="stylesheet" type="text/css" />
@endsection

@section('body')
<?php if(isset($_REQUEST['login'])){if($_REQUEST['login']!=''){}  }else{$_REQUEST['login'] ='';}?>
    <!-- begin::Body -->
    <body class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--fixed kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading">

        <!-- begin:: Page -->
        <div class="kt-grid kt-grid--ver kt-grid--root">
            <div class="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin" id="kt_login">
                <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" style="background-image: url(assets/media/bg/bg-3.jpg);">
                    <div class="kt-grid__item kt-grid__item--fluid kt-login__wrapper">

                        <div class="kt-portlet loginPortlet">
                            <img class="" style="margin: 0 auto;display: block;position: relative;width: 130px;" src="assets/media/logos/a-team.png" alt="ATeam"/>
                            <div class="kt-portlet__head">
                                <div class="kt-portlet__head-label" style="margin: auto">
                                    <h3 class="kt-portlet__head-title">
                                        Login
                                    </h3>
                                </div>
                            </div>
<?php if($_REQUEST['login'] =='user') { ?>


                            <!--begin::Form-->
                            <form method="POST" action="{{ route('login') }}" class="kt-form kt-form--fit kt-form--label-right">
                                @csrf
                                <div class="kt-portlet__body">
                                    <div class="kt-section kt-section--first" style="margin-bottom:0">
                                        <div class="form-group">
                                            <label>Email Address:</label>
                                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                            @error('email')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                        </div>
                                        <div class="form-group">
                                            <label>Password:</label>
                                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                            @error('password')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-pill btn-brand radius login">LOGIN</button>
                                        </div>
                                        <div class="form-group">
                                            <center><a href="#" class="resetPassword">Reset Password</a></center>
                                        </div>
                                    </div>
                                </div>
                            </form>

<?php } else { ?>

<a href="https://ateam.theappguys.org/login?login=accountant"><button type="submit" style="margin-bottom: 20px;" class="btn btn-pill btn-brand radius login">ACCOUNTANT LOGIN</button></a>
<div style="clear:both"></div>
<br>
<a href="https://user.ateam.theappguys.org/login?login=user"><button type="submit" class="btn btn-pill btn-brand radius login">PM & FOREMAN LOGIN</button></a>

<?php } ?>

                            <!--end::Form-->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- end:: Page -->

        <!-- begin::Global Config(global config for global JS sciprts) -->
        <script>
            var KTAppOptions = {
                "colors": {
                    "state": {
                        "brand": "#5d78ff",
                        "dark": "#282a3c",
                        "light": "#ffffff",
                        "primary": "#5867dd",
                        "success": "#34bfa3",
                        "info": "#36a3f7",
                        "warning": "#ffb822",
                        "danger": "#fd3995"
                    },
                    "base": {
                        "label": [
                            "#c5cbe3",
                            "#a1a8c3",
                            "#3d4465",
                            "#3e4466"
                        ],
                        "shape": [
                            "#f0f3ff",
                            "#d9dffa",
                            "#afb4d4",
                            "#646c9a"
                        ]
                    }
                }
            };
        </script>

        <!-- end::Global Config -->

        <!--begin::Global Theme Bundle(used by all pages) -->
        <script src="assets/plugins/global/plugins.bundle.js" type="text/javascript"></script>
        <script src="assets/js/scripts.bundle.js" type="text/javascript"></script>

        <!--end::Global Theme Bundle -->

        <!--begin::Page Scripts(used by this page) -->
        <script src="assets/js/pages/custom/login/login-general.js" type="text/javascript"></script>

        <!--end::Page Scripts -->
    </body>

<!-- end::Body -->
@endsection
