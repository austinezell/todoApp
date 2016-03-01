"use strict";

app.controller('mainCtrl', function($scope, Todo) {
  angular.element(document).ready(function() {
    $(document).foundation();
  })
  $scope.task = {};
  $scope.location = {};

  let d = new Date();
  let y = d.getFullYear();
  let m = d.getMonth() < 10 ? `0${d.getMonth()+1}` : d.getMonth() + 1;
  let day = d.getDate();
  $scope.today = `${y}-${m}-${day}`;

  $scope.populate = function() {
    Todo.getAll($scope.location.name)
    .then(function(response) {
      let todos = response.data.map((todo)=>{
        todo.datePosted = new Date(todo.datePosted);
        if(todo.deadline) todo.deadline = new Date(todo.deadline);
        if(todo.dateCompleted) todo.dateCompleted = new Date(todo.dateCompleted);
        return todo;
      })
      $scope.todos = todos;
    })
  }

  $scope.addTask = function(task) {
    Todo.addTask(task)
    .then(function(response) {
      $scope.populate();
      $scope.task = {};
    })
  }
  $scope.remove = function(id) {
    swal({
      title: "Are you sure?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function() {
      Todo.remove(id)
      .then(function(response) {
        $scope.populate();
        swal("Deleted!", "Todo removed", "success");
      }, function(error){
        console.log(error);
      })
    });
  }

  $scope.toggleComplete = function(todo) {
    todo.isCompleted = !todo.isCompleted;
    Todo.update(todo._id, {
      isCompleted: todo.isCompleted,
      isCompletedUpdate: true
    })
  }

  $scope.changeDeadline = (todo)=>{
    todo.deadline = todo.newDeadline;
    Todo.update(todo._id, {
      deadline: todo.deadline
    })
  }

})
