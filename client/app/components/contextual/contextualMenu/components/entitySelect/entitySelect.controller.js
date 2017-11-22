export default class entitySelectController {
  static get UID() {
    return "entitySelectController"
  }

  toggleGroup(venueGroup) {
  	const {
  		entity
  	} = this;
		const index = entity.venueGroups.indexOf(venueGroup);

		if (index === -1) {
			entity.venueGroups.push(venueGroup);
		} else {
			entity.venueGroups.splice(index, 1);
		}
  }

  isGroupSelected(venueGroup) {
		return this.entity.venueGroups.indexOf(venueGroup) !== -1;
  }

  /* @ngInject */
  constructor() {
    'ngInject';
  }
}