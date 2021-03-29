
var Jobs = (function () {
	var _updateFieldData = function () {
		let _ip_job_name = $('input[name="_ip_job_name"]').val();
		let _ip_job_des = $('[name="_ip_job_des"]').val();
		let _ip_job_pm = $('[name="_ip_job_pm"]').val();
		let _ip_job_pm_text = $('[name="_ip_job_pm"] option:selected').text();
		let _ip_job_pf = $('[name="_ip_job_pf"]').val();
		let _ip_job_pf_text = $('[name="_ip_job_pf"] option:selected').text();
		let _ip_job_num_employees = $('input[name="_ip_job_num_employees"]').val();
		let _ip_job_cost_codes = $('[name="_ip_job_cost_codes"]').select2("data");
		let _ip_job_cost_codes_html = _ip_job_cost_codes
			.map(function (item, index, arr) {
				return (
					'<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' +
					item.text +
					"</span> "
				);
			})
			.join("");
		let _ip_job_paygroups = $('[name="_ip_job_paygroups"]').select2("data");
		let _ip_job_paygroups_html = _ip_job_paygroups
			.map(function (item, index, arr) {
				return (
					'<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' +
					item.text +
					"</span> "
				);
			})
			.join("");
		$("._op_job_name").html(_ip_job_name);
		$("._op_job_des").html(_ip_job_des);
		$("._op_job_pm").html(_ip_job_pm_text);
		$("._op_job_pf").html(_ip_job_pf_text);
		$("._op_job_num_employees").html(_ip_job_num_employees);
		$("._op_job_cost_codes").html(_ip_job_cost_codes_html);
		$("._op_job_paygroups").html(_ip_job_paygroups_html);
	};

	var editJobs = function () {
		$(".__jobs-page .btn-edit-jobs").on("click", function (e) {
			console.log("edit jobs");
			$(".btn-save-jobs").removeClass("d-none");
			$(this).addClass("d-none");
			//$('.__jobs-page .view-wrap').hide();
			$(".__jobs-page .icon-edit").show();
		});
	};

	var saveJobs = function () {
		$(".__jobs-page .btn-save-jobs").on("click", function (e) {
			//alert("save jobs");
			let wrap = $(".form-group");
			wrap.find(".view-wrap").show();
			wrap.find(".edit-field").hide();
			$(".__jobs-page .icon-edit").hide();

			_updateFieldData();

			$(this).find('i').remove();
			$(this).addClass('kt-spinner kt-spinner--light');
			setTimeout(() => {
				$(this).prepend('<i class="la la-check"></i>');
				$(this).removeClass('kt-spinner kt-spinner--light');
				$.notify({ message: 'Save jobs success...!' }, { "type": "success", "allow_dismiss": true, "newest_on_top": false, "mouse_over": false, "showProgressbar": false, "spacing": "10", "timer": "2000", "placement": { "from": "top", "align": "center" }, "offset": { "x": "30", "y": "30" }, "delay": "1000", "z_index": "10000", "animate": { "enter": "animated fadeInDown", "exit": "animated fadeOutUp" } })
				$(".btn-edit-jobs").removeClass("d-none");
				$(this).addClass("d-none");
			}, 1000);
		});
	};

	var editFieldJobs = function () {
		$(".__jobs-page .icon-edit").on("click", function (e) {
			console.log("edit icon");
			let wrap = $(this).closest(".form-group");
			$('.__jobs-page').trigger('click');
			wrap.addClass("is-field-focus");
			wrap.find(".view-wrap").hide();
			wrap.find(".edit-field").show();

			if (wrap.find("#_ip_job_cost_codes").length) {
				$("#_ip_job_cost_codes").select2("destroy").select2({
					placeholder: "Select Cost codes",
				});
			}
			if (wrap.find("#_ip_job_paygroups").length) {
				$("#_ip_job_paygroups").select2("destroy").select2({
					placeholder: "Select paygroups",
				});
			}
		});
	};

	return {
		init: function () {
			if ($("#_ip_job_cost_codes").length) {
				$("#_ip_job_cost_codes").select2({
					placeholder: "Select Cost codes",
				});
			}
			if ($("#_ip_job_paygroups").length) {
				$("#_ip_job_paygroups").select2({
					placeholder: "Select paygroups",
				});
			}
			$(".__jobs-page").on("click", function (e) {
				console.log("abc", e.target);
				let field_focus = $(e.target).closest(".form-group.is-field-focus");
				let is_field_focus = field_focus.length;
				console.log($(e.target), field_focus, is_field_focus);
				if ($(e.target).hasClass('select2-selection__choice__remove')) return;

				if (!is_field_focus) {
					console.log("focus");

					_updateFieldData();
					$('.form-group.is-field-focus').find(".view-wrap").show();
					$('.form-group.is-field-focus').find(".edit-field").hide();
					$('.form-group.is-field-focus').removeClass('is-field-focus');
				}
			});

			editJobs();
			editFieldJobs();
			saveJobs();
		},
	};
})();

// Initialization
jQuery(document).ready(function () {
	Jobs.init();
});

