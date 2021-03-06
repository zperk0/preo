
export default function faParentSuspendable(){
  "ngInject";

  return {
    restrict: 'EA',
    link: (scope) => {
      // Heads up: this might break is suspend/resume called out of order
      // or if watchers are added while suspended
      var watchers;

      scope.$on('suspend', function () {
        watchers = scope.$$watchers;
        scope.$$watchers = [];
      });

      scope.$on('resume', function () {
        if (watchers)
          scope.$$watchers = watchers;

        // discard our copy of the watchers
        watchers = void 0;
      });
    }
  };
}
