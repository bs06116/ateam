"use strict";
// Class definition

var ListDatatable = function() {

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

		    var columns = [
		    	{
		    		data: 'cost_code',
		    		title: 'COST CODE',
		    		width: '7%'
		    	},
		    	{
		    		data: 'work_completed',
		    		title: 'TYPE OF WORK COMPLETED',
		    		width: '20%'
		    	},
		    ];

			var col2 = [{
				data: "amount_installed",
				title: "AMOUNT INSTALLED",
				width: '10%'
			},{
				data: "unit",
				title: "UNIT",
			},{
				data: "hours",
				title: "HOURS",
			},{
				data: "productivity",
				title: "PRODUCTIVITY",
			},{
				data: "comment",
				title: "COMMENTS",
				width: '20%'
			}];

			var dat = $('#inputDate').val();

		    $.ajax({
		      url: "/jobs/workDiaryData",
		      data: {
		      	_token: csrfToken,
		      	dat: dat,
		      	pid: pid
		      },
		      success: function(data) {
		      	var cols = data['cols'];
			    var columnNames = Object.keys(cols);
			    for (var i in columnNames) {
			      columns.push(
			      	{
			      		data: columnNames[i], 
	                    title: cols[columnNames[i]],
	                    width: '5%'
	                });
			    	$('#hoursTr').append("<td id='hoursTd" + columnNames[i] + "' style='width:4.17%'></td>");
			    	$('#hoursTrOffsite').append("<td id='hoursTdOffsite" + columnNames[i] + "' style='width:4.17%'>0</td>");
			    }
		    	$('#hoursTr').append("<td style=''></td>");
		    	$('#hoursTrOffsite').append("<td style=''></td>");

			    columns = columns.concat(col2);

			    var data = data['data'];

			    var hoursSum = [];
			    for (var j in data) {
			    	var wd = data[j];
				    for (var i in columnNames) {
				    	if (isNaN(hoursSum[columnNames[i]])) {
				    		hoursSum[columnNames[i]] = 0;
				    	}
				    	var a = parseInt(wd[columnNames[i]]);
				    	a = isNaN(a)?0:a;
				    	hoursSum[columnNames[i]] += a;
				    }

			    }

			    var hoursOnsiteTotal = 0;
			    for (var i in columnNames) {
			    	$('#hoursTd'+columnNames[i]).text(hoursSum[columnNames[i]]);
			    	hoursOnsiteTotal += hoursSum[columnNames[i]];
			    }

			    $('#hoursOnsiteTotal').text(hoursOnsiteTotal);



				datatable = $('#table1').DataTable( {
					data: data,
					paging: false,
					columns: columns,
					searchable: false,
					bFilter: false,
					info: false,
					bSort: false
				});

			    datatable.MakeCellsEditable({
			        "onUpdate": myCallbackFunction,
			        "columns": [0,1],
			        inputCss: 'diaryTableInput'
			    });

		      }
		    });

		    function myCallbackFunction(updatedCell, updatedRow, oldValue) {
		    	var row = updatedCell.index().row;
		    	var col = updatedCell.index().column;

		    	var field = datatable.columns(col).dataSrc()[0];
		    	var costCode = datatable.cell(row,0).data();

		    	var dat = $('#inputDate').val();

		    	var val = updatedCell.data();

		    	var data = {
		    		_token: csrfToken,
		    		costCode: costCode,
		    		val: val,
		    		dat: dat,
		    		field: field,
		    		pid: pid
		    	}

		    	if (!isNaN(field)) {
		    		val = isNaN(parseInt(val)) ? 0 : parseInt(val);

		    		var oldValueI = parseInt(oldValue);
		    		oldValueI = isNaN(oldValueI)?0:oldValueI;

		    		var hoursCol = -1;
					datatable.columns().every( function (index) {
					    var field = this.dataSrc();
					    if (field == 'hours') {
					    	hoursCol = index;
					    }
					} );


		    		var hours = parseInt(datatable.cell(row,hoursCol).data());
		    		hours = isNaN(hours)?0:hours;
		    		datatable.cell(row, hoursCol).data(hours -oldValueI + val);

		    		var tdTag = $('#hoursTd'+field);
		    		var hoursTd = parseInt(tdTag.text());
		    		hoursTd = isNaN(hoursTd)?0:hoursTd;
		    		hoursTd = hoursTd - oldValueI + val;
		    		tdTag.text(hoursTd);

					var hoursOnsiteTotalTag = $('#hoursOnsiteTotal');
		    		var hoursOnsiteTotal = parseInt(hoursOnsiteTotalTag.text());
		    		hoursOnsiteTotal = isNaN(hoursOnsiteTotal)?0:hoursOnsiteTotal;
		    		hoursOnsiteTotal = hoursOnsiteTotal - oldValueI + val;
		    		hoursOnsiteTotalTag.text(hoursOnsiteTotal);
		    	}

		    	$.ajax({
		    		url: '/jobs/workDiarySave',
		    		method: 'POST',
		    		data: data,
		    		success: function (res) {
		    			console.log(res);

		    		},
		    		fail: function (err, res) {

		    		}
		    	})


			    console.log("The new value for the cell is: " + updatedCell.data());
			    console.log("The old value for that cell was: " + oldValue);
			    console.log("The values for each cell in that row are: " + updatedRow.data());
			}

	    // editor = new $.fn.dataTable.Editor( {
	    //     ajax: "../php/staff.php",
	    //     table: "#example",
	    //     fields: [ {
	    //             label: "First name:",
	    //             name: "first_name"
	    //         }, {
	    //             label: "Last name:",
	    //             name: "last_name"
	    //         }, {
	    //             label: "Position:",
	    //             name: "position"
	    //         }, {
	    //             label: "Office:",
	    //             name: "office"
	    //         }, {
	    //             label: "Extension:",
	    //             name: "extn"
	    //         }, {
	    //             label: "Start date:",
	    //             name: "start_date",
	    //             type: "datetime"
	    //         }, {
	    //             label: "Salary:",
	    //             name: "salary"
	    //         }
	    //     ]
	    // } );
		 
	}

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

		datatable.on('click', 'tbody td', function(t){
			datatable.cells( this ).edit();
		});
	}

	return {
		// public functions
		init: function() {
			init();
			// search();
			// selection();
			// selectedFetch();
			// selectedStatusUpdate();
			// selectedDelete();
			// updateTotal();
			// clickActions();
		},
	};
}();
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

	  		var cols = [{
				field: "costCode",
				title: "COST CODE",
				width: 50,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span href="#" class="kt-user-card-v2__name">' + data.cost_code + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "typeWork",
				title: "TYPE OF WORK COMPLETED",
				width: 150,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span href="#" class="kt-user-card-v2__name">' + refineShow(data.work_completed) + '</span>\
									</div>\
								</div>';
					return output;
				}
			}
			];

			var col2 = [{
				field: "amount",
				title: "AMOUNT INSTALLED",
				width: 100,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span href="#" class="kt-user-card-v2__name">' + data.amount_installed + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "unit",
				title: "UNIT",
				width: 50,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span href="#" class="kt-user-card-v2__name">' + data.unit + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "hours",
				title: "HOURS",
				width: 50,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span href="#" class="kt-user-card-v2__name">' + '10' + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "productivity",
				title: "PRODUCTIVITY",
				width: 100,
				autoHide: false,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
									<div class="kt-user-card-v2__details">\
										<span href="#" class="kt-user-card-v2__name">' + data.productivity + '</span>\
									</div>\
								</div>';
					return output;
				}
			},{
				field: "comments",
				title: "COMMENTS",
				width: 200,
				// callback function support for column rendering
				template: function(data, i) {

					var output = '';
						output = '<div class="kt-user-card-v2">\
										<span href="#" class="kt-user-card-v2__name">' + data.comment + '</span>\
								</div>';
					return output;
				}
			}];

			cols = cols.concat(col2);

			datatable = $('#kt_apps_user_list_datatable').DataTable({
				// datasource definition
				data: {
					type: 'remote',
					source: {
						read: {
							url: APP_URL + 'jobs/workDiary',
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
				columns: cols
			});


	}

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

		datatable.on('click', 'tbody td', function(t){
			datatable.cells( this ).edit();
		});
	}

	return {
		// public functions
		init: function() {
			init();
			// search();
			// selection();
			// selectedFetch();
			// selectedStatusUpdate();
			// selectedDelete();
			// updateTotal();
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
        	location.href = APP_URL + 'jobs/workDiary?pid=' + pid + '&dat=' + $('#inputDate').val();
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
	ListDatatable.init();
	// KTUserListDatatable.init();
	KTBootstrapDatepicker.init();
    // Jobs.init(),
    JobList.init(),
    KTWizard1.init()

    $('#btnSubmitWd').on('click', function(e) {
         swal.fire({
             buttonsStyling: false,

             text: "YOU UNDERSTAND THAT THIS IS GOING INTO THE ACCOUNTING SYSTEM, EMPLOYEES WILL BE PAID BASED OFF OF THIS INFORMATION",
             type: "warning",

             confirmButtonText: "YES",
             confirmButtonClass: "btn btn-sm btn-bold btn-danger",

             showCancelButton: true,
             cancelButtonText: "NO",
             cancelButtonClass: "btn btn-sm btn-bold btn-brand"
         }).then(function(result) {
             if (result.value) {
		    	var dat = $('#inputDate').val();

		    	var data = {
		    		_token: csrfToken,
		    		dat: dat,
		    		pid: pid
		    	}

		    	var b = this;

				KTApp.progress(b);
		        KTApp.block('body');
		    	$.ajax({
		    		url: '/jobs/sendWDToSage',
		    		method: 'POST',
		    		data: data,
		    		success: function (result) {
		    			var res = result.result;
		    			var dates = result.data;
		                KTApp.unprogress(b);
		                KTApp.unblock('body');
		    			console.log(res);
		    			if (res.indexOf('SUCCESS') >-1) {
		                    swal.fire({
		                        title: "",
		                        text: "All data have been successfully submitted to Sage.\n Dates: " + dates.join(', '),
		                        type: "success",
								confirmButtonClass: "btn btn-secondary",
								onClose: function() {
		                        }
		                    })

		    			} else if (res == 'no_data_to_submit') {
		                    swal.fire({
		                        title: "",
		                        text: "Sorry, there is no data to submit to Sage.",
		                        type: "success",
								confirmButtonClass: "btn btn-secondary",
								onClose: function() {
		                        }
		                    })

		    			}
		    		},
		    		fail: function (err, res) {

		    		}
		    	})
		    	
             } else if (result.dismiss === 'cancel') {
             }
         });

    })
});

var refineShow = function (val) {
    if (val == 'null' || val == undefined || val == null) {
        return '';
    }
    return val;
}
