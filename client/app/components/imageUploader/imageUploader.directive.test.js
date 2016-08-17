// 'use strict';

// import imageUploader from './';

// describe('ImageUploader Directive', function () {

//     let
//       $rootScope,
//       $compile,
//       $timeout,
//       $scope,
//       imageUploaderCtrl,
//       isolatedScope,
//       $controller,
//       CroppieService,
//       DialogService,
//       LabelService,
//       Snack,
//       UtilsService,
//       element = null;

//     beforeEach(angular.mock.module(imageUploader));

//     // beforeEach(angular.mock.module(function ($provide) {
//     //     $provide.constant('initialTodos', []);
//     // }));

//     beforeEach(angular.mock.inject(function ($injector) {

//       $rootScope = $injector.get('$rootScope');
//       $compile = $injector.get('$compile');
//       $controller = $injector.get('$controller');
//       $timeout = $injector.get('$timeout');
//       CroppieService = $injector.get('CroppieService');
//       DialogService = $injector.get('DialogService');
//       LabelService = $injector.get('LabelService');
//       UtilsService = $injector.get('UtilsService');
//       Snack = $injector.get('Snack');
//     }));

//     afterEach(function() {
//       element = null;
//     });

//     function _compileDirective() {

//       element = angular.element('<image-uploader on-change="onChange(\'logoImage\', image)" dimensions="270 x 104 px" ng-model="model.$images.logoImage"></image-uploader>');

//       $scope = $rootScope.$new();

//       _startController();

//       $compile(element)($scope);
//       $scope.$digest();

//       isolatedScope = element.isolateScope(); // access the isolated scope, used to access the functions inside the item scope
//     }

//     function _startController() {

//       imageUploaderCtrl = $controller('imageUploaderController', {
//         '$scope': $scope,
//         'onChange':function (){},
//         'dimensions':"270 x 104 px",
//         'ngModel': []
//       });

//       $scope.vm = imageUploaderCtrl;
//     }

//     function _getElementData(nativeElement) {
//       return {
//         img: nativeElement.querySelectorAll('img'),
//         placeholder: nativeElement.querySelectorAll('.placeholder'),
//         uploadSpecs: nativeElement.querySelectorAll('.upload-specs'),
//         notFound: nativeElement.querySelectorAll('.image-not-found')
//       }
//     }

//     it("Should initalize image uploader directive", function() {

//       _compileDirective();

//       var nativeElement = element[0];
//       var elemData = _getElementData(nativeElement);

//       expect(elemData.img.length).toBe(0);
//       expect(elemData.placeholder.length).toBe(1);
//       expect(elemData.notFound.length).toBe(0);
//       expect(elemData.uploadSpecs.length).toBe(1);
//     });
// });
