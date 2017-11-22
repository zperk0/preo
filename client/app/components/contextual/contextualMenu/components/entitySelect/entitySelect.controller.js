export default class entitySelectController {
  static get UID() {
    return "entitySelectController"
  }

  toggleChannel(channel) {
    const {
      entity
    } = this;

    if (entity.channelId !== null) {
      entity.channelId = null;
    } else {
      entity.channelId = channel.id;
      entity.groupIds = [];
      entity.venueIds = [];
    }
  }

  isChannelSelected() {
    return this.entity.channelId === this.channel.id;
  }

  toggleGroup(venueGroup) {

    if (this.isGroupDisabled(venueGroup)) {
      return;
    }

    const {
      entity
    } = this;
    const index = entity.groupIds.indexOf(venueGroup.id);

    if (index === -1) {
      entity.groupIds.push(venueGroup.id);
      entity.venueIds = entity.venueIds.filter((venueId) => {
        return venueGroup.venueIds.indexOf(venueId) === -1;
      });
    } else {
      entity.groupIds.splice(index, 1);
    }
  }

  isGroupSelected(venueGroup) {
    return this.entity.groupIds.indexOf(venueGroup.id) !== -1;
  }

  isGroupDisabled(venueGroup) {
    return this.isChannelSelected();
  }

  toggleVenue(venue) {

    if (this.isVenueDisabled(venue)) {
      return;
    }

  	const {
  		entity
  	} = this;
		const index = entity.venueIds.indexOf(venue.id);

		if (index === -1) {
			entity.venueIds.push(venue.id);
		} else {
			entity.venueIds.splice(index, 1);
		}
  }

  isVenueSelected(venue) {
		return this.entity.venueIds.indexOf(venue.id) !== -1;
  }

  isVenueDisabled(venue) {
    return this.isChannelSelected() ||
           this.entities.venueGroups.filter((venueGroup) => {
              return this.entity.groupIds.indexOf(venueGroup.id) !== -1;
           }).filter((venueGroup) => {
             return venueGroup.venueIds.indexOf(venue.id) !== -1;
           }).length > 0;
  }

  /* @ngInject */
  constructor() {
    'ngInject';

    this.channel = this.entities.channel;
  }
}