(function () {

    var app = angular.module('Tracker');

    // app.controller("AddController", ["TransactionService", "$scope", "AuthenticationService", function (TransactionService, $scope, AuthenticationService) {
    // angular.js:13550 Error: [$injector:unpr] Unknown provider: AuthenticationServiceProvider <- AuthenticationService <- AddController
    app.controller("AddController", ["TransactionService", "$scope", function (TransactionService, $scope) {

        $scope.addTransaction = function () {
            var transaction = {
                'id': TransactionService.getIncome().length + 1,
                'date': new Date($scope.newTransaction.date),
                'title': $scope.newTransaction.title,
                'price': $scope.newTransaction.price,
                'type': $scope.newTransaction.type
            };
            TransactionService.update(transaction)
            console.log("added");
            $scope.newTransaction = {};
        };

    }]);
})();
