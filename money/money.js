var stockApp = angular.module('StockApp', ['ui.bootstrap']);

stockApp.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

stockApp.controller('StockController', function($scope, $http) {
	var tickers = ['BAC', 'CPA', 'DDD', 'LINE', 'MOBI', 'NOK'];
	
	getData(tickers);
	function getData(ticker) {
		if (ticker.length > 0) {
			var queryString = ticker.join(',');
			$scope.mystock = [];
		 	$http.jsonp("https://query.yahooapis.com/v1/public/yql", 
		 		{
		 			params: {
		 				q: "select * from yahoo.finance.quotes where symbol in ('" + queryString + "') ",
		 				format: "json",
		 				env: "http://datatables.org/alltables.env",
		 				callback: "JSON_CALLBACK"
		 			}
		 		}
		 	).success(function(data) {
		 			$scope.mystock = data.query.results.quote;
		 		}
		 	).error(function(data) {
		 			$scope.error = 'No Data from the Request';
		 		}
		 	);
	 	} else {
	 		$scope.error = 'Invalid param for getData function';
	 	}
	}
});