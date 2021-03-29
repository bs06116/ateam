"use strict";
var Jobs = function() {
    var e = function() {
        let e = $('input[name="_ip_job_name"]').val()
          , o = $('[name="_ip_job_des"]').val()
          , t = ($('[name="_ip_job_pm"]').val(),
        $('[name="_ip_job_pm"] option:selected').text())
          , i = ($('[name="_ip_job_pf"]').val(),
        $('[name="_ip_job_pf"] option:selected').text())
          , s = $('input[name="_ip_job_num_employees"]').val()
          , n = $('[name="_ip_job_cost_codes"]').select2("data").map(function(e, o, t) {
            return '<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' + e.text + "</span> "
        }).join("")
          , a = $('[name="_ip_job_paygroups"]').select2("data").map(function(e, o, t) {
            return '<span class="kt-badge kt-badge--primary  kt-badge--inline kt-badge--pill">' + e.text + "</span> "
        }).join("");
        $("._op_job_name").html(e),
        $("._op_job_des").html(o),
        $("._op_job_pm").html(t),
        $("._op_job_pf").html(i),
        $("._op_job_num_employees").html(s),
        $("._op_job_cost_codes").html(n),
        $("._op_job_paygroups").html(a)
    };
    return {
        init: function() {
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
                            text: "The application has been successfully submitted!",
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
    KTWizard1.init()
});
