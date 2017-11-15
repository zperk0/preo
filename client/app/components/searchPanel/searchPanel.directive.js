
export default function searchPanel($timeout) {
  "ngInject";
  return {
    restrict: 'E',
    template: require("./searchPanel.tpl.html"),
    scope: {
      placeholder: '@',
      debounce: '=?',
      onChange: '&?',
      onDebounce: '&?',
      onClear: '&?',
      value: '='
    },
    replace:true,
    link: _link
  };

  function _link(ng, element, attr, ctrl) {

    const debounceInterval = typeof ng.debounce !== 'undefined' ? ng.debounce : 500;
    let onDebounce = null;
    let oldValue = undefined;
    const $input = element.find('input');

    if (ng.onDebounce) {
      onDebounce = debounce(ng.onDebounce, debounceInterval);
    }

    ng.onKeyUp = _onKeyUp;
    ng.clear = _clear;

    const onRemoveFocus = ng.$on('searchPanel:removeFocus', () => {
      $input.blur();
    });

    ng.$on('$destroy', () => {
      onRemoveFocus && onRemoveFocus();
    });

    function _onKeyUp($event) {

      if (oldValue === ng.value) {
        return;
      }

      ng.onChange && ng.onChange({
        value: ng.value
      });

      onDebounce && onDebounce({
        value: ng.value
      });

      oldValue = ng.value;
    };

    function _clear() {
      ng.value = '';
      $input.val('');
      $input.blur();

      ng.onClear && ng.onClear();
    }
  }

  function debounce(func, wait, immediate) {
    let timeout = null;

    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      $timeout.cancel(timeout);
      timeout = $timeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };
}
