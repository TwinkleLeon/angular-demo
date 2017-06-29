(function (angular) {
    var app = angular.module("myApp", ["ngRoute","type","detail"]);
    app.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/:type?", {
            templateUrl: "./pages/types/types.html",
            controller: "typeCtrl"
        }).when("/detail/:timestamp", {
            templateUrl: "./pages/detail/detail.html",
            controller: "detailCtrl"
        });
    }]);
    app.controller("indexCtrl", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        // var $ = function (ele) {
        //     return angular.element(document.querySelector(ele));
        // };
        // $scope.click = function ($event) {
        //         // $event.target为当前事件DOM对象，需要在页面中传入，这边才可以接收
        //         $($event.target).parent().children().removeClass("active");
        //         $($event.target).addClass("active");
        //         console.log($($event.target))
        // };
    }]);
})(angular);