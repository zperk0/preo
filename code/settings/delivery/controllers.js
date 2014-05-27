
angular.module('delivery.controllers',[]).
  controller('deliveryController', function($scope,$http,Resources,$q, VENUE_ID) {
  	$scope.selected =2;    
    $scope.triedSubmit = false;
    var placeholderMessages = {
        notify : [
        {         
            content:_tr("Your order is running 15 mins late"),
            name:_tr("Late Order")
        },
        {
            content:_tr("Your order is on its way"),
            name:_tr("En-route")   
        },
        {          
            content:_tr("There is a problem with your order. Please call us"),
            name:_tr("Call us")
        }
    ],
    reject:[
        {
            content:_tr("Your address is out of our delivery zone"),
            name:_tr("Out of zone")   
        },
        {
            content:_tr("Sorry, that item is out of stock"),
            name:_tr("Out of stock")   
        },
        {
            content:_tr("Sorry, Your order has been rejected. Please call us"),
            name:_tr("Call us")   
        }
    ]};
    
    //get venue object
    var venue = Resources.Venue.get({id:VENUE_ID},function(result){        
    	$scope.venue = result;    	    	
    },function(err){ console.log("error",arguments)});   

    var venueSettings = Resources.VenueSettings.get({id:VENUE_ID},function(result){        
        $scope.venueSettings = result;              
    },function(err){ console.log("error",arguments)});   

    var venueMessages = Resources.VenueMessages.query({venueId:VENUE_ID},function(messages){                                
        $scope.messages = {
            notify:[],
            reject:[],
        }
        var notifications = 0;
        var rejects = 0;        

           for (var i=0;i<6;i++){
            if (messages.length>i){                
                var message = messages[i];
                
                if (message.type == "PUSH_NOTIFY"){                    
                    $scope.messages.notify.push(message)
                    notifications++;          
                } else{
                    $scope.messages.reject.push(message)
                    rejects++;
                }
            } else {                
                if (notifications < 3){
                    var vm = new Resources.VenueMessages({
                        name:"",
                        content:"",
                        type:"PUSH_NOTIFY",
                        active:0
                        
                    });                    
                    notifications++;          
                    $scope.messages.notify.push(vm)
                } else {
                    var vm = new Resources.VenueMessages({
                        name:"",
                        content:"",
                        type:"PUSH_REJECT",
                        active:0
                    })   
                    rejects++;
                    $scope.messages.reject.push(vm)
                }
                                
            }
        }
    },function(err){ console.log("error",arguments)});   

    $scope.validateMessage = function(message){    
        return Boolean(message.content) ? !Boolean(message.name) : Boolean(message.name);
    }

    $scope.validateActive = function(message){        
        if (message && message.name && message.content){
            if (message.name.trim() === "" && message.content.trim() === ""){
                message.active = 0;
                return false;
            }
            return true;
        }
        message.active = 0;
        return false;
    }


    $scope.processForm = function() {
        $scope.triedSubmit = true;
        if (!$scope.deliveryForm.$valid) {
            noty({
              type: 'error',  layout: 'topCenter',
              text: _tr("Sorry, we need more information, please check if you have filled all the required fields.") /*text: 'Connection Error! Check API endpoint.'*/
            });
            return false;
        };
        
        //FIXME
        //there's no typestring in the db, if we send this param it crashes
        //not sure why we're receiving both type and typestring here as they seem to be the same.                
        var messages = $scope.messages.reject.concat($scope.messages.notify);
        for (var msg in messages){
            delete messages[msg]["typeString"];            
        }

        $q.all([
            venueSettings.$patch({id:VENUE_ID}),
            postMessage(messages[0]),
            postMessage(messages[1]),
            postMessage(messages[2]),
            postMessage(messages[3]),
            postMessage(messages[4]),
            postMessage(messages[5])
        ])
        .then(function(results){
            console.log(results)
            noty({
              type: 'success',  layout: 'topCenter',
              text: _tr("Successfully saved delivery settings.") /*text: 'Connection Error! Check API endpoint.'*/
            });
                        
        });
        

	};
    $scope.getPlaceholder = function(which,index){
        return placeholderMessages[which][index];
    }

    function postMessage(message){
        //if the message is on the database
        if (message.id){
            //if it is not blank, update it, 
            if (message.name.trim() !== "" && message.content.trim() !== "") {
                return message.$put();
            }  // else delete it
            else {
                return message.$remove();
            }
        } //if it's not in the database
        else {          
            //push if the message is not blank
            if (message.name && message.name.trim() != "" && message.content && message.content.trim() !== ""){
                return message.$save({venueId:VENUE_ID});
            }
        } 
        //if we reach this point, there's nothing to be done with this message.
        return true;            
    }
    
  });