
export default function customerResolve ($q, $state, $stateParams, $timeout, customers) {
  "ngInject";

  console.log('[customerResolve] - Validating Customer Resolve - ', customers, $stateParams.customerId);

  const customerId = +$stateParams.customerId;
  const filtered = customerId && customers.filter((c) => {
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