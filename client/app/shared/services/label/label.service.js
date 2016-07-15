export default class LabelService {

	static get UID(){
    return "LabelService"
  }

  constructor(gettextCatalog) {
    "ngInject";

    this.TITLE_DELETE_SECTION = gettextCatalog.getString("Delete section?");
    this.CONTENT_DELETE_SECTION = gettextCatalog.getString("Are you sure you want to delete this section?");

    this.TITLE_DELETE_ITEM  = gettextCatalog.getString("Delete item?");
    this.CONTENT_DELETE_ITEM = gettextCatalog.getString("Are you sure you want to permanently delete this item?");
    this.CONTENT_DELETE_ITEM_SECTION = gettextCatalog.getString("Are you sure you want to remove this item from the section?");

    this.TITLE_DELETE_MODIFIER  = gettextCatalog.getString("Delete modifier?");
    this.CONTENT_DELETE_MODIFIER = gettextCatalog.getString("This will delete the modifier from all menus.");

    this.TITLE_DELETE_IMAGE = gettextCatalog.getString("Delete image?");
    this.CONTENT_DELETE_IMAGE = gettextCatalog.getString("Are you sure you want to delete this image?");

    this.TITLE_MULTIPLE_INSTANCES = gettextCatalog.getString("Multiple instances found");
    this.CONTENT_MULTIPLE_INSTANCES = gettextCatalog.getString("You have edited an item that is in more than one menu. Where would you like to apply the changes?");

  }
}
