
export default class customerItemController {
  static get UID(){
    return "customerItemController"
  }

  getName() {
    return [this.customer.firstName, this.customer.lastName].join(' ');
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
