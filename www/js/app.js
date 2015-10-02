// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngSanitize'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })
      .state('tabs.home', {
          url: '/home',
          views: {
              'home-tab': {
                  templateUrl: 'templates/home.html',
                  controller: 'HomeController'
              }
          }
      })
      .state('tabs.top_ten_book', {
          url: '/top_ten_book',
          views: {
              'top-ten-book-tab': {
                  templateUrl: 'templates/top_ten_book.html',
                  controller: 'TopTenBookController'
              }
          }
      });
    $urlRouterProvider.otherwise('/tab/home');
})

.controller('TopTenBookController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $http.get('http://toptenbooks.net/api/v1/the_list_service').success(function (data) {
        $scope.book_title = data[0].node_title;
        $scope.body = data[0].body.replace(/img src="/g, 'img src="http://toptenbooks.net');
        //$scope.body = data[0].body;




        $scope.doRefresh = function () {
            $http.get('http://toptenbooks.net/api/v1/the_list_service').success(function (data) {
                $scope.book_title = data.node_title;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    });
}])
.controller('HomeController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $http.get('http://toptenbooks.net/api/v1/node/994').success(function (data) {
        $scope.title = data.title;
        console.log($scope.title);
        $scope.body = data.body.und[0].value.toString();
    });
}]).directive('displayBookInfo', function () {
    var displayBookInfo = {
        link: function postLink(scope, iElement, iAttrs) {
            angular.element(iElement).attr("src", "http://toptenbooks.net" + iAttrs.displayBookInfo);
        }
    }
    return displayBookInfo;
})
.directive('displayBookInfoNew', function () {
    return {
        restrict: "E",
        template: '<img src="http://toptenbooks.net/{{text}}">',
        scope: {
            text: "@text"
        }
    };
});