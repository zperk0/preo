export default class collectionSlotsSelectController {
  static get UID(){
    return "collectionSlotsSelectController"
  }

  getCollectionSlots () {

    return this.data.collectionSlots;
  }

  isSelected (collectionSlot) {

    return this.schedule.pickupSlots.indexOf(collectionSlot) !== -1;
  }

  toggleCheckbox (collectionSlot) {

    var index = this.schedule.pickupSlots.indexOf(collectionSlot);

    if (index === -1) {
      this.schedule.pickupSlots.push(collectionSlot);
    } else {
      this.schedule.pickupSlots.splice(index, 1);
    }
  }

  buildData (data) {

    this.data = data;

    var ids = this.schedule.pickupSlots.map(function (item) {

      return item.id;
    });

    this.schedule.pickupSlots = this.data.collectionSlots.filter(function (item) {

      return ids.indexOf(item.id) !== -1;
    });

    this.loading = false;
  }

  constructor(CollectionSlotsService, VenueService) {
    "ngInject";

    this.loading = true;
    this.data = {};

    CollectionSlotsService.getCollectionSlots({
      venueId: VenueService.currentVenue.id
    }).then((data) => {

      this.buildData(data);
    }, () => {

      this.data = {};
      this.loading = false;
    });
  }
}
