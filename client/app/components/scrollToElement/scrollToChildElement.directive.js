
export default function scrollToChildElement($document, $timeout) {
  "ngInject";

  return {
    restrict: 'A',
    scope: {
      scrollToChildElement: '=?',
      scrollToChildElementOffset: '=?',
      scrollOnInit: '@'
    },
    link: (ng, element, attrs) => {

      function _scroll(elementSelector) {
        if (elementSelector) {
          console.log('scrollToChildElement - getting this element', elementSelector);
          const $childElement = $document[0].querySelector(elementSelector);
          if ($childElement) {
            element.scrollToElement($childElement, ng.scrollToChildElementOffset)
          }
        }
      }

      if (attrs.scrollOnInit !== 'false') {
        _scroll(ng.scrollToChildElement);
      } else {
        const scrollWatch = ng.$on('$scrollToChildElement', (event, selector) => {
          _scroll(selector);
        });

        ng.$on('$destroy', () => {
          scrollWatch && scrollWatch();
        });
      }
    }
  };
}