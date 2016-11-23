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
			console.log("got scope", scope);
			scope.formName = 'notificationForm'+scope.index;


			scope.debounceUpdate = function(){
				if (scope[scope.formName].$valid){
					form.saveMessage(scope.notification)
				}
			}
		}
  }
}
