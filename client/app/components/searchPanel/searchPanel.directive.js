
export default function searchPanel(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./searchPanel.tpl.html"),
    scope: {
      placeholder: '@',
      debounce: '=?',
      onChange: '&?',
      onDebounce: '&?',
      value: '='
    },
    replace:true,
    link: _link
  };

  let debounceTimeout = null;

  function _link(ng, el, attr, ctrl) {

    const debounceInterval = typeof ng.debounce !== 'undefined' ? ng.debounce : 500;
    let onDebounce = null;
    let oldValue = undefined;

    if (ng.onDebounce) {
      onDebounce = debounce(ng.onDebounce, debounceInterval);
    }

    ng.onKeyUp = ($event) => {

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
  }

  function debounce(func, wait, immediate) {
    return () => {
      const context = this, args = arguments;
      const later = function() {
        debounceTimeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !debounceTimeout;
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
}
