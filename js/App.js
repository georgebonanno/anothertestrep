(function () {
    var app = angular.module('Tracker', ['ngRoute', 'chart.js']); // 'chart.js'

    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        }).when('/income', {
            templateUrl: 'income.html',
            controller: 'IncomeController'
        }).when('/expense', {
            templateUrl: 'expense.html',
            controller: 'ExpenseController'
        }).when('/add', {
            templateUrl: 'add.html',
            controller: 'AddController'
        }).when('/edit/:editTransaction', {
            templateUrl: 'edit.html',
            controller: 'EditController'
        }).otherwise({
            redirectTo: '/'
        });
    });

})();