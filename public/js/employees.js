"use strict";
// Class definition

var KTUserListDatatable = function() {

	// variables
	var datatable;

	// init
	var init = function() {
		// init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
		datatable = $('#kt_apps_user_list_datatable').KTDatatable({
			// datasource definition
			data: {
				
				type: 'remote',
			    source: {
			      read: {
			        url: APP_URL + 'employees',
					method:'GET',
					params: {
						"_token": csrfToken,
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
				// source: APP_URL + 'projectManagers/getList?_token',
				pageSize: 10, // display 20 records per page
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			// layout definition
			layout: {
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch'),
				delay: 400,
			},

			// columns definition
			columns: [{
				field: "name",
				title: "Name",
				width: 'auto',
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {
					var number = i + 1;
					while (number > 5) {
						number = number - 3;
					}
					var img = number + '.png';

					var skills = [
						'Angular, React',
						'Vue, Kendo',
						'.NET, Oracle, MySQL',
						'Node, SASS, Webpack',
						'MangoDB, Java',
						'HTML5, jQuery, CSS3'
					];
					console.log(APP_URL);

					var output = '\
                        <div class="kt-user-card-v2">\
                            <div class="kt-user-card-v2__pic">\
                                <img src="' + APP_URL + 'assets/media/project-logos/' + img + '" alt="photo">\
                            </div>\
                            <div class="kt-user-card-v2__details">\
                                <a href="#" class="kt-user-card-v2__name">' + data.name + '</a>\
                            </div>\
                        </div>';

					return output;
				}
			},{
				field: "desig",
				title: "Designation",
				width: 200,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span class="kt-user-card-v2__name">' + data.desig + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "email",
				title: "Details",
				width: 200,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<a href="#" class="kt-user-card-v2__name">' + data.email + '</a>\
										<span class="kt-user-card-v2__desc">' + data.phone + '</span>\
									</div>\
								</div>';
					return output;
				}
			}, {
					field: 'Actions',
					title: 'Actions',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function(data, i) {
						return '\
						<a href="#" data-edit-id="' + data.id + '" data-toggle="modal" data-target="#modalEdit" class="aEdit btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i data-edit-id="' + data.id + '" class="la la-file"></i>\
						</a>\
						<a href="#" data-edit-id="' + data.id + '" data-toggle="modal" data-target="#modalEdit" class="aEdit btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i data-edit-id="' + data.id + '" class="la la-edit"></i>\
						</a>\
						<form action="' + APP_URL + 'employees/'+data.id +'" class="d-inline-block" method="POST">\
						<input type="hidden" name="_token" value="'+csrfToken+'">\
						<input type="hidden" name="_method" value="DELETE">\
						<button href="javascript:;" class="btnDelete btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="la la-trash"></i>\
						</button></form>\
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
		datatable.on('click', 'a.aEdit', function(t){
        	var id = $(t.target).data('edit-id');
		  	$('#eid').val(id);
			$.get( "/employees/"+id, {})
			  .done(function( data ) {
			  	$('#ename').val(data.name);
			  	$('#eemail').val(data.email);
			  	$('#epassword').val('');
			  	$('#ephone').val(data.phone);
			  	$('#edesig').val(data.desig);
			  	$('#ename').val(data.name);
			  })
			  .fail(function(data, error) {
			  	alert(data);

			  });
	    });	

		datatable.on('click', '.btnDelete', function(t){
			t.preventDefault();
        	var frm = $(t.target).closest('form');
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
		            frm.submit();
				} else if (result.dismiss === 'cancel') {
				}
			});
	    });		
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

var KTWizard1 = function() {
    var e, o, t;
    return {
        init: function() {
            var i;
            e = $("#frmAdd"),
            o = e.validate({
                ignore: ":hidden",
                rules: {
                    name: {
                        required: !0
                    },
                    email: {
                        required: !0
                    },
                    password: {
                        required: !0
                    },
                    phone: {
                        required: !0
                    }
                },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                } else {
	                    element.after(error.addClass('invalid-feedback'));
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
                                $("#modalAdd").modal("hide"),
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

var KTWizard2 = function() {
    var e, o, t;
    return {
        init: function() {
            var i,j;
            e = $("#frmEdit"),
            o = e.validate({
                ignore: ":hidden",
                rules: {
                    name: {
                        required: !0
                    },
                    email: {
                        required: !0
                    },
                    password: {
                        required: !0
                    },
                    phone: {
                        required: !0
                    }
                },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                } else {
	                    element.after(error.addClass('invalid-feedback'));
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
				e.attr('action', '/employees/' + e.find('#eid').val());            	
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
                                $("#modalEdit").modal("hide"),
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


var init = function () {
        $( "#frmAdd" ).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true
                },
                phone: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 8,
                },
            },
            errorPlacement: function(error, element) {
                var group = element.closest('.input-group');
                if (group.length) {
                    group.after(error.addClass('invalid-feedback'));
                } else {
                    element.after(error.addClass('invalid-feedback'));
                }
            },

            //display error alert on form submit
            invalidHandler: function(event, validator) {
            	return false;
                // var alert = $('#kt_form_1_msg');
                // alert.removeClass('kt--hide').show();
                // KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit(); // submit the form
            }
        });
}

// On document ready
KTUtil.ready(function() {
	KTUserListDatatable.init();
	KTWizard1.init();
	KTWizard2.init();

	// init();

	// var validateForm = function() {
	// 	var errMsg = '';
	// 	if ($('#addName').val() == '') errMsg += "Name cannot be blank.<br>";
	// 	if ($('#addEmail').val() == '') errMsg += "Email cannot be blank.<br>";
	// 	if ($('#addPassword').val() == '') errMsg += "The password must be at least 8 characters.\n";

	// 	if (errMsg != '') {
	// 		swal.fire({
	// 			title: 'Validation Error',
	// 			html: errMsg,
	// 			type: 'error',
	// 			buttonsStyling: false,
	// 			confirmButtonText: "OK",
	// 			confirmButtonClass: "btn btn-sm btn-bold btn-brand",
	// 		});

	// 		return false;
	// 	}
	// 	else 
	// 		return true;
	// }

});