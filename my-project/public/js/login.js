function regist() {
    $.ajax({
        url: "/users/regist",
        type: "post",
        data: {
            username: $("#username").val(),
            psw: $("#psw").val(),
            email: $("#email").val(),
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            if (res.code != 1) {
                alert(res.message);
                return;
            }
            $("#myRegist").modal("hide");
            // 弹出登录框
            $("#myLogin").modal("show");
            $("#username_l").val($("#username").val())
            $("#psw_l").val($("#psw").val())
        }
    })
}

function login() {
    $.ajax({
        url: "/users/login",
        type: "post",
        data: {
            username: $("#username_l").val(),
            psw: $("#psw_l").val()
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            if (res.code != 1) {
                alert(res.message);
                return;
            }
            location.href = "/menu";
        }
    })
}

function addJob() {
    $("#job_id").val("");
    $("#job_title").val("");
    $("#company_name").val("");
    $("#experience").val("");
    $("#job_type").val("");
    $("#location").val("");
    $("#salary").val("");
    $("#myJob").modal("show");
}

function updateJob(a1, a2, a3, a4, a5, a6, a7) {
    $("#job_id").val(a1);
    $("#job_title").val(a2);
    $("#company_name").val(a3);
    $("#experience").val(a4);
    $("#job_type").val(a5);
    $("#location").val(a6);
    $("#salary").val(a7);
    $("#myJob").modal("show");
}

function saveJob() {
    if ($("#job_id").val()) {
        $('#frm').attr("action", "/menu/updateJob");
    } else {
        $('#frm').attr("action", "/menu/createJob");
    }
    var options = {
        dataType: "json",
        /*data: {'file': $("input[type=file]").val(), "username": '123', password: "123"},*/
        beforeSubmit: function() {
            console.log("将来设计一个loading效果");
        },
        success: function(result) {
            if (result.code != 1) {
                alert(result.message);
                return;
            }
            location.reload(true);
        },
        error: function(result) {  
            console.log("失败");
        }
    };
    $('#frm').ajaxSubmit(options);
}

function delJob(jobId) {
    if (!confirm("你是否真的要删除？")) {
        return;
    }
    $.ajax({
        url: "/menu/delJob",
        type: "post",
        data: {
            id: jobId
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            if (res.code != 1) {
                alert(res.message);
                return;
            }
            location.reload(true);
        }
    })
}

function prePage() {
    var pageNo = ($("#pageNo").val());
    --pageNo;
    if (pageNo < 1) {
        pageNo = 1;
    }
    location.href = '/menu?pageNo=' + pageNo;
}

function nextPage() {
    var pageNo = parseInt($("#pageNo").val());
    ++pageNo;
    location.href = '/menu?pageNo=' + pageNo;
}