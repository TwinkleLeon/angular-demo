window.onload = function () {
    $(".loginBox button[type=button]").on("click", function () {
        $(".loginBox").fadeOut(function () {
            $(".registerBox").fadeIn(function () {
                $(".registerBox  input[type=submit]").on("click", function () {
                    var account = $("input[type=text]:nth(1)").val();
                    var psd2 = $("input[type=password]:nth(2)").val();
                    var psd1 = $("input[type=password]:nth(1)").val();
                    if (psd1 == psd2) {
                        $.ajax({
                            type: "get",
                            url: "http://127.0.0.1:9090/api/regist",
                            data: {
                                account: account,
                                password: psd2
                            },
                            success: function (x) {
                                if (x == "true") {
                                    alert("注册成功");
                                    $(".registerBox button[type=button]").trigger("click");
                                };

                            },
                            error: function (x) {
                                console.log(x);
                            }
                        })
                    } else {
                        $(".psCheack").fadeIn().fadeOut(2000);
                    }
                    return false;
                })
            });
        })
    });
    $(".loginBox button[type=submit]").on("click", function () {
        var arr = [];
        var formData = $("form").serialize().split("&").forEach(function (value, index) {
            arr[index] = value.split("=")[1];
        });
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/login",
            data: {
                uname: arr[0],
                upwd: arr[1]
            },
            success: function (x) {
                if (x == "true") {
                    alert("登陆成功");
                    window.name = arr[0]+"&"+arr[1];
                    window.location.href="frontEnd.html"
                } else {
                    alert("用户名或者密码错误");
                    $("input").val("");
                }
            },
            error: function (x) {
                console.log(x);
            }
        })
        return false;
    });
    $(".registerBox button[type=button]").on("click", function () {
        $(".registerBox").fadeOut(function () {
            $(".loginBox").fadeIn(function () {});
        })
    });
}