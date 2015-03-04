var demoApp = angular.module('demoApp', []);


demoApp.controller('MyController', function ($scope) {
	$scope.names = [
		{name: 'one', age: 20},
		{name: 'two', age: 22},
		{name: 'three', age: 23},
		{name: 'four', age: 25}
	]
});