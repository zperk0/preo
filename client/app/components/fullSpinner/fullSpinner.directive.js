export default function fullSpinner(Spinner){
  "ngInject";

  return {
    restrict: 'E',
    scope: {

    },
    template: require("./fullSpinner.tpl.html"),
    link: (scope, el, attrs) => {

      scope.service = Spinner;

      // we needed to remove the watcher for Spinner.isVisible here because it doesn't works when the user is in another tab
      // see here for reference: https://github.com/angular-ui/bootstrap/issues/5498
      scope.isVisible = () => {
        return Spinner.isVisible;
      }

      scope.getClass = () => {
        return Spinner.visibleCodes.join(';');
      };

    }
  }
}
