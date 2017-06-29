(function (angular) {
    var app = angular.module("psd", []);
    app.controller("psdCtrl", ["$scope", "$http", "$window", function ($scope, $http, $window) {
        $scope.uname = $window.name.split("&")[0];
        $scope.change = function () {
            console.log($scope.oldPsd)
            console.log($scope.newPsd)
            $http({
                url: "http://127.0.0.1:9090/api/updatapwd",
                method: "get",
                params: {
                    account: $scope.uname,
                    password: $scope.oldPsd,
                    updatapwd: $scope.newPsd
                }
            }).then(function (x) {
                if (x.data == "true") {
                    alert("修改成功");
                    $window.name = "";
                    $window.location.href = "index.html";
                }
            }).catch(function (x) {
                console.log(x);
            });
        }
    }])
})(angular)