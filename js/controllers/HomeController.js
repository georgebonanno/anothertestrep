/**
 * Created by Andrew on 23/05/2016.
 */
(function () {

    var app = angular.module('Tracker');

    app.controller("HomeController", [
        "TransactionService", "$scope", "$window",
        function (TransactionService, $scope, $window) {

            $scope.transactions = [];
            $scope.types = ["Income", "Expense"];
            $scope.prices = [0, 0];

            TransactionService.getIncome().then(function (transactions) {
                    $scope.transactions = transactions;
                },
                function (error) {
                    console.log("error: " + error);
                });
            TransactionService.getExpense().then(function (transactions) {
                    $scope.transactions = $scope.transactions.concat(transactions);
                },
                function (error) {
                    console.log("error: " + error);
                });

            $scope.getBalance = function () {
                /*
                 var income = 0;
                 this.transactions.forEach(function (transaction) {
                 if (transaction.type === 'income') {
                 income += (1 * transaction.price);
                 }
                 })
                 var expense = 0;
                 this.transactions.forEach(function (transaction) {
                 if (transaction.type === 'expense') {
                 expense += (1 * transaction.price);
                 }
                 })
                 this.prices = [income, expense];
                 var balance = income - expense;
                 balance = Math.round(balance * 100) / 100;
                 return balance;
                 */
                return 5;
            }

        }]);
})();
