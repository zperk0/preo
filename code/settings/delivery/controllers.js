

angular.module('app.controllers',[]).
  controller('driversController', function($scope,$http,Venue) {
  	$scope.selected =2;
    $scope.nameFilter = null;

    Venue.query({action:"message"},function(result){
            console.log("message",result);
    	$scope.venue = result;    	
    	var venueMessages = result.messages;
        $scope.notifyMessages = [];
        $scope.rejectMessages = [];
        angular.forEach(venueMessages,function(msg){
            if (msg.type == "PUSH_NOTIFY"){
                msg.type = "ORDER_NOTIFY"
                $scope.notifyMessages.push(msg);
            } else {
                msg.type = "ORDER_REJECT"
                $scope.rejectMessages.push(msg);
            }
        }); 
        console.log($scope.notifyMessages);
    },function(err){ console.log("error",arguments)});   

    $scope.processForm = function() {
    	console.log("processings");
    
    	$http({
	        method  : 'POST',
	        url     : 'saveDelivery',
	        data    : $scope.venue 
	    }).success(function(data) {
            console.log("data",data);
            location.reload(); 
        });

	};

  });