(function () {

    var app = angular.module('Tracker');

    app.controller("IncomeController", ["TransactionService", "$scope", "$window", function (TransactionService, $scope, $window) {

        $scope.transactions = [];

        TransactionService.getIncome().then(function (transactions) {
                $scope.transactions = transactions;
            },
            function (error) {
                console.log("error: " + error);
            });

        $scope.deleteTransaction = function (transaction) {
            TransactionService.destroy(transaction.id, transaction.type);
        };

        $scope.editTransaction = function (transaction) {
            transaction.date = new Date(transaction.date);
            $window.location.href = 'http://localhost:1234/#/edit/' + JSON.stringify(transaction);
        };

        $scope.$watchCollection(function () {
            return TransactionService.income;
        }, function (newValue, oldValue) {
            $scope.transactions = newValue;
        });

    }]);
})();
