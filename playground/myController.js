var myDirectives = angular.module('myDirectives', []);


myDirectives.directive('mySearchbox', function () {
	return {
		restrict: 'E',
		scope: {
			searchText: '=',
			placeholder: '@',
			usedLucky: '='
		},
		template: 
			'<div>' + 
			'	<input type="text" ng-model="tempSearchText" placeholder="{{placeholder}}">' +
			'	<button ng-click="searchClicked()">' +
			'		Search' +
			'	</button>' +
			'	<button ng-click="luckyClicked()">' +
			'		I\'m feeling lucky' +
			'	</button>' +
			'</div>',
		link: function(scope, element, attrs) {
			
			scope.searchClicked = function() {
				scope.searchText = scope.tempSearchText;
				scope.usedLucky = false;

				console.log(scope);
				
			}
			scope.luckyClicked = function() {
				scope.searchText = scope.tempSearchText;
				scope.usedLucky = true;
				console.log(scope);
			}
		}
	}
});


var demoApp = angular.module('demoApp', ['myDirectives']);

var something = null;
console.log(something);