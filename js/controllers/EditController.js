(function () {

    var app = angular.module('Tracker');

    app.controller(
        "EditController",
        ["TransactionService", "$scope", "$routeParams", "$window", function (TransactionService, $scope, $routeParams, $window) {

            $scope.editTransaction = JSON.parse($routeParams.editTransaction);
            $scope.editTransaction.date = new Date($scope.editTransaction.date);

            $scope.edit = function () {
                var transaction = {
                    'id': $scope.editTransaction.id,
                    'date': $scope.editTransaction.date,
                    'title': $scope.editTransaction.title,
                    'price': $scope.editTransaction.price,
                    'type': $scope.editTransaction.type
                };
                TransactionService.update(transaction);
                $window.location.href = 'http://localhost:1234/#/' + $scope.editTransaction.type;
            };
        }]);
})();
