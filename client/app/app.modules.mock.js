[
  'webapp.outlets',
  'webapp.bookings',
  'webapp.events',
  'webapp.venueSettings',
  'webapp.vouchers',
  'webapp.menus',
  'webapp.notifications',
  'webapp.payments',
  'webapp.promotions',
  'webapp.manageUsers',
  'webapp.analytics',
  'webapp.styling',
  'webapp.users',
  'webapp.taxes',
  'webapp.customTags',
].forEach(function (item) {

  try {
    angular.module(item);
  } catch(err) {
    angular.module(item,[]);
  }
});