(function (angular) {
    var app = angular.module("add", []);
    app.controller("addCtrl", ["$scope", "$http", "$window", function ($scope, $http, $window) {
        $scope.formData = {};
        $scope.formData.uname = $window.name.split("&")[0];
        // $scope.editShow = function () {
        //     $.getScript('./js/kindeditor-4.1.10/kindeditor-min.js', function () {
        //         KindEditor.basePath = './js/kindeditor-4.1.10/';
        //         var option = {
        //             formatUploadUrl: false,
        //             filterMode: false
        //         }
        //         KindEditor.create('textarea[name="content"]', option);
        //         $window.editor = KindEditor.create('#editor_id');
        //         $window.editor.html('请输入内容...');
        //         $window.editor.sync();
        //         $scope.html = $window.editor.html();
        //     });
        // };
        $scope.editShow = function (content) {
            $.getScript('./js/kindeditor-4.1.10/kindeditor-min.js', function () {
                KindEditor.basePath = './js/kindeditor-4.1.10/';
                var option = {
                    filterMode: false,
                    designMode: true
                };
                $window.editor = KindEditor.create('#editor_id', option);
                $window.editor.html(content);
                $window.editor.sync();
            });
        };
        $scope.editShow("请输入内容");
        $scope.add = function () {
            $scope.html = $window.editor.html();
            var str = $scope.html;
            $scope.formData.content = str;
            //匹配img标签
            $scope.formData.imgArr = str.match(/<img\b[^>]*>/g) + "";
            $http({
                url: "http://127.0.0.1:9090/api/addnews",
                method: "post",
                data: $.param($scope.formData), //post请求的数据格式为字符串，需要用$.param序列化，转换成键值对字符串
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' //设置数据格式
                }
            }).then(function (x) {
                if (x.data == "true") {
                    alert("添加成功");
                    $window.location.reload();
                };
            }).catch(function (x) {
                console.log(x)
            })
        }
        $scope.reset = function () {
            console.log($scope.formData);
            for (var key in $scope.formData) {
                if (key != "uname") {
                    $scope.formData[key] = "";
                }
            }
        }
    }]);
})(angular)