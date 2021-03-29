@extends('layouts.base')
@section('body')
    <!-- begin::Body -->
    <body class="@yield('bodyClass') kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-page--loading">

        <!-- begin:: Page -->

        <!-- begin:: Header Mobile -->
        <div id="kt_header_mobile" class="kt-header-mobile  kt-header-mobile--fixed ">
            <div class="kt-header-mobile__logo">
                <!--<a href="/">
                   <img width="60" style="padding: 7px;" alt="Logo" src="{{url('assets/media/logos/a-team.png')}}"/> 
                </a>-->
            </div>
            <div class="kt-header-mobile__toolbar">
                <button class="kt-header-mobile__toggler kt-header-mobile__toggler--left" id="kt_aside_mobile_toggler"><span></span></button>
                <!-- <button class="kt-header-mobile__toggler" id="kt_header_mobile_toggler"><span></span></button> -->
                <button class="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler"><i class="flaticon-more"></i></button>
            </div>
        </div>

        <!-- end:: Header Mobile -->
        <div class="kt-grid kt-grid--hor kt-grid--root">
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">

                <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper __jobs-page" id="kt_wrapper">

                    <!-- begin:: Header -->
                    <div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed" style="z-index: 1050!important;background: #000;">
                        <div class="headerLogoTitle" style="z-index: 9999999!important;background: #000;">
                            <div class="kt-aside__brand-logo" style="width: 92px;z-index: 999999999!important;">
                                <a href="/">
                                    <img alt="ATeam" src="{{url('assets/media/logos/a-team.png')}}" style="width: 92px;z-index: 999999999!important;" />
                                </a>
                            </div>
							
                            <div class="pageTitleWrapper" style="z-index: 9999999!important;background: #000;">
                                <div class="pageTitle" style="z-index: 9999999!important;background: #000;">
                                    {!! $pageTitle !!}
                                </div>
                            </div>
                        </div>

                        <!-- begin:: Header Topbar -->
                        <div class="kt-header__topbar" style="background: #000;">

                            <!--begin: User Bar -->
                            <div class="kt-header__topbar-item kt-header__topbar-item--user">
                                <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
                                    <div class="kt-header__topbar-user">

                                        <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
                                        <span class="kt-hidden kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">S</span>

                                        <span class="kt-header__topbar-username">{{$username}}</span>
                                        <span class="kt-font-xl"><i class="la la-ellipsis-v"></i></span>
                                    </div>
                                </div>
                                <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl" style="width:150px">

                                    <!--begin: Navigation -->
                                    <div class="kt-notification">
                                        <a href="#" class="kt-notification__item">
                                            <div class="kt-notification__item-details">
                                                <div class="kt-notification__item-title kt-font-bold">
                                                    Reset Password
                                                </div>
                                            </div>
                                        </a>
                                        <a href="{{ route('logout') }}"
                                               onclick="event.preventDefault();
                                                             document.getElementById('logout-form').submit();" class="kt-notification__item">
                                            <div class="kt-notification__item-details">
                                                <div class="kt-notification__item-title kt-font-bold">
                                                    Logout
                                                </div>
                                            </div>
                                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                @csrf
                                            </form>
                                        </a>
                                    </div>

                                    <!--end: Navigation -->
                                </div>
                            </div>

                            <!--end: User Bar -->
                        </div>

                        <!-- end:: Header Topbar -->
                    </div>

                    <!-- end:: Header -->

                    @yield('main_content')
                </div>
            </div>
        </div>

        <!-- end:: Page -->

        <!-- begin::Scrolltop -->
        <div id="kt_scrolltop" class="kt-scrolltop">
            <i class="fa fa-arrow-up"></i>
        </div>

        <!-- end::Scrolltop -->

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
        <script src="{{ url('assets/plugins/global/plugins.bundle.js') }}" type="text/javascript"></script>
        <script src="{{ url('assets/js/scripts.bundle.js') }}" type="text/javascript"></script>

        <!--end::Global Theme Bundle -->

        <!--begin::Page Vendors(used by this page) -->
        <script src="{{ url('assets/plugins/custom/fullcalendar/fullcalendar.bundle.js') }}" type="text/javascript"></script>
        <script src="{{ url('assets/plugins/custom/gmaps/gmaps.js') }}" type="text/javascript"></script>
        <script src="{{ url('assets/plugins/custom/datatables/datatables.bundle.js') }}" type="text/javascript"></script>
        <script src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js" type="text/javascript"></script>
        <script src="https://editor.datatables.net/extensions/Editor/js/dataTables.editor.min.js" type="text/javascript"></script>

        <!--end::Page Vendors -->

        <!--begin::Page Scripts(used by this page) -->
        <!-- <script src="assets/js/pages/dashboard.js" type="text/javascript"></script> -->
        <!-- <script src="assets/js/pages/crud/forms/widgets/select2.js" type="text/javascript"></script> -->

        <!--end::Page Scripts -->

        @yield('body_last')

    </body>

    <!-- end::Body -->
@endsection

