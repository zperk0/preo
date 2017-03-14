'use strict';

describe('contextualDrawerVenueDetails Directive', function () {

    let
      $rootScope,
      $scope,
      $compile,
      $controller,
      drawerVenueDetailsCtrl,
      isolatedScope,
      VenueService,
      
      Spinner,
      $stateParams,
     
      $timeout,
      ErrorService,     
     
      LabelService,
      server,
      $q,
      Snack,
      element = null;

      var venue = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      latitude:111,
      longitude:112,
      address1:"street 123",
      settings:new Preoday.VenueSettings({
        venueId:1
      })
    });

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $controller = $injector.get('$controller');
      VenueService = $injector.get('VenueService');

      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService'); 
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

    afterEach(function() {

      element = null;
    });

    function _compileDirective() {

      element = angular.element('<contextual-drawer-venue-details></contextual-drawer-venue-details> ');

      $scope = $rootScope.$new();

      _startController();

      $compile(element)($scope);
      $scope.$digest();

      isolatedScope = element.scope(); // access the isolated scope, used to access the functions inside the item scope
    }

    function _startController() {

      drawerVenueDetailsCtrl =  $controller('ContextualDrawerVenueDetails',  {
        '$scope': $scope,
      });
      console.log('CONTROLLERRR --', drawerVenueDetailsCtrl);
     // $scope.vm = drawerVenueDetailsCtrl;
    }

    function _getElementData(nativeElement) {

      return {
        form: nativeElement.querySelectorAll('.sidenav-wrapper md-sidenav md-card-content form')       
      }
    }

    it("Should initalize the contextDrawerVenueDetails directive", function() {

      _compileDirective();

      var nativeElement = element[0];
      var elemData = _getElementData(nativeElement);

      expect(drawerVenueDetailsCtrl).toBeDefined();
      expect(elemData.form.length).toBe(1);
    });

    it("When save success, should update service's venue", function() {
      VenueService.currentVenue = venue;
      spyOn(VenueService,'updateVenue').and.callFake(function(){return $q.resolve(venue)})

      _compileDirective();
      spyOn(angular, 'extend').and.callThrough();

      drawerVenueDetailsCtrl.venueDetailsForm = {
        $valid:true,
        $setSubmitted:function(){}
      }

      drawerVenueDetailsCtrl.doUpdate();
      $rootScope.$digest();
     // $timeout.flush();
    
      expect(angular.extend).toHaveBeenCalledWith(VenueService.currentVenue, venue);          
      expect(drawerVenueDetailsCtrl.isSaving).toBe(false);
      expect(drawerVenueDetailsCtrl.isError).toBe(false);
    });

    it("When save errors, should not update service's venue", function() {
      spyOn(VenueService,'updateVenue').and.callFake(function(){return $q.reject(venue)})
      _compileDirective();

      drawerVenueDetailsCtrl.venueDetailsForm = {
        $valid:true,
        $setSubmitted:function(){}
      }
 
      drawerVenueDetailsCtrl.doUpdate();
      $rootScope.$digest();
      $timeout.flush();
     
      expect(drawerVenueDetailsCtrl.isSaving).toBe(false);
      expect(drawerVenueDetailsCtrl.isError).toBe(true);
    });
    
});
