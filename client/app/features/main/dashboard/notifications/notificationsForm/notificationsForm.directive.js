import controller from './notificationsForm.controller'

export default function notificationsForm(){
  return {
	restrict: 'E',
		scope: {
			title:"@",
			notifications:"="
		},
		template: require("./notificationsForm.tpl.html"),
		controller: controller.UID,
		controllerAs: "notificationsFormCtrl",
		bindToController: true,
		replace:true,
		link: (scope, el, attr, ctrl) => {

		}
  }
}
