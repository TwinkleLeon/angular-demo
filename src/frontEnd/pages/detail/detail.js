(function (angular) {
    var app = angular.module("detail", []);
    app.controller("detailCtrl", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $scope.getDate = function (time) {
            time = Number(time);
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            return year + "-" + month + "-" + day;
        };
        $http({
            url: "http://127.0.0.1:9090/api/webgetsinglenews",
            params: {
                timestamp: $routeParams.timestamp
            }
        }).then(function (x) {
            x.data[0].content = x.data[0].content.match(/[\u4e00-\u9fa5]*-?[1-9]\d*[\u4e00-\u9fa5]*/g).join("");
            $scope.data = x.data[0];
            console.log(x.data[0].content);
        }).catch(function (x) {
            console.log(x);
        });
        $http({
            url: "http://127.0.0.1:9090/api/webgetrandnews"
        }).then(function (x) {
            x.data.forEach(function(value,index){
                value.chuo = value.date;
                value.date = $scope.getDate(value.date);
            });
            $scope.list = x.data;
        }).catch(function (x) {
            console.log(x);
        });
    }])
})(angular)