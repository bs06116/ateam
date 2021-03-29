"use strict";
var KTEmpListDatatable = function() {

    // variables
    var datatable;

    var dataJSONArray = JSON.parse('[\
        {"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe1","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 2","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe2","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 3","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe3","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 4","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe4","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 5","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe5","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10},\n' +
        '{"Name":"Project 1","Description":"A weekly selection of design links, brought to you by your friends at UX Collective","Manager":"John Doe","Foreman":"Jack Doe","Persons":10}' +
        ']');

    // init
    var init = function() {
        var dat = $('#inputDate').val();
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        if (datatable) {
            datatable.reload();
        } else {
            datatable = $('#kt_apps_emp_list_datatable').KTDatatable({
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: APP_URL + 'jobs/getEmps',
                            method:'POST',
                            params: {
                                "_token": csrfToken,
                                "id": id,
                                "dat": dat,
                                "ajax":1            
                            },
                            map: function(raw) {
                              // sample data mapping
                              var dataSet = raw;
                              if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                              }
                              return dataSet;
                            },
                          },
                    },
                    pageSize: 10, // display 20 records per page
                    // serverPaging: true,
                    // serverFiltering: true,
                    // serverSorting: true,
                },

                // layout definition
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                    footer: false, // display/hide footer
                },

                // column sorting
                sortable: false,

                pagination: false,

                search: {
                    input: $('#generalSearch'),
                    delay: 400,
                },

                // columns definition
                columns: [{
                    field: "name",
                    title: "Name",
                    width: 100,
                    autoHide: false,
                    // callback function support for column rendering
                    template: function(data, i) {

                        var number = i + 1;
                        while (number > 5) {
                            number = number - 3;
                        }
                        var img = number + '.png';

                        var output = '';
                            output = '<div class="kt-user-card-v2">\
                                        <div class="kt-user-card-v2__pic">\
                                            <img src="' + APP_URL + 'assets/media/project-logos/favicon-user.png" alt="photo">\
                                        </div>\
                                        <div class="kt-user-card-v2__details">\
                                            <span class="kt-user-card-v2__name">' + data.name + '</span>\
                                        </div>\
                                    </div>';
                        return output;
                    }
                },{
                    field: "desig",
                    title: "Designation",
                    width: 100,
                    // callback function support for column rendering
                    template: function(data, i) {

                        var output = '';
                            output = '<div class="kt-user-card-v2" style="display:flex; justify-content:space-between">\
                                            <span class="kt-user-card-v2__name">' + refineShow(data.desig) + '</span>\
                                    </div>';
                        return output;
                    }
                },{
                    field: "2",
                    title: "Assigned Paygroup",
                    width: 120,
                    // callback function support for column rendering
                    template: function(data, i) {

                        var output = '';
                            output = '<div class="kt-user-card-v2" style="display:flex; justify-content:space-between">\
                                            <span class="kt-user-card-v2__name">' + refineShow(data.pivot.paygroup) + '</span>\
                                    </div>';
                        return output;
                    }
                },{
                    field: "4",
                    title: "Cost Codes",
                    width: 100,
                    // callback function support for column rendering
                    template: function(data, i) {

                        var output = '';
                            output = '<div class="kt-user-card-v2" style="display:flex; justify-content:space-between">\
                                            <span class="kt-user-card-v2__name">' + refineShow(data.pivot.cost_code) + '</span>\
                                    </div>';
                        return output;
                    }
                },{
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    autoHide: false,
                    template: function(data, i) {
                        return '\
                        <a href="#" data-pid="' + data.pivot.project_id + '" data-uid="' + data.id + '" class="buttonEdit btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
                            <i data-pid="' + data.pivot.project_id + '" data-uid="' + data.id + '" class="la la-edit"></i>\
                        </a>\
                        <a href="javascript:;" data-pid="' + data.pivot.project_id + '" data-uid="' + data.id + '" class="btnDelete btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
                            <i data-pid="' + data.pivot.project_id + '" data-uid="' + data.id + '" class="la la-trash"></i>\
                        </a>\
                    ';
                    }
                }
                ]
            });
        }   

    }

    // editor = new $.fn.dataTable.Editor( {
    //     ajax: "/jobs",
    //     table: "#kt_apps_emp_list_datatable",
    //     fields: [ {
    //             label: "First name:",
    //             name: "name"
    //         }, {
    //             label: "Last name:",
    //             name: "desig"
    //         }, {
    //             label: "Position:",
    //             name: "hours"
    //         }, {
    //             label: "Office:",
    //             name: "paygroup"
    //         }, {
    //             label: "Extension:",
    //             name: "apprentice"
    //         }, {
    //             label: "Start date:",
    //             name: "cost_code",
    //             type: "datetime"
    //         }, {
    //             label: "Salary:",
    //             name: "actions"
    //         }
    //     ]
    // } );
 
    // // Activate an inline edit on click of a table cell
    // $('#kt_apps_emp_list_datatable').on( 'click', 'tbody td:not(:first-child)', function (e) {
    //     editor.inline( this );
    // } );


    // search
    var search = function() {
        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });
    }

    // selection
    var selection = function() {
        // init form controls
        //$('#kt_form_status, #kt_form_type').selectpicker();

        // event handler on check and uncheck on records
        datatable.on('kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated', function(e) {
            var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes(); // get selected records
            var count = checkedNodes.length; // selected records count

            $('#kt_subheader_group_selected_rows').html(count);
                
            if (count > 0) {
                $('#kt_subheader_search').addClass('kt-hidden');
                $('#kt_subheader_group_actions').removeClass('kt-hidden');
            } else {
                $('#kt_subheader_search').removeClass('kt-hidden');
                $('#kt_subheader_group_actions').addClass('kt-hidden');
            }
        });
    }

    // fetch selected records
    var selectedFetch = function() {
        // event handler on selected records fetch modal launch
        $('#kt_datatable_records_fetch_modal').on('show.bs.modal', function(e) {
            // show loading dialog
            var loading = new KTDialog({'type': 'loader', 'placement': 'top center', 'message': 'Loading ...'});
            loading.show();

            setTimeout(function() {
                loading.hide();
            }, 1000);
            
            // fetch selected IDs
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function(i, chk) {
                return $(chk).val();
            });

            // populate selected IDs
            var c = document.createDocumentFragment();
                
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }

            $(e.target).find('#kt_apps_user_fetch_records_selected').append(c);
        }).on('hide.bs.modal', function(e) {
            $(e.target).find('#kt_apps_user_fetch_records_selected').empty();
        });
    };

    // selected records status update
    var selectedStatusUpdate = function() {
        $('#kt_subheader_group_actions_status_change').on('click', "[data-toggle='status-change']", function() {
            var status = $(this).find(".kt-nav__link-text").html();

            // fetch selected IDs
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function(i, chk) {
                return $(chk).val();
            });

            if (ids.length > 0) {
                // learn more: https://sweetalert2.github.io/
                swal.fire({
                    buttonsStyling: false,

                    html: "Are you sure to update " + ids.length + " selected records status to " + status + " ?",
                    type: "info",
    
                    confirmButtonText: "Yes, update!",
                    confirmButtonClass: "btn btn-sm btn-bold btn-brand",
    
                    showCancelButton: true,
                    cancelButtonText: "No, cancel",
                    cancelButtonClass: "btn btn-sm btn-bold btn-default"
                }).then(function(result) {
                    if (result.value) {
                        swal.fire({
                            title: 'Deleted!',
                            text: 'Your selected records statuses have been updated!',
                            type: 'success',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        })
                        // result.dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                    } else if (result.dismiss === 'cancel') {
                        swal.fire({
                            title: 'Cancelled',
                            text: 'You selected records statuses have not been updated!',
                            type: 'error',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        });
                    }
                });
            }
        });
    }

    // selected records delete
    var selectedDelete = function() {
        $('#kt_subheader_group_actions_delete_all').on('click', function() {
            // fetch selected IDs
            var ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function(i, chk) {
                return $(chk).val();
            });

            if (ids.length > 0) {
                // learn more: https://sweetalert2.github.io/
                swal.fire({
                    buttonsStyling: false,

                    text: "Are you sure to delete " + ids.length + " selected records ?",
                    type: "danger",

                    confirmButtonText: "Yes, delete!",
                    confirmButtonClass: "btn btn-sm btn-bold btn-danger",

                    showCancelButton: true,
                    cancelButtonText: "No, cancel",
                    cancelButtonClass: "btn btn-sm btn-bold btn-brand"
                }).then(function(result) {
                    if (result.value) {
                        swal.fire({
                            title: 'Deleted!',
                            text: 'Your selected records have been deleted! :(',
                            type: 'success',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        })
                        // result.dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                    } else if (result.dismiss === 'cancel') {
                        swal.fire({
                            title: 'Cancelled',
                            text: 'You selected records have not been deleted! :)',
                            type: 'error',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        });
                    }
                });
            }
        });     
    }

    var updateTotal = function() {
        datatable.on('kt-datatable--on-layout-updated', function () {
            //$('#kt_subheader_total').html(datatable.getTotalRows() + ' Total');
        });
    };

    var clickActions = function() {
        datatable.on('blur', '.commentField', function(t){
            var comment = $(t.target).val();
            var id = $(t.target).data('pid');
            var dat = $('#inputDate').val();
            $.post( "/jobs/saveComment", {_token: csrfToken, id: id, dat: dat, comment: comment})
              .done(function( data ) {

              })
              .fail(function(data, error) {
                console.log(data);

              });
        }); 

        datatable.on('click', '.btnDelete', function(t){
            var id = $(t.target).data('pid');
            var uid = $(t.target).data('uid');
             swal.fire({
                 buttonsStyling: false,

                 text: "Are you sure to delete the current record?",
                 type: "warning",

                 confirmButtonText: "Yes, delete!",
                 confirmButtonClass: "btn btn-sm btn-bold btn-danger",

                 showCancelButton: true,
                 cancelButtonText: "No, cancel",
                 cancelButtonClass: "btn btn-sm btn-bold btn-brand"
             }).then(function(result) {
                 if (result.value) {
                    $.post( "/jobs/removeEmp", {_token: csrfToken, id: id, uid:uid})
                      .done(function( data ) {
                        var countEmp = parseInt($('._op_job_num_employees').text());
                        $('._op_job_num_employees').text(countEmp - 1);
                        datatable.reload();
                      })
                      .fail(function(data, error) {
                        console.log(data);

                      });

                 } else if (result.dismiss === 'cancel') {
                 }
             });
        });      

        datatable.on('click', '.buttonEdit', function(t){
            var id = $(t.target).data('pid');
            var uid = $(t.target).data('uid');
            $.post( "/jobs/getEmp", {_token: csrfToken, id: id, uid: uid})
              .done(function( data ) {
                $('#pgEdit').val(data.pgId);
                $('#nameEdit').val(data.name);
                $('#costCodeEdit').val(data.costCode);
                $('.btnUpdateEmp').data('uid',uid);
                $('#modalEdit').modal('show');
              })
              .fail(function(data, error) {
                console.log(data);
              });
             // swal.fire({
             //     buttonsStyling: false,

             //     text: "Are you sure to delete the current record?",
             //     type: "warning",

             //     confirmButtonText: "Yes, delete!",
             //     confirmButtonClass: "btn btn-sm btn-bold btn-danger",

             //     showCancelButton: true,
             //     cancelButtonText: "No, cancel",
             //     cancelButtonClass: "btn btn-sm btn-bold btn-brand"
             // }).then(function(result) {
             //     if (result.value) {
             //        $.post( "/jobs/removeEmp", {_token: csrfToken, id: id, uid:uid})
             //          .done(function( data ) {
             //            var countEmp = parseInt($('._op_job_num_employees').text());
             //            $('._op_job_num_employees').text(countEmp - 1);
             //            datatable.reload();
             //          })
             //          .fail(function(data, error) {
             //            alert(data);

             //          });

             //     } else if (result.dismiss === 'cancel') {
             //     }
             // });
        });      

        $('.btnAddEmp').on('click', function(e) {
            var uid = $('#selEmp').val();
            var pgid = $('#pgAdd').val();
            var cost_code = $('#costCodeAdd').val();
            if (uid == '' || pgid == '') {
                alert('You must choose employee and paygroup.');
                return;

            }
            $.post( "/jobs/addEmp", {_token: csrfToken, id: id, uid:uid, pgid: pgid, cost_code: cost_code})
              .done(function( data ) {
                if (data == 'exist') {
                    alert('Current employee have already been added to this project!');
                    // swal.fire({
                    //     title: 'Already Added!',
                    //     text: 'Current employee have already been added to this project!',
                    //     type: 'error',
                    //     buttonsStyling: false,
                    //     confirmButtonText: "OK",
                    //     confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                    // })
                } else if (data == 'ok') {
                    var countEmp = parseInt($('._op_job_num_employees').text());
                    $('._op_job_num_employees').text(countEmp + 1);
                    datatable.reload();
                    $('#modalAdd').modal('hide');
                }

              })
              .fail(function(data, error) {
                console.log(data);

              });

        })

        $('.btnUpdateEmp').on('click', function(e) {

            var uid = $('.btnUpdateEmp').data('uid');
            var pgid = $('#pgEdit').val();
            var cost_code = $('#costCodeEdit').val();
            if (uid == '' || pgid == '') {
                alert('You must choose employee and paygroup.');
                return;
            }
            $.post( "/jobs/updateEmp", {_token: csrfToken, id: id, uid:uid, pgid: pgid, cost_code: cost_code})
              .done(function( data ) {
                if (data == 'exist') {
                    alert('Current employee have already been added to this project!');
                    // swal.fire({
                    //     title: 'Already Added!',
                    //     text: 'Current employee have already been added to this project!',
                    //     type: 'error',
                    //     buttonsStyling: false,
                    //     confirmButtonText: "OK",
                    //     confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                    // })
                } else if (data == 'ok') {
                    datatable.reload();
                    $('#modalEdit').modal('hide');
                }

              })
              .fail(function(data, error) {
                console.log(data);

              });

        })

        $('#selEmp').on('change', function(e) {
            var id = $('#selEmp').val();
            $.post( "/jobs/getEmpDefaultPG", {_token: csrfToken, id: id})
              .done(function( data ) {
                $('#pgAdd').val(data.id);
              })
              .fail(function(data, error) {
                console.log(data);

              });

        })
    }

    return {
        // public functions
        init: function() {
            init();
            search();
            selection();
            selectedFetch();
            selectedStatusUpdate();
            selectedDelete();
            updateTotal();
            clickActions();
        },
    };
}();

var Jobs = function() {
    var e = function() {
        let e = $('input[name="_ip_job_name"]').val()
          , o = $('[name="_ip_job_des"]').val()
          // , t = ($('[name="_ip_job_pm"]').val(),
        // $('[name="_ip_job_pm"] option:selected').text())
        //   , i = ($('[name="_ip_job_pf"]').val(),
        // $('[name="_ip_job_pf"] option:selected').text())
          , s = $('input[name="_ip_job_num_employees[]"]').val()
          , n = $('[name="_ip_job_cost_codes[]"]').select2("data").map(function(e, o, t) {
            return '<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' + e.text + "</span> "
        }).join("")
          , a = $('[name="_ip_job_paygroups[]"]').select2("data").map(function(e, o, t) {
            return '<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' + e.text + "</span> "
        }).join("");
        $("._op_job_name").html(e),
        $("._op_job_des").html(o),
        // $("._op_job_pm").html(t),
        // $("._op_job_pf").html(i),
        $("._op_job_num_employees").html(s),
        $("._op_job_cost_codes").html(n),
        $("._op_job_paygroups").html(a)
    };
    return {
        init: function() {
            $('.manageEmp').on('click', function(e) {
                $('#modalEmp').modal('show');
            })
            $("#_ip_job_cost_codes").length && $("#_ip_job_cost_codes").select2({
                placeholder: "Select Cost codes"
            }).on("select2:unselecting", function() {
                $(this).data("unselecting", !0)
            }).on("select2:opening", function(e) {
                $(this).data("unselecting") && ($(this).removeData("unselecting"),
                e.preventDefault())
            }),
            $("#_ip_job_paygroups").length && $("#_ip_job_paygroups").select2({
                placeholder: "Select paygroups"
            }).on("select2:unselecting", function() {
                $(this).data("unselecting", !0)
            }).on("select2:opening", function(e) {
                $(this).data("unselecting") && ($(this).removeData("unselecting"),
                e.preventDefault())
            }),
            $(".__jobs-page").on("click", function(o) {
                console.log("abc", o.target);
                let t = $(o.target).closest(".form-group.is-field-focus")
                  , i = t.length;
                console.log($(o.target), t, i),
                $(o.target).hasClass("select2-selection__choice__remove") || i || (console.log("focus"),
                e(),
                $(".form-group.is-field-focus").find(".view-wrap").show(),
                $(".form-group.is-field-focus").find(".edit-field").hide(),
                $(".form-group.is-field-focus").removeClass("is-field-focus"))
            }),
            $(".__jobs-page .btn-edit-jobs").on("click", function(e) {
                console.log("edit jobs"),
                $(".btn-save-jobs").removeClass("d-none"),
                $(this).addClass("d-none"),
                $(".__jobs-page .icon-edit").show(),
                $(".__jobs-page .view-wrap-multiple").hide(),
                $(".__jobs-page .edit-field-multiple").show()
            }),
            $(".__jobs-page .icon-edit").on("click", function(e) {
                console.log("edit icon");
                let o = $(this).closest(".form-group");
                $(".__jobs-page").trigger("click"),
                o.addClass("is-field-focus"),
                o.find(".view-wrap").hide(),
                o.find(".edit-field").show(),
                o.find("#_ip_job_cost_codes").length && $("#_ip_job_cost_codes").select2("destroy").select2({
                    placeholder: "Select Cost codes"
                }),
                o.find("#_ip_job_paygroups").length && $("#_ip_job_paygroups").select2("destroy").select2({
                    placeholder: "Select paygroups"
                })
            }),
            $(".__jobs-page ._icon-add-item").on("click", function(e) {
                let o = $(this).closest(".form-group");
                o.find("#_ip_job_cost_codes").length && $("#_ip_job_cost_codes").select2("open"),
                o.find("#_ip_job_paygroups").length && $("#_ip_job_paygroups").select2("open")
            }),
            $(".__jobs-page .btn-save-jobs").on("click", function(o) {
                let t = $(".form-group");
                t.find(".view-wrap").show(),
                t.find(".edit-field").hide(),
                $(".__jobs-page .icon-edit").hide(),
                $(".__jobs-page .view-wrap-multiple").show(),
                $(".__jobs-page .edit-field-multiple").hide(),
                e(),
                $(this).find("i").remove(),
                $(this).addClass("kt-spinner kt-spinner--light"),
                $("#kt_form").submit();
                setTimeout(()=>{
                    $(this).prepend('<i class="la la-check"></i>'),
                    $(this).removeClass("kt-spinner kt-spinner--light"),
                    $.notify({
                        message: "Project has been successfully updated."
                    }, {
                        type: "success",
                        allow_dismiss: !0,
                        newest_on_top: !1,
                        mouse_over: !1,
                        showProgressbar: !1,
                        spacing: "10",
                        timer: "2000",
                        placement: {
                            from: "top",
                            align: "center"
                        },
                        offset: {
                            x: "30",
                            y: "30"
                        },
                        delay: "1000",
                        z_index: "10000",
                        animate: {
                            enter: "animated fadeInDown",
                            exit: "animated fadeOutUp"
                        }
                    }),
                    $(".btn-edit-jobs").removeClass("d-none"),
                    $(this).addClass("d-none")
                }
                , 1e3)
            })
        }
    }
}()
  , KTWizard1 = function() {
    var e, o, t;
    return {
        init: function() {
            var i;
            document.querySelector("#add_new_projet_step") && (KTUtil.get("add_new_projet_step"),
            e = $("#add_new_projet_form"),
            (t = new KTWizard("add_new_projet_step",{
                startStep: 1,
                clickableSteps: !1
            })).on("beforeNext", function(e) {
                !0 !== o.form() && e.stop()
            }),
            t.on("beforePrev", function(e) {
                !0 !== o.form() && e.stop()
            }),
            t.on("change", function(e) {
                setTimeout(function() {
                    KTUtil.scrollTop()
                }, 500)
            }),
            o = e.validate({
                ignore: ":hidden",
                rules: {
                    _ip_add_project_name: {
                        required: !0
                    },
                    _ip_add_des: {
                        required: !0
                    },
                    _ip_add_pm: {
                        required: !0
                    },
                    _ip_add_pf: {
                        required: !0
                    },
                    _ip_add_employee: {
                        required: !0
                    },
                    _ip_add_cost_codes: {
                        required: !0
                    },
                    _ip_add_paygroups: {
                        required: !0
                    },
                    _ip_add_start_date: {
                        required: !0
                    }
                },
                invalidHandler: function(e, o) {
                    KTUtil.scrollTop(),
                    swal.fire({
                        title: "",
                        text: "There are some errors in your submission. Please correct them.",
                        type: "error",
                        confirmButtonClass: "btn btn-secondary"
                    })
                },
                submitHandler: function(e) {}
            }),
            (i = e.find('[data-ktwizard-type="action-submit"]')).on("click", function(s) {
                s.preventDefault(),
                o.form() && (KTApp.progress(i),
                KTApp.block(e),
                e.ajaxSubmit({
                    success: function() {
                        KTApp.unprogress(i),
                        KTApp.unblock(e),
                        swal.fire({
                            title: "",
                            text: "The form has been successfully submitted!",
                            type: "success",
                            confirmButtonClass: "btn btn-secondary",
                            onClose: function() {
                                console.log("close modal"),
                                $("#add_new_project_modal").modal("hide"),
                                e.trigger("reset"),
                                t.goFirst()
                            }
                        })
                    }
                }))
            }))
        }
    }
}()
  , JobList = {
    init: function() {
        $("#_ip_add_pm").length && $("#_ip_add_pm").select2({
            placeholder: "Select your project manager",
            maximumSelectionLength: 1,
            minimumResultsForSearch: 1 / 0
        }),
        $("#_ip_add_pf").length && $("#_ip_add_pf").select2({
            placeholder: "Select your project manager",
            maximumSelectionLength: 1,
            minimumResultsForSearch: 1 / 0
        }),
        $("#_ip_add_employee").length && $("#_ip_add_employee").select2({
            placeholder: "Add your employee",
            minimumResultsForSearch: 1 / 0
        }),
        $("#_ip_add_paygroups").length && $("#_ip_add_paygroups").select2({
            placeholder: "Select your paygroups",
            minimumResultsForSearch: 1 / 0
        }),
        $("#_ip_add_cost_codes").length && $("#_ip_add_cost_codes").select2({
            placeholder: "Select your cost codes",
            minimumResultsForSearch: 1 / 0
        }),
        $("#_ip_add_start_date").datepicker({
            todayHighlight: !0,
            orientation: "top left",
            format: 'yyyy-mm-dd',
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        })
    }
};
jQuery(document).ready(function() {
    Jobs.init(),
    JobList.init(),
    KTWizard1.init();
    $('#modalEmp').on('shown.bs.modal', function (e) {
        KTEmpListDatatable.init();
      // do something...
    })

    $('.btnAddNewEmp').on('click', function (e) {
        $('#modalAdd').modal('show');
    })

});

var refineShow = function (val) {
    if (val == 'null' || val == undefined || val == null) {
        return '';
    }
    return val;
}
