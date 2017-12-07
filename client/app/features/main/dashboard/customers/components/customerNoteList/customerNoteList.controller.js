export default class customerNoteListController {
  static get UID(){
    return "customerNoteListController"
  }

  orderBy(note) {

		if (!note.$createdAt) {
			note.$createdAt = moment(note.created_at).valueOf();
		}

		return note.$createdAt;
  }

  /* @ngInject */
  constructor() {
    "ngInject";

  }
}
