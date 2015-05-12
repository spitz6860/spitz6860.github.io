var stockApp = angular.module('StockApp', ['ui.bootstrap']);


stockApp.controller('StockController', function($scope, $http) {
	var tickers = ['BAC', 'CPA', 'DDD', 'LINE', 'MOBI', 'NOK'];
	
	getData(tickers);
	function getData(ticker) {
		if (ticker.length > 0) {
			var queryString = ticker.join(',');
			$scope.mystock = [];
		 	var stockRequest =  $http.jsonp("https://query.yahooapis.com/v1/public/yql", 
		 		{
		 			params: {
		 				q: "select * from yahoo.finance.quotes where symbol in ('" + queryString + "') ",
		 				format: "json",
		 				env: "http://datatables.org/alltables.env",
		 				callback: "JSON_CALLBACK"
		 			}
		 		});
		 	stockRequest.success(function(data) {
		 		$scope.mystock = data.query.results.quote;
		 	});
	 	} else {
	 		$scope.error = 'Invalid param for getData function';
	 	}
	}
});