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
  'webapp.styling',
  'webapp.taxes',
].forEach(function (item) {

  try {
    angular.module(item);
  } catch(err) {
    angular.module(item,[]);
  }
});