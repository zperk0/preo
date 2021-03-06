export default class entitySelectController {
  static get UID() {
    return "entitySelectController"
  }

  toggleChannel(channel) {
    const {
      inviteUserRoles
    } = this;

    if (this.isChannelDisabled()) {
      return;
    }

    if (inviteUserRoles.channelId !== null) {
      inviteUserRoles.channelId = null;
    } else {
      inviteUserRoles.channelId = channel.id;
      inviteUserRoles.groupIds = [];
      inviteUserRoles.venueIds = [];
    }
  }

  isChannelSelected() {
    const {channel, inviteUserRoles} = this;

    return angular.isObject(channel)
      && inviteUserRoles.channelId === channel.id;
  }

  isChannelDisabled() {
    return this.isOperator();
  }

  toggleGroup(venueGroup) {

    if (this.isGroupDisabled(venueGroup)) {
      return;
    }

    const {
      inviteUserRoles
    } = this;
    const index = inviteUserRoles.groupIds.indexOf(venueGroup.id);

    if (index === -1) {
      inviteUserRoles.groupIds.push(venueGroup.id);
      inviteUserRoles.venueIds = inviteUserRoles.venueIds.filter((venueId) => {
        return venueGroup.venueIds.indexOf(venueId) === -1;
      });
    } else {
      inviteUserRoles.groupIds.splice(index, 1);
    }
  }

  isGroupSelected(venueGroup) {
    return this.inviteUserRoles.groupIds.indexOf(venueGroup.id) !== -1 ||
           this.isGroupDisabled(venueGroup);
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
  		inviteUserRoles
  	} = this;
		const index = inviteUserRoles.venueIds.indexOf(venue.id);

		if (index === -1) {
			inviteUserRoles.venueIds.push(venue.id);
		} else {
			inviteUserRoles.venueIds.splice(index, 1);
		}
  }

  isVenueSelected(venue) {
		return this.inviteUserRoles.venueIds.indexOf(venue.id) !== -1 ||
           this.isVenueDisabled(venue);
  }

  isVenueDisabled(venue) {
    return this.isChannelSelected() ||
           this.isOperator() ||
           this.entities.venueGroups.filter((venueGroup) => {
              return this.inviteUserRoles.groupIds.indexOf(venueGroup.id) !== -1;
           }).filter((venueGroup) => {
             return venueGroup.venueIds.indexOf(venue.id) !== -1;
           }).length > 0;
  }

  // this method is used only by inviteUsers screen because if the user being add is an operator, its only allowed select Channel option.
  isOperator() {
    return this.inviteUserRoles.role === this.UserRole.OPERATOR;
  }

  /* @ngInject */
  constructor($scope, UserRole) {
    'ngInject';

    this.UserRole = UserRole;

    this.channel = this.entities.channel;

    $scope.$watch(() => {
      return this.inviteUserRoles.role;
    }, () => {
      if (this.isOperator()) {
        this.inviteUserRoles.venueIds = [];
        this.inviteUserRoles.groupIds = [];

        if (angular.isObject(this.channel)) {
          this.inviteUserRoles.channelId = this.channel.id;
        }
      }
    });
  }
}
