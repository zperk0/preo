export default class entitySelectController {
  static get UID() {
    return "entitySelectController"
  }

  toggleChannel(channel) {
    const {
      invites
    } = this;

    if (invites.channelId !== null) {
      invites.channelId = null;
    } else {
      invites.channelId = channel.id;
      invites.groupIds = [];
      invites.venueIds = [];
    }
  }

  isChannelSelected() {
    return this.invites.channelId === this.channel.id;
  }

  toggleGroup(venueGroup) {

    if (this.isGroupDisabled(venueGroup)) {
      return;
    }

    const {
      invites
    } = this;
    const index = invites.groupIds.indexOf(venueGroup.id);

    if (index === -1) {
      invites.groupIds.push(venueGroup.id);
      invites.venueIds = invites.venueIds.filter((venueId) => {
        return venueGroup.venueIds.indexOf(venueId) === -1;
      });
    } else {
      invites.groupIds.splice(index, 1);
    }
  }

  isGroupSelected(venueGroup) {
    return this.invites.groupIds.indexOf(venueGroup.id) !== -1;
  }

  isGroupDisabled(venueGroup) {
    return this.isChannelSelected() ||
           this.isOperator();
  }

  toggleVenue(venue) {

    if (this.isVenueDisabled(venue)) {
      return;
    }

  	const {
  		invites
  	} = this;
		const index = invites.venueIds.indexOf(venue.id);

		if (index === -1) {
			invites.venueIds.push(venue.id);
		} else {
			invites.venueIds.splice(index, 1);
		}
  }

  isVenueSelected(venue) {
		return this.invites.venueIds.indexOf(venue.id) !== -1;
  }

  isVenueDisabled(venue) {
    return this.isChannelSelected() ||
           this.isOperator() ||
           this.entities.venueGroups.filter((venueGroup) => {
              return this.invites.groupIds.indexOf(venueGroup.id) !== -1;
           }).filter((venueGroup) => {
             return venueGroup.venueIds.indexOf(venue.id) !== -1;
           }).length > 0;
  }

  isOperator() {
    return this.invites.role === this.UserRole.OPERATOR;
  }

  /* @ngInject */
  constructor($scope, UserRole) {
    'ngInject';

    this.UserRole = UserRole;

    this.channel = this.entities.channel;
    this.invites = this.entity.invites;

    $scope.$watch(() => {
      return this.invites.role;
    }, () => {
      if (this.isOperator()) {
        this.invites.venueIds = [];
        this.invites.groupIds = [];
      }
    })
  }
}