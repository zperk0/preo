export default function styleEditor($document, $timeout, $location, $rootScope){
  "ngInject";
  return {
    restrict: 'A',
    link: (scope, el, attr, ctrl) => {
        const editorAttr = attr.styleEditor || "DEFAULT";
        const baseClass = "style-editor-enabled";
        const baseElementClass = baseClass+"-"+editorAttr;
        const eventClass = "style-editor-editing-"+editorAttr;
        const body = angular.element($document[0].body);
        function openDrawer(el){
          $timeout(()=>{
            if(editorAttr === 'mobileWallpaper' || editorAttr === 'mobileButtons') {
              $location.search('drawer-mobile-style',editorAttr);
            } else {
              $location.search('drawer-emails-style',editorAttr);
            }
          })
        };

        el[0].addEventListener('click',function(){
          openDrawer(attr)
        })
        el[0].addEventListener('mouseenter',function(){
          body.addClass(eventClass);
        })

        el[0].addEventListener('mouseleave',function(){
          body.removeClass(eventClass);
        })
        el.addClass(baseClass);
        el.addClass(baseElementClass);
    }
  }
}
