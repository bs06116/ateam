"use strict";
// Class definition

var KTUserListDatatable = function() {

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
		datatable = $('#kt_apps_user_list_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: APP_URL + 'jobs',
						method:'GET',
						params: {
							"_token": csrfToken,
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
				field: "Name",
				title: "JOB NAME",
				width: 250,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span class="kt-user-card-v2__name">' + data.Name + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "Foreman",
				title: "Assigned Foreman",
				width: 150,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2" style="display:flex; justify-content:space-between">\
										<span class="kt-user-card-v2__name">' + data.Foreman + '</span>\
										<a href="#" class="kt-user-card-v2__name">Edit</a>\
								</div>';
					return output;
				}
			},{
				field: "start_date",
				title: "Start Date",
				width: 100,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span class="kt-user-card-v2__name">' + data.start_date + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "comments",
				title: "COMMENTS",
				width: 450,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
										<textarea data-pid="' + data.id + '" class="commentField form-control" style="display:inline-block" rows="2">' + data.comment + '</textarea>\
								</div>';
					return output;
									// <span class="kt-user-card-v2__name">' + data.comment + '</span>\
									// <textarea class="form-control" style="display:inline-block" rows="2"></textarea>\

				}
			}, {
					field: '',
					title: '',
					sortable: false,
					width: 140,
					overflow: 'visible',
					autoHide: false,
					template: function(data, i) {
						return '\
		                    <a href="' + APP_URL + 'jobs/'+data.id +'" class=" btn btnBlue btnHPadding btn-brand btn-elevate btn-pill">\
		                        View Job\
		                    </a>\
					';
					},
				}]
		});
	}

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
		datatable.on('kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',	function(e) {
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
			  	alert(data);

			  });
	    });	

		// datatable.on('click', '.btnDelete', function(t){
		// 	t.preventDefault();
  //       	var frm = $(t.target).closest('form');
		// 	swal.fire({
		// 		buttonsStyling: false,

		// 		text: "Are you sure to delete the current record?",
		// 		type: "warning",

		// 		confirmButtonText: "Yes, delete!",
		// 		confirmButtonClass: "btn btn-sm btn-bold btn-danger",

		// 		showCancelButton: true,
		// 		cancelButtonText: "No, cancel",
		// 		cancelButtonClass: "btn btn-sm btn-bold btn-brand"
		// 	}).then(function(result) {
		// 		if (result.value) {
		//             frm.submit();
		// 		} else if (result.dismiss === 'cancel') {
		// 		}
		// 	});
	 //    });		
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
          , t = ($('[name="_ip_job_pm"]').val(),
        $('[name="_ip_job_pm"] option:selected').text())
          , i = ($('[name="_ip_job_pf"]').val(),
        $('[name="_ip_job_pf"] option:selected').text())
          , s = $('input[name="_ip_job_num_employees"]').val()
          , n = $('[name="_ip_add_cost_codes"]').select2("data").map(function(e, o, t) {
            return '<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' + e.text + "</span> "
        }).join("")
          , r = $('[name="_ip_job_paygroups"]').select2("data").map(function(e, o, t) {
            return '<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' + e.text + "</span> "
        }).join("");
        $("._op_job_name").html(e),
        $("._op_job_des").html(o),
        $("._op_job_pm").html(t),
        $("._op_job_pf").html(i),
        $("._op_job_num_employees").html(s),
        $("._op_job_cost_codes").html(n),
        $("._op_job_paygroups").html(r)
    };
    return {
        init: function() {
            $("#_ip_add_cost_codes").length && $("#_ip_add_cost_codes").select2({
                placeholder: "Select Cost codes"
            }),
            $("#_ip_add_paygroups").length && $("#_ip_add_paygroups").select2({
                placeholder: "Select paygroups"
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
                $(".__jobs-page .icon-edit").show()
            }),
            $(".__jobs-page .icon-edit").on("click", function(e) {
                console.log("edit icon");
                let o = $(this).closest(".form-group");
                $(".__jobs-page").trigger("click"),
                o.addClass("is-field-focus"),
                o.find(".view-wrap").hide(),
                o.find(".edit-field").show(),
                o.find("#_ip_add_cost_codes").length && $("#_ip_add_cost_codes").select2("destroy").select2({
                    placeholder: "Select Cost codes"
                }),
                o.find("#_ip_add_paygroups").length && $("#_ip_add_paygroups").select2("destroy").select2({
                    placeholder: "Select paygroups"
                })
            }),
            $(".__jobs-page .btn-save-jobs").on("click", function(o) {
                let t = $(".form-group");
                t.find(".view-wrap").show(),
                t.find(".edit-field").hide(),
                $(".__jobs-page .icon-edit").hide(),
                e(),
                $(this).find("i").remove(),
                $(this).addClass("kt-spinner kt-spinner--light"),
                setTimeout(()=>{
                    $(this).prepend('<i class="la la-check"></i>'),
                    $(this).removeClass("kt-spinner kt-spinner--light"),
                    $.notify({
                        message: "Save jobs success...!"
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
            KTUtil.get("add_new_projet_step"),
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
                    address1: {
                        required: !0
                    },
                    postcode: {
                        required: !0
                    },
                    city: {
                        required: !0
                    },
                    state: {
                        required: !0
                    },
                    country: {
                        required: !0
                    },
                    package: {
                        required: !0
                    },
                    weight: {
                        required: !0
                    },
                    width: {
                        required: !0
                    },
                    height: {
                        required: !0
                    },
                    length: {
                        required: !0
                    },
                    delivery: {
                        required: !0
                    },
                    packaging: {
                        required: !0
                    },
                    preferreddelivery: {
                        required: !0
                    },
                    locaddress1: {
                        required: !0
                    },
                    locpostcode: {
                        required: !0
                    },
                    loccity: {
                        required: !0
                    },
                    locstate: {
                        required: !0
                    },
                    loccountry: {
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
                submitHandler: function(e) {
                	
                }
            }),
            (i = e.find('[data-ktwizard-type="action-submit"]')).on("click", function(t) {
                t.preventDefault(),
                o.form() && (KTApp.progress(i),
                e.ajaxSubmit({
                    success: function() {
                        KTApp.unprogress(i),
                        swal.fire({
                            title: "",
                            text: "The form has been successfully submitted!",
                            type: "success",
							confirmButtonClass: "btn btn-secondary",
							onClose: function() {
                                console.log("close modal"),
                                $("#add_new_project_modal").modal("hide"),
								e.trigger("reset")
								location.reload();

                            }
                        })
                    }
                }))
            })
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

var KTBootstrapDatepicker = function () {

    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    
    var initF = function () {
        // minimum setup
        $('#inputDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            autoclose: true
        }).on('change', function(e){
        	location.href = APP_URL + 'jobs?dat=' + $('#inputDate').val();
        	// $('.datepicker').hide();
    	});

	   $('#inputDateIcon').click(function(){
	       $(document).ready(function(){
	           $("#inputDate").datepicker().focus();
	       });
	   });


    }

    return {
        // public functions
        init: function() {
            initF(); 
        }
    };
}();

// On document ready
KTUtil.ready(function() {
	KTUserListDatatable.init();
	KTBootstrapDatepicker.init();
    // Jobs.init(),
    JobList.init(),
    KTWizard1.init()
});