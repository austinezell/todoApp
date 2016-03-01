'use strict';
Date.prototype.toInputString = function(){
  let y = this.getFullYear();
  let m = this.getMonth() < 10 ? `0${this.getMonth()+1}` : this.getMonth() + 1;
  let day = this.getDate();
  return `${y}-${m}-${day}`
}

window.app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
  // .state('home', {
  //   url: '/',
  //   template: "<ui-view/>",
  //   controller: "mainCtrl"
  // })
  .state("tasks", {
    url: "/tasks",
    templateUrl: '/templates/todos.html',
    abstract: true,
    controller: "mainCtrl"
  })
  .state("tasks.todo", {
    url: "/todo",
    controller: function($scope, $state) {
      $scope.location.name = $state.current.name.replace('tasks.', '');
      $scope.populate();
      $scope.$apply;
    }
  })
  .state("tasks.done", {
    url: "/done",
    controller: function($scope, $state) {
      $scope.location.name = $state.current.name.replace('tasks.', '');
      $scope.populate();
      $scope.$apply;
    }
  })
  .state("tasks.all", {
    url: "/all",
    controller:  function($scope, $state){
      $scope.location.name = $state.current.name.replace('tasks.', '');
      $scope.populate();
      $scope.$apply;
    }
  })
  $urlRouterProvider.otherwise('/tasks/todo')
})

app.directive("foundationRepeat", function() {
  return function(scope, element, attrs) {
    $(element).foundation()
  }
})
