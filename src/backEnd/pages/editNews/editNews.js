(function (angular) {
    var app = angular.module("edit", ["ngRoute"]);
    app.controller("editCtrl", ["$scope", "$http", "$window", "$routeParams", "$route", function ($scope, $http, $window, $routeParams, $route) {
        var index = $routeParams.index ? $routeParams.index : 1;
        $scope.uname = $window.name.split("&")[0];
        $scope.isShow = false;
        $scope.changeData = {};
        $http({
            url: "http://127.0.0.1:9090/api/getnews",
            method: "get",
            params: {
                uname: $scope.uname,
                page: index
            }
        }).then(function (x) {
            $scope.data = x.data;
            $scope.arr = [];
            $scope.count = $window.Math.ceil(x.data.totalLength / 5);
            for (var i = 0; i < $scope.count; i++) {
                $scope.arr[i] = i;
            };
        }).catch(function (x) {
            console.log(x);
        });
        $scope.search = function () {
            $http({
                url: "http://127.0.0.1:9090/api/getkeynews",
                method: "get",
                params: {
                    uname: $scope.uname,
                    page: index,
                    keys: $scope.keyWord
                }
            }).then(function (x) {
                $scope.data = x.data;
                $scope.arr = [];
                $scope.count = $window.Math.ceil(x.data.totalLength / 5);
                for (var i = 0; i < $scope.count; i++) {
                    $scope.arr[i] = i;
                };
            }).catch(function (x) {
                console.log(x);
            });
        };
        $scope.pre = function () {
            index--;
            if (index == 0) {
                index = 1;
            };
            $route.updateParams({
                index: index
            });
        };
        $scope.next = function () {
            index++;
            if (index == $scope.count + 1) {
                index = $scope.count;
            };
            $route.updateParams({
                index: index
            });
        };
        $scope.edit = function (date) {
            $http({
                url: "http://127.0.0.1:9090/api/getchangenews",
                method: "get",
                params: {
                    uname: $scope.uname,
                    timestamp: date
                }
            }).then(function (x) {
                //异步显示编辑器
                $scope.editShow(x.data[0].content+x.data[0].imgArr);
                $scope.isShow = true;
                $scope.changeData = x.data[0];
            }).catch(function (x) {
                console.log(x);
            });
        };
        $scope.del = function (date) {
            $http({
                url: "http://127.0.0.1:9090/api/deletenews",
                method: "get",
                params: {
                    uname: $scope.uname,
                    timestamp: date
                }
            }).then(function (x) {
                $window.location.reload();
            }).catch(function (x) {
                console.log(x);
            });
        };
        $scope.editShow = function (content) {
            $.getScript('./js/kindeditor-4.1.10/kindeditor-min.js', function () {
                KindEditor.basePath = './js/kindeditor-4.1.10/';
                var option = {
                    filterMode :false,
                    designMode:true
                };
                $window.editor = KindEditor.create('#editor_id',option);
                $window.editor.html(content);
                $window.editor.sync();
            });
        };
    }])
})(angular)