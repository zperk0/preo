
export default function contentRightResize($document, $window, $timeout, BroadcastEvents, NavbarService) {
  "ngInject";

  return {
    restrict: 'A',
    link: (ng, element, attrs) => {

      function _getNavBarExpandedWidth() {
        return windowWidth <= 1280 ? navBarWidthMD : navBarWidthLG;
      }

      function _getWindowWidth() {

        const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        return width;
      }

      function _getNavbarWidth() {
        return !NAVBAR_EXPANDED ? navBarWidthClosed : _getNavBarExpandedWidth();
      }

      function _updateElementSize(shouldKeepTransition) {
        layoutLeftRightWidth = $mainUIView.offsetWidth - _getNavbarWidth() - scrollBarWidth;

        const contentRightWidth = (layoutLeftRightWidth / 2) - 32;

        // console.log('contentRightResize - navBarWidth', navBarWidthLG);
        // console.log('contentRightResize - layoutLeftRightWidth', layoutLeftRightWidth);
        // console.log('contentRightResize - contentRightWidth', contentRightWidth);
        // console.log('contentRightResize - windowWidth', windowWidth);

        if (!shouldKeepTransition) {
          element.addClass('disable-transition');
        }
        // element.removeClass('disable-transition');
        element.css('maxWidth', contentRightWidth + 'px');
      }

      function _resizeWindow() {
        windowWidth = _getWindowWidth();
        _updateElementSize();
      }


      const _document = $document[0];
      const _window = angular.element($window);

      const $navBar = _document.querySelector('.md-sidenav-left');
      const $mainUIView = _document.querySelector('.main-ui-view');
      const scrollBarWidth = 15;
      const navBarWidthLG = 320;
      const navBarWidthMD = 248;
      const navBarWidthClosed = 72;

      let windowWidth = _getWindowWidth();
      let NAVBAR_EXPANDED = NavbarService.isExpanded();
      let layoutLeftRightWidth = null;

      _updateElementSize();


      const onNavbarToggle = ng.$on(BroadcastEvents._ON_NAVBAR_TOGGLE, (event, expanded) => {

        element.removeClass('disable-transition');
        NAVBAR_EXPANDED = expanded;

        _updateElementSize(true);
      });


      _window.on('resize', _resizeWindow);

      ng.$on('$destroy', () => {

        _window.off('resize', _resizeWindow);
        onNavbarToggle && onNavbarToggle();
      });

    }
  };
}