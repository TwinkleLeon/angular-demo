(function(angular){
    var app = angular.module("myApp", ["ngRoute","add","edit","psd"]);
    app.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/addNews", {
            templateUrl: "./pages/addnews/addNews.html",
            controller:"addCtrl"
        }).when("/editNews/:index?", {
            templateUrl: "./pages/editNews/editNews.html",
            controller:"editCtrl"
        }).when("/psdNews", {
            templateUrl: "./pages/psdNews/psdNews.html",
            controller:"psdCtrl"
        });
    }]);
})(angular)