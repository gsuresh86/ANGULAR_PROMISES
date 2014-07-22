var app = angular.module("app", ["ngRoute"]);


//1. Router configuration and route params
app.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "home.html"
		})
		//3. Suppose if we want something to happen before the view gets loaded we can use resolve
		//   option available in route configuration
		.when("/promise", {
			templateUrl: "promise.html",
			resolve: {
				doThisBeforeViewLoads: function($q, $timeout){
					var task = $q.defer();
					var promiseOnTask = task.promise;

					$timeout(function(){
						task.resolve({
							status: "Done"
						});
					}, 10000)

					return promiseOnTask;
				}
			}
		})
		.when("/test", {
			redirectTo: "/"
		})
		.when("/about/:name", {
			templateUrl: "about.html"
		})
		.when("/redirect/:name", {

			// For this url http://localhost:8080/#/redirect:dhakchi?age=19

			redirectTo: function(routeParams, path, search) {
				console.dir(routeParams); // returns Object {name: "dhakchi"}
				console.log(path); // returns /redirect/:dhakchianandan 
				console.log(search); // returns Object {age: "10"}

				return "/"; 
			}
		})
		.otherwise({
			template: "No template found"
		});
});

app.controller("HomeCtrl", function($scope, $routeParams){
	$scope.ctrlName = "HomeCtrl";

	// $routeParams contains the hash url along with the query parameters as property in it
	console.log($routeParams);

	$scope.aboutName = $routeParams.name || "";
});


//2. Promise
app.controller("PromiseCtrl", function($scope, $q, $timeout){
	$scope.value = "Initial value";

	var task = $q.defer();

	var promiseOnTask = task.promise;

	promiseOnTask.then(function(data){
		$scope.value = data.value;
	}, function(error){
		console.error(error);
	});

	$timeout(function(){

		// Use resolve to indicate that the task is done
		task.resolve({
			value: "Final value"
		});

		// Use reject to reject the task
		// task.reject("Failed");
	}, 5000);
});