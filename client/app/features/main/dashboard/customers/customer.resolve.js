
export default function customerResolve ($q, $state, $stateParams, $timeout, customers) {
  "ngInject";

  const _customers = ($stateParams.customers || customers);

  const customerId = +$stateParams.customerId;
  const filtered = customerId && _customers.filter((c) => {
    return +c.id === customerId;
  });

  if (filtered && filtered.length) {
    return $q.resolve(filtered[0]);
  }

  $timeout(() => {
    $state.go('main.dashboard.customers.placeholder');
  });

  return $q.reject();
}