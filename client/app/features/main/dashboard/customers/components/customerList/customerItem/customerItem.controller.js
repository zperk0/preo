
export default class customerItemController {
  static get UID(){
    return "customerItemController"
  }

  isSelected() {
  	return this.customer &&
  					(+this.customer.id === +this.$stateParams.customerId) ||
  					(!this.customer.id && !this.$stateParams.customerId);
  }

  constructor($stateParams) {
  	"ngInject";

  	this.$stateParams = $stateParams;
  }
}
