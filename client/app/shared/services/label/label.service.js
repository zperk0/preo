export default class LabelService {

	static get UID(){
    return "LabelService"
  }

  constructor($translate) {
    "ngInject";

    this.TITLE_DELETE_SECTION = $translate.instant("Delete section?");
    this.CONTENT_DELETE_SECTION = $translate.instant("Are you sure you want to delete this section?");

    this.TITLE_DELETE_ITEM  = $translate.instant("Delete item?");
    this.CONTENT_DELETE_ITEM = $translate.instant("Are you sure you want to permanently delete this item?");
    this.CONTENT_DELETE_ITEM_SECTION = $translate.instant("Are you sure you want to remove this item from the section?");

    this.TITLE_DELETE_IMAGE = $translate.instant("Delete image?");
    this.CONTENT_DELETE_IMAGE = $translate.instant("Are you sure you want to delete this image?");

  }
}