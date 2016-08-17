
export default function croppie($compile, $timeout){
	'ngInject';
  return {
	restrict: 'E',
		scope: {
			src: '=',
	    viewport: '=',
	    boundry: '=',
	    update: '&?',
		},
		link: (scope, el, attr) => {


                // convert string to Boolean
                var zoom = (scope.zoom === "true"),
                    mouseZoom = (scope.mousezoom === "true");


                scope.onUpdate = ()=> {
                  c.result({
                    type:'canvas',
                    size:'viewport',
                    quality:0.9,
                  }).then(function(img){
                      scope.ngModel = img
                      if(scope.update){
                        scope.update({img:img});
                      }
                  });
                }
                                // define options
                var options =  {
                    viewport: {
                      width: scope.viewport.w,
                      height: scope.viewport.h,
                      type: 'square'
                    },
                    boundary: {
                      width: scope.boundry.w,
                      height: scope.boundry.h
                    },
                    update:scope.onUpdate,
                    showZoom: true,
                    mouseWheelZoom: true,
                }


                // create new croppie and settime for updates
                var c = new Croppie(el[0], options);
                // respond to changes in src
                scope.$watch('src', function(newValue, oldValue) {
                  if(scope.src != undefined){
                      $timeout(()=>{
                        c.bind(scope.src);
                      })
                  }
              })


        }
  }
}
