export default function styleEditor(PreoElementService){
  "ngInject";
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl) {
        var tooltipSpan,
              x,
              y;
        if (window.isEditor){
          el.addClass('tooltip-holder');
          //Find the element which will contain tooltip
            tooltipSpan = angular.element(el[0].querySelector('.tooltip-span'));
            //Bind mousemove event to the element which will show tooltip
            var clone = false;
            el.bind('mouseenter', function(e) {
              clone = tooltipSpan.clone();
              angular.element(document.body).append(clone);
              clone[0].style.opacity = 1;
              clone[0].style.display = 'block';
            })
            el.bind('mousemove', function(e) {
                if (!clone)
                  return;
                //find X & Y coodrinates
                x = e.clientX,
                y = e.clientY;

                var offset = 20;
                // var rect = this.getClientRects()[0];
                var rect = {
                  top:0,
                  left:0
                };
                console.log(y, rect.top)
                var top = y - rect.top + offset;
                var left = x - rect.left - clone[0].getClientRects()[0].width/2;
                //Set tooltip position according to mouse position
                clone[0].style.top = top + 'px';
                clone[0].style.left = left + 'px';
            });

            el.bind('mouseleave', function(e) {
              if (clone){
                clone.remove();
              }
            })

        }
      }
    };
}
