(function(window, angular){

angular.module('events')
.controller('EventsCtrl', function ($scope,EventService) {

// get all events
  var vm = this;

  function _init(){
    vm.iExist = 'hoo'; 
    _getEvents(); 
  }
  
  
  
  function _getEvents(){
    Events.get().then(function(vm){
      vm.events = events;
    })
  }




});

}(window, angular));