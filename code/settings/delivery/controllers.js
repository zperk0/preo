
angular.module('delivery.controllers',[]).
  controller('deliveryController', function($scope,$http,Resources,$q) {
  	$scope.selected =2;    
    $scope.triedSubmit = false;
    var placeholderMessages = {
        notify : [
        {         
            content:tr_("Your order is running 15 mins late"),
            name:tr_("Late Order")
        },
        {
            content:tr_("Your order is on its way"),
            name:tr_("En-route")   
        },
        {          
            content:tr_("There is a problem with your order. Please call us"),
            name:tr_("Call us")
        }
    ],
    reject:[
        {
            content:tr_("Your address is out of our delivery zone"),
            name:tr_("Out of zone")   
        },
        {
            content:tr_("Sorry, that item is out of stock"),
            name:tr_("Out of stock")   
        },
        {
            content:tr_("Sorry, Your order has been rejected. Please call us"),
            name:tr_("Call us")   
        }
    ]};
    
    //get venue object
    var venue = Resources.Venue.get({id:phpSession.venue_id},function(result){        
    	$scope.venue = result;    	    	
    },function(err){ console.log("error",arguments)});   

    var venueSettings = Resources.VenueSettings.get({id:phpSession.venue_id},function(result){        
        $scope.venueSettings = result;              
    },function(err){ console.log("error",arguments)});   

    var venueMessages = Resources.VenueMessages.query({venueId:phpSession.venue_id},function(messages){                                
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
                        active:0,  
                        placeholder : placeholderMessages.notify[notifications]
                    });                    
                    notifications++;          
                    $scope.messages.notify.push(vm)
                } else {
                    var vm = new Resources.VenueMessages({
                        name:"",
                        content:"",
                        type:"PUSH_REJECT",
                        active:0, 
                        placeholder : placeholderMessages.reject[rejects]
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
            venueSettings.$patch({id:phpSession.venue_id}),
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
                return message.$put({venueId:phpSession.venue_id});
            }  // else delete it
            else {
                return message.$remove({venueId:phpSession.venue_id});
            }
        } //if it's not in the database
        else {          
            //push if the message is not blank
            if (message.name && message.name.trim() != "" && message.content && message.content.trim() !== ""){
                return message.$save({venueId:phpSession.venue_id});
            }
        } 
        //if we reach this point, there's nothing to be done with this message.
        return true;            
    }
    
  });