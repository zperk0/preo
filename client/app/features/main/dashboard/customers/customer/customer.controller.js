
export default class customerController {
  static get UID(){
    return "customerController"
  }

  isNewCustomer() {
    return this.$state.current.name === 'main.dashboard.customers.new';
  }

  /* @ngInject */
  constructor($scope, $state, $stateParams, StateService, UserService) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.StateService = StateService;

    this.customersCtrl = $scope['$customers'];

    if (this.isNewCustomer()) {
      const customer = new Preoday.Invite({
        venueId: StateService.venue && StateService.venue.id,
        role: 'ADMIN',
        createdBy: UserService.user.id,
        domain: StateService.domainId
      });

      this.customer = customer;
      this.customersCtrl.customers.push(customer);
    }

  }
}
