
export default class customersController {
  static get UID(){
    return "customersController"
  }

  /* @ngInject */
  constructor() {

		this.customers = [{
			id: 1,
			name: 'test'
		}, {
			id: 2,
			name: 'test 1'
		}]
  }
}
