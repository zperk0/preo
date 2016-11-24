export default function notification(){
  return {
	restrict: 'E',
		scope: {
			notification:"=",
			index:"@"
		},
		template: require("./notification.tpl.html"),
		replace:true,
		require: '^notificationsForm',
		link: (scope, el, attr, form) => {
			scope.debounceUpdate = function(){
				if (scope.notifyForm.$valid){
					form.saveMessage(scope.notification)
				}
			}
		}
  }
}
