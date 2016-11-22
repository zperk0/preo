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
			scope.formName = 'notification-form-'+scope.index;


			scope.debounceUpdate = function(){
				form.saveMessage(scope.notification)
			}
		}
  }
}
