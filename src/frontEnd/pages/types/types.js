(function (angular) {
    var app = angular.module("type", []);
    app.controller("typeCtrl", ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
        $scope.getDate = function (time) {
            time = Number(time);
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            return year + "-" + month + "-" + day;
        };
        $routeParams.type = $routeParams.type || "资讯新闻";
        $scope.leixin =  $routeParams.type;
        $http({
            url: "http://127.0.0.1:9090/api/webgetkeynews",
            params: {
                category: $routeParams.type,
                page: 1
            }
        }).then(function (x) {
            x.data.forEach(function (value, index) {
                value.chuo = value.date
                value.imgArr = value.imgArr.match(/[a-zA-z]+:[^\s]*\.jpg/);
                value.date = $scope.getDate(value.date);
            });
            $scope.data = x.data;
        }).catch(function (x) {
            console.log(x);
        });
        // $scope.check = function (chuo) {
        //     chuo = Number(chuo);
        //     console.log(chuo);
        //     $http({
        //         url: "http://127.0.0.1:9090/api/webgetsinglenews",
        //         params: {
        //             timestamp: chuo
        //         }
        //     }).then(function (x) {
        //         console.log(x);
        //     }).catch(function (x) {
        //         console.log(x);
        //     });
        // }
    }]);
})(angular)