(function () {
    var app = angular.module('Tracker');

    app.service("TransactionService", ["$http", "$q", function ($http, $q) {
        var apiUrl = "http://localhost:3000/transactions";
        this.income = [];
        this.expense = [];

        this.getIncome = function () {
            var self = this;
            var dfr = $q.defer();
            //if (self.income.length > 0) {
            //    dfr.resolve(self.income);
            // } else {
            $http.get(apiUrl + "?type=income")
                .success(function (response) {
                    self.income = response;
                    dfr.resolve(self.income);
                })
                .error(function (data, status, error, config) {
                    dfr.reject({heading: "Error", description: "Could not load json data"});
                });
            // }
            return dfr.promise;
        }

        this.getExpense = function () {
            var self = this;
            var dfr = $q.defer();
            $http.get(apiUrl + "?type=expense")
                .success(function (response) {
                    self.expense = response;
                    dfr.resolve(self.expense);
                })
                .error(function (data, status, error, config) {
                    dfr.reject({heading: "Error", description: "Could not load json data"});
                });
            return dfr.promise;
        }

        this.destroy = function (transactionId, type) {
            var self = this;
            var dfr = $q.defer();
            //if (self.income.length > 0) {
            //    dfr.resolve(self.income);
            // } else {
            $http.delete(apiUrl + "/" + transactionId)
                .success(function (response) {
                    switch (type) {
                        case 'income':
                            self.income = self.income.filter(function (income) {
                                return income.id !== transactionId;
                            })
                            dfr.resolve(self.income);
                            break;
                        case 'expense':
                            self.expense = self.expense.filter(function (expense) {
                                return expense.id !== transactionId;
                            })
                            dfr.resolve(self.expense);
                            break;
                    }
                })
                .error(function (data, status, error, config) {
                    dfr.reject({heading: "Error", description: "Could not load json data"});
                });
            // }
            return dfr.promise;
        }

        this.update = function (transaction) {
            $http({
                method: 'POST',
                url: apiUrl,
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
                    console.log(response);
                },
                function (errorResponse) {
                    console.log("error: " + errorResponse);
                }
            );
        }
    }]);
})();