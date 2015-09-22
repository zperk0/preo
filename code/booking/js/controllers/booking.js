(function(window, angular) {

'use scrict';

    angular.module('booking')
    .controller('BookingCtrl', ['$scope', '$rootScope', '$timeout', '$q', 'VENUE_ID','$AjaxInterceptor', 'BookingService', 'PromotionService', 'MenuService', 'gettextCatalog', 'BookingSettingsService',
        function($scope, $rootScope, $timeout, $q, VENUE_ID, $AjaxInterceptor, BookingService, PromotionService, MenuService, gettextCatalog, BookingSettingsService) {

        var vm = this,
            menu = null,
            promotions = null;

        vm.generateReport = function() {

            var promises = [],
                filter = {
                    startDate: vm.startDate,
                    endDate: vm.endDate
                };

            // console.log('Getting bookings from ', filter);

            $AjaxInterceptor.start();

            BookingService.getBookings(filter).then(function(result) {

                var bookings = result || [];

                console.log('bookings', bookings);

                for(var i = 0, totalBookings = bookings.length; i < totalBookings; i++) {

                    var deferred = $q.defer()/*,
                        bookingPromotion = PromotionService.getPromotionById(bookings[i].promotionId);*/
                    console.log('promotion id', bookings[i].promotionId);

                    bookings[i].date = moment(bookings[i].date).format('DD/MM/YY');
                    bookings[i]['time'] = formatTime(bookings[i]['time']);
                    // bookings[i].$promotionName = bookingPromotion ? bookingPromotion.Name : '';

                    // TODO: remove promotionId 23 hardcode
                    bookings[i].promotionId = bookings[i].promotionId || 23;
                    bookings[i].$promotionName = bookings[i].promotionId;


                    if(bookings[i].promotionId) {

                        (function(defer, bk) {

                            bk.getMenu().then(function(data) {

                                // console.log('menu', data);
                                bk.$menus = data;
                                // bk.$menus = [{"id":142,"accountId":5,"name":"Bars menu","description":null,"outletId":null,"created":"2014-06-24T19:15:39.000+0000","updated":"2014-06-24T19:15:39.000+0000","sections":[{"id":2179,"menuId":142,"parentId":null,"name":"Champagne & Sparkling Wine (by the glass)","description":null,"min":1,"max":0,"position":1,"collapse":0,"created":"2014-06-24T19:15:39.000+0000","updated":"2014-06-25T00:03:15.000+0000","sections":[],"items":[{"id":13172,"venueId":5,"menuId":142,"sectionId":2179,"plu":null,"name":"Lanson Black Label NV, Brut","description":"","price":0.00,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:03:03.000+0000","updated":"2015-02-19T17:46:30.000+0000","modifiers":[{"id":417008,"itemId":13172,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2015-02-19T17:46:30.000+0000","updated":"2015-02-20T14:16:16.000+0000","items":[{"id":2630476,"modifierId":417008,"name":"125ml glass","description":null,"price":9.50,"position":1,"visible":1,"created":"2015-02-19T17:46:30.000+0000","updated":"2015-02-19T17:46:30.000+0000"},{"id":2630477,"modifierId":417008,"name":"Bottle","description":null,"price":50.00,"position":2,"visible":1,"created":"2015-02-19T17:46:30.000+0000","updated":"2015-02-19T17:46:30.000+0000"}]}],"images":[],"tags":[]},{"id":918269,"venueId":5,"menuId":142,"sectionId":2179,"plu":null,"name":"Prosecco Porta Leone ","description":"","price":0.00,"position":1003,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-02-19T17:42:17.000+0000","updated":"2015-02-19T17:49:02.000+0000","modifiers":[{"id":417009,"itemId":918269,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2015-02-19T17:49:02.000+0000","updated":"2015-02-19T17:49:02.000+0000","items":[{"id":2630479,"modifierId":417009,"name":"125ml Glass","description":null,"price":7.50,"position":1,"visible":1,"created":"2015-02-19T17:49:02.000+0000","updated":"2015-02-19T17:49:02.000+0000"},{"id":2630484,"modifierId":417009,"name":"Bottle","description":null,"price":37.00,"position":2,"visible":1,"created":"2015-02-19T17:56:03.000+0000","updated":"2015-02-19T17:56:03.000+0000"}]}],"images":[],"tags":[]}]},{"id":2180,"menuId":142,"parentId":null,"name":"White Wine","description":null,"min":1,"max":0,"position":2,"collapse":0,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000","sections":[],"items":[{"id":13173,"venueId":5,"menuId":142,"sectionId":2180,"plu":null,"name":"Chenin Blanc, Ben and Rudi Scott ","description":"South Africa","price":0.00,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-11-24T16:13:36.000+0000","modifiers":[{"id":6839,"itemId":13173,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000","items":[{"id":27355,"modifierId":6839,"name":"250ml","description":null,"price":6.95,"position":1,"visible":0,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000"},{"id":27356,"modifierId":6839,"name":"175ml","description":null,"price":5.50,"position":2,"visible":0,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000"},{"id":2630478,"modifierId":6839,"name":"Bottle","description":null,"price":19.50,"position":3,"visible":1,"created":"2015-02-19T17:46:30.000+0000","updated":"2015-02-19T17:46:30.000+0000"}]}],"images":[],"tags":[]},{"id":13174,"venueId":5,"menuId":142,"sectionId":2180,"plu":null,"name":"Colombard Vermentino, Petit Paul ","description":"France","price":0.00,"position":1002,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-11-24T16:13:36.000+0000","modifiers":[{"id":6840,"itemId":13174,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000","items":[{"id":27357,"modifierId":6840,"name":"250ml","description":null,"price":7.50,"position":1,"visible":0,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000"},{"id":27358,"modifierId":6840,"name":"175ml","description":null,"price":5.75,"position":2,"visible":0,"created":"2014-06-25T00:06:06.000+0000","updated":"2014-06-25T00:06:06.000+0000"}]}],"images":[],"tags":[]}]},{"id":2181,"menuId":142,"parentId":null,"name":"Red Wine","description":null,"min":1,"max":0,"position":3,"collapse":0,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000","sections":[],"items":[{"id":13175,"venueId":5,"menuId":142,"sectionId":2181,"plu":null,"name":"Cabernet Shiraz, Ben and Rudi Scott ","description":"South Africa","price":0.00,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-11-24T16:13:36.000+0000","modifiers":[{"id":6841,"itemId":13175,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000","items":[{"id":27359,"modifierId":6841,"name":"250ml","description":null,"price":6.95,"position":1,"visible":0,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000"},{"id":27360,"modifierId":6841,"name":"175ml","description":null,"price":5.50,"position":2,"visible":0,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000"},{"id":2630485,"modifierId":6841,"name":"Bottle","description":null,"price":19.50,"position":3,"visible":1,"created":"2015-02-19T17:56:03.000+0000","updated":"2015-02-19T17:56:03.000+0000"}]}],"images":[],"tags":[]},{"id":13176,"venueId":5,"menuId":142,"sectionId":2181,"plu":null,"name":"Cinsault Grenache, Petit Paul","description":"France","price":0.00,"position":1002,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-11-24T16:13:36.000+0000","modifiers":[{"id":6842,"itemId":13176,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000","items":[{"id":27361,"modifierId":6842,"name":"250ml","description":null,"price":7.50,"position":1,"visible":0,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000"},{"id":27362,"modifierId":6842,"name":"175ml","description":null,"price":5.75,"position":2,"visible":0,"created":"2014-06-25T00:08:05.000+0000","updated":"2014-06-25T00:08:05.000+0000"},{"id":2630486,"modifierId":6842,"name":"Bottle","description":null,"price":21.50,"position":3,"visible":1,"created":"2015-02-19T17:56:03.000+0000","updated":"2015-02-19T17:56:03.000+0000"}]}],"images":[],"tags":[]}]},{"id":2182,"menuId":142,"parentId":null,"name":"Bottled Beer","description":null,"min":1,"max":0,"position":4,"collapse":0,"created":"2014-06-25T00:09:08.000+0000","updated":"2014-06-25T00:09:08.000+0000","sections":[],"items":[{"id":13177,"venueId":5,"menuId":142,"sectionId":2182,"plu":null,"name":"Peroni","description":"","price":4.15,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:09:08.000+0000","updated":"2014-06-25T00:09:08.000+0000","modifiers":[],"images":[],"tags":[]},{"id":13178,"venueId":5,"menuId":142,"sectionId":2182,"plu":null,"name":"London Pride","description":"","price":4.15,"position":1002,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:09:08.000+0000","updated":"2014-06-25T00:09:08.000+0000","modifiers":[],"images":[],"tags":[]},{"id":918222,"venueId":5,"menuId":142,"sectionId":2182,"plu":null,"name":"Shoreditch Blond","description":"","price":4.50,"position":1003,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-02-16T18:10:14.000+0000","updated":"2015-02-16T18:10:14.000+0000","modifiers":[],"images":[],"tags":[]},{"id":918223,"venueId":5,"menuId":142,"sectionId":2182,"plu":null,"name":"Bethnal Pale Ale","description":"","price":4.50,"position":1004,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-02-16T18:10:14.000+0000","updated":"2015-02-16T18:10:14.000+0000","modifiers":[],"images":[],"tags":[]}]},{"id":2183,"menuId":142,"parentId":null,"name":"Spirits","description":null,"min":1,"max":0,"position":5,"collapse":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","sections":[],"items":[{"id":13179,"venueId":5,"menuId":142,"sectionId":2183,"plu":null,"name":"Beefeater","description":"","price":0.00,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-11-24T16:01:28.000+0000","modifiers":[{"id":6843,"itemId":13179,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","items":[{"id":27363,"modifierId":6843,"name":"Single","description":null,"price":3.50,"position":1,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27364,"modifierId":6843,"name":"Double","description":null,"price":7.00,"position":2,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"}]},{"id":6844,"itemId":13179,"name":"Choose a mixer","description":null,"minChoices":1,"maxChoices":1,"position":2,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","items":[{"id":27365,"modifierId":6844,"name":"Tonic Water","description":null,"price":1.60,"position":1,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27366,"modifierId":6844,"name":"Slimline Tonic","description":null,"price":1.60,"position":2,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27367,"modifierId":6844,"name":"Bitter Lemon","description":null,"price":1.60,"position":3,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27368,"modifierId":6844,"name":"Orange","description":null,"price":1.60,"position":4,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":52118,"modifierId":6844,"name":"No Mixer","description":null,"price":0.00,"position":5,"visible":1,"created":"2014-09-22T17:11:44.000+0000","updated":"2014-09-22T17:11:44.000+0000"}]}],"images":[],"tags":[]},{"id":13180,"venueId":5,"menuId":142,"sectionId":2183,"plu":null,"name":"Absolut Vodka","description":"","price":0.00,"position":1002,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-10-07T14:11:32.000+0000","modifiers":[{"id":6845,"itemId":13180,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","items":[{"id":27369,"modifierId":6845,"name":"Single","description":null,"price":3.50,"position":1,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27370,"modifierId":6845,"name":"Double","description":null,"price":7.00,"position":2,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"}]},{"id":6846,"itemId":13180,"name":"Choose a mixer","description":null,"minChoices":1,"maxChoices":1,"position":2,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","items":[{"id":27371,"modifierId":6846,"name":"Tonic Water","description":null,"price":1.60,"position":1,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27372,"modifierId":6846,"name":"Slimline Tonic","description":null,"price":1.60,"position":2,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27373,"modifierId":6846,"name":"Coca Cola","description":null,"price":1.60,"position":4,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27374,"modifierId":6846,"name":"Diet Coke","description":null,"price":1.60,"position":5,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":52117,"modifierId":6846,"name":"No Mixer","description":null,"price":0.00,"position":5,"visible":1,"created":"2014-09-22T17:11:19.000+0000","updated":"2014-09-22T17:11:19.000+0000"}]}],"images":[],"tags":[]},{"id":13181,"venueId":5,"menuId":142,"sectionId":2183,"plu":null,"name":"Jonnie Walker Red Label Whisky","description":"","price":0.00,"position":1003,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-11-24T16:01:28.000+0000","modifiers":[{"id":6847,"itemId":13181,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","items":[{"id":27375,"modifierId":6847,"name":"Single","description":null,"price":3.50,"position":1,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27376,"modifierId":6847,"name":"Double","description":null,"price":7.00,"position":2,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"}]},{"id":6848,"itemId":13181,"name":"Choose a mixer","description":null,"minChoices":1,"maxChoices":1,"position":2,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000","items":[{"id":27377,"modifierId":6848,"name":"Canada Dry Ginger Ale","description":null,"price":1.60,"position":2,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27378,"modifierId":6848,"name":"Coca Cola","description":null,"price":1.60,"position":4,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":52115,"modifierId":6848,"name":"No Mixer","description":null,"price":0.00,"position":5,"visible":1,"created":"2014-09-22T17:09:09.000+0000","updated":"2014-09-22T17:09:09.000+0000"},{"id":27379,"modifierId":6848,"name":"Diet Coke","description":null,"price":1.60,"position":5,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"},{"id":27380,"modifierId":6848,"name":"Soda Water","description":null,"price":1.60,"position":6,"visible":0,"created":"2014-06-25T00:15:25.000+0000","updated":"2014-06-25T00:15:25.000+0000"}]}],"images":[],"tags":[]},{"id":918330,"venueId":5,"menuId":142,"sectionId":2183,"plu":null,"name":"Bacardi","description":"","price":0.00,"position":1004,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-02-20T14:16:16.000+0000","updated":"2015-02-20T14:16:16.000+0000","modifiers":[{"id":417047,"itemId":918330,"name":"Choose a size","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2015-02-20T14:16:16.000+0000","updated":"2015-02-20T14:16:16.000+0000","items":[{"id":2630705,"modifierId":417047,"name":"Single ","description":null,"price":3.50,"position":1,"visible":1,"created":"2015-02-20T14:16:16.000+0000","updated":"2015-02-20T14:16:16.000+0000"},{"id":2630706,"modifierId":417047,"name":"Double","description":null,"price":7.00,"position":2,"visible":1,"created":"2015-02-20T14:16:16.000+0000","updated":"2015-02-20T14:16:16.000+0000"}]}],"images":[],"tags":[]}]},{"id":2184,"menuId":142,"parentId":null,"name":"Soft Drinks","description":null,"min":1,"max":0,"position":6,"collapse":0,"created":"2014-06-25T00:16:34.000+0000","updated":"2014-06-25T00:16:34.000+0000","sections":[],"items":[{"id":13182,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"Coca Cola","description":"","price":2.25,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:16:34.000+0000","updated":"2014-06-25T00:16:34.000+0000","modifiers":[],"images":[],"tags":[]},{"id":13183,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"Diet Coke","description":"","price":2.25,"position":1002,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:16:34.000+0000","updated":"2014-06-25T00:16:34.000+0000","modifiers":[],"images":[],"tags":[]},{"id":13184,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"Mineral Water - Still","description":"","price":2.00,"position":1003,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:16:34.000+0000","updated":"2014-06-25T00:16:34.000+0000","modifiers":[],"images":[],"tags":[]},{"id":13185,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"Mineral Water - Sparkling","description":"","price":2.00,"position":1004,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2014-06-25T00:16:34.000+0000","updated":"2014-06-25T00:16:34.000+0000","modifiers":[],"images":[],"tags":[]},{"id":917470,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"James White Apple Juice","description":"","price":2.95,"position":1005,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-01-27T17:09:03.000+0000","updated":"2015-01-27T17:09:03.000+0000","modifiers":[],"images":[],"tags":[]},{"id":917471,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"James White Pear Juice","description":"","price":2.95,"position":1007,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-01-27T17:11:58.000+0000","updated":"2015-01-27T17:11:58.000+0000","modifiers":[],"images":[],"tags":[]},{"id":917472,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"Fentimans Victorian Lemonade","description":"","price":2.55,"position":1007,"visible":0,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-01-27T17:11:58.000+0000","updated":"2015-08-31T22:50:41.000+0000","modifiers":[],"images":[],"tags":[]},{"id":917473,"venueId":5,"menuId":142,"sectionId":2184,"plu":null,"name":"Fentimans Ginger Beer","description":"","price":3.00,"position":1008,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-01-27T17:11:58.000+0000","updated":"2015-08-31T21:10:08.000+0000","modifiers":[],"images":[],"tags":[]}]},{"id":112549,"menuId":142,"parentId":null,"name":"qqqqq","description":null,"min":1,"max":0,"position":7,"collapse":0,"created":"2015-09-11T18:02:58.000+0000","updated":"2015-09-11T18:02:58.000+0000","sections":[],"items":[{"id":925745,"venueId":5,"menuId":142,"sectionId":112549,"plu":null,"name":"aaaaa","description":"","price":1.00,"position":1001,"visible":1,"quantity":0,"leadTime":null,"leadDays":null,"leadDaysTime":null,"mealDeal":0,"external":0,"url":null,"created":"2015-09-11T18:02:58.000+0000","updated":"2015-09-11T18:02:58.000+0000","modifiers":[{"id":420419,"itemId":925745,"name":"dsadsadsa","description":null,"minChoices":1,"maxChoices":1,"position":1,"created":"2015-09-11T18:02:58.000+0000","updated":"2015-09-11T18:02:58.000+0000","items":[{"id":2644831,"modifierId":420419,"name":"aaaaa","description":null,"price":2.00,"position":1,"visible":1,"created":"2015-09-11T18:02:58.000+0000","updated":"2015-09-11T18:02:58.000+0000"},{"id":2644832,"modifierId":420419,"name":"21312321321","description":null,"price":1.00,"position":2,"visible":1,"created":"2015-09-11T18:03:32.000+0000","updated":"2015-09-11T18:03:32.000+0000"}]},{"id":420420,"itemId":925745,"name":"xczczxcxz","description":null,"minChoices":1,"maxChoices":1,"position":2,"created":"2015-09-11T18:03:54.000+0000","updated":"2015-09-11T18:03:54.000+0000","items":[{"id":2644833,"modifierId":420420,"name":"dsdsadasdsadas","description":null,"price":0.00,"position":1,"visible":1,"created":"2015-09-11T18:03:54.000+0000","updated":"2015-09-11T18:03:54.000+0000"},{"id":2644834,"modifierId":420420,"name":"aaaaaaaaaaaaaaaaa","description":null,"price":11.00,"position":2,"visible":1,"created":"2015-09-11T18:11:32.000+0000","updated":"2015-09-11T18:11:32.000+0000"}]}],"images":[],"tags":[]}]}],"items":[],"promotions":[1]}];
                                bk.$sections = MenuService.groupItemBySection(bk.$menus, bk.orders);
                                // console.log('menu', bk.$menus);

                                // console.log('resolving promise')

                                defer.resolve();
                            });
                        })(deferred, bookings[i]);

                        promises.push(deferred.promise);
                    }
                }

                // console.log(promises);
                // console.log(bookings);

                if(bookings.length == 0) {

                    vm.bookingData = bookings;
                    $AjaxInterceptor.complete();
                }

                $q.all(promises).then(function() {
                    vm.bookingData = bookings;
                    $AjaxInterceptor.complete();
                });
            }, function() {

                showErrorMsg();
                $AjaxInterceptor.complete();
            });
        };

        vm.toggleDetails = function(index) {

            var details = $('.booking-details')[index];

            if($(details).css('display') == 'none')
                $(details).slideRow('down');
            else
                $(details).slideRow('up');
        };

        function formatTime(time) {

            return time.length == 8 ? time.substr(0, time.length - 3) : time;
        }

        function showErrorMsg(msg) {

            var errorMsg = msg || gettextCatalog.getString("Sorry, but there's been an error processing your request.");

            noty({
                type: 'error',  layout: 'topCenter',
                text: errorMsg
            });
        }

        function _init() {

            $rootScope.requests = 0;
            $AjaxInterceptor.start();

            BookingSettingsService.getSettings().then(function() {

                var startDate = $('.sched-start-date').fdatepicker({format:'dd/mm/yyyy'}).on('changeDate', function() { startDate.hide(); $('.sched-end-date').focus(); }).data('datepicker');
                var endDate = $('.sched-end-date').fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() <= startDate.date.valueOf() ? 'disabled' : '';}}).data('datepicker');

                $AjaxInterceptor.complete();

                vm.generateReport();
                // PromotionService.getPromotions().then(function(data) {

                //     $AjaxInterceptor.complete();
                // }, function() {

                //     showErrorMsg();
                //     $AjaxInterceptor.complete();
                // });
            }, function() {

                var noSettingMsg = gettextCatalog.getString('Please, setup the group booking settings first.');

                $AjaxInterceptor.complete();
                showErrorMsg(noSettingMsg);

                $timeout(function() {
                    window.location.href = '/bookingSettings'
                }, 2500);
            });
        }

        $timeout(_init);
    }]);

}(window, angular));