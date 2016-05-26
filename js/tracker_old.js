(function () {
    var app = angular.module('Tracker', ['ngRoute', 'chart.js']); // 'chart.js'

    app.controller('TrackerController', ['$http', '$scope', function ($http, $scope) {

        this.isEdit = false;
        this.page = "all";

        this.load = function () {
            console.log("load");
            var that = this;
            $http.get('db.json')
                .success(function (data) {
                    console.log("success");
                    that.transactions.length = 0;
                    data.transactions.forEach(function (transaction) {
                        that.transactions.push(transaction);
                    });
                })
                .error(function (data, status, error, config) {
                    console.log("error");
                    that.contents = [{heading: "Error", description: "Could not load json data"}];
                });
        };

        this.transactions = [];
        this.load();

        this.save = function () {
            this.transactions.forEach(function (transaction) {
                console.log("save: " + transaction.id);
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/transactions',
                    data: {
                        "id": transaction.id,
                        "date": transaction.date,
                        "title": transaction.title,
                        "price": transaction.price,
                        "type": transaction.type
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    function (response) {
                        this.output = response.data.body;
                        // console.log(response);
                    },
                    function (errorResponse) {
                        console.log("error: " + errorResponse);
                    }
                );
            });
        }

        this.add = function () {
            this.newTransaction.id = this.transactions.length + 1;
            console.log("add: " + this.newTransaction.id);
            this.newTransaction.type = this.page;
            this.transactions.push(this.newTransaction);
            this.newTransaction = {};
            this.save();
        };

        this.delete = function (transaction) {
            console.log("delete: " + transaction.id);
            var that = this;
            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/transactions/' + transaction.id,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    var indexOf = that.transactions.indexOf(transaction);
                    if (indexOf !== -1) {
                        that.transactions.splice(indexOf, 1);
                    }
                },
                function (errorResponse) {
                    console.log("error: " + errorResponse);
                }
            );
        };

        this.edit = function (transaction) {
            console.log("edit: " + transaction.id);
            var indexOf = this.transactions.indexOf(transaction);
            console.log("transaction indexOf: " + indexOf);
            console.log("transaction transaction.title: " + transaction.title);
            if (indexOf !== -1) {
                this.newTransaction = [];
                this.newTransaction.id = transaction.id;
                this.newTransaction.date = transaction.date;
                this.newTransaction.title = transaction.title;
                this.newTransaction.price = transaction.price;
                this.newTransaction.type = transaction.type;
                this.isEdit = true;
            }
        };

        this.update = function () {
            console.log("update: " + this.newTransaction.id);
            if (this.newTransaction.id !== -1) {
                this.transactions[this.newTransaction.id - 1] = this.newTransaction;
            }
            this.newTransaction = {};
            this.save();
            this.isEdit = false;
        }

        this.getBalance = function () {
            var balance = 0;
            this.transactions.forEach(function (transaction) {
                if (transaction.type === 'expense') {
                    balance += (-1 * transaction.price);
                } else {
                    balance += (1 * transaction.price);
                }
            })
            return Math.round(balance * 100) / 100
        }

    }]);

})();