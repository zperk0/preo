export default class LabelService {

	static get UID(){
    return "LabelService"
  }

  constructor(gettextCatalog) {
    "ngInject";

    this.SNACK_WRONG_CREDENTIALS = gettextCatalog.getString("Invalid username and/or password");

    this.SNACK_WEBSETTINGS_ERROR = gettextCatalog.getString("Could not save weborders style");
    this.SNACK_WEBSETTINGS_SUCCESS = gettextCatalog.getString("Saved weborders style");

    this.TITLE_DELETE_SECTION = gettextCatalog.getString("Delete section?");
    this.CONTENT_DELETE_SECTION = gettextCatalog.getString("Are you sure you want to delete this section?");

    this.TITLE_DELETE_ITEM_IMAGE  = gettextCatalog.getString("Delete image?");
    this.CONTENT_DELETE_ITEM_IMAGE = gettextCatalog.getString("Are you sure you want to permanently delete this image?");

    this.TITLE_DELETE_ITEM  = gettextCatalog.getString("Delete item?");
    this.CONTENT_DELETE_ITEM = gettextCatalog.getString("Are you sure you want to permanently delete this item?");
    this.CONTENT_DELETE_ITEM_SECTION = gettextCatalog.getString("Are you sure you want to remove this item from the section?");

    this.TITLE_DELETE_MODIFIER  = gettextCatalog.getString("Delete modifier?");
    this.CONTENT_DELETE_MODIFIER = gettextCatalog.getString("This will delete the modifier from all menus.");

    this.TITLE_DELETE_MENU = gettextCatalog.getString("Delete menu?");
    this.CONTENT_DELETE_MENU = gettextCatalog.getString("This will delete all section and item configurations for this menu. Are you sure?");

    this.TITLE_DELETE_IMAGE = gettextCatalog.getString("Delete image?");
    this.CONTENT_DELETE_IMAGE = gettextCatalog.getString("Are you sure you want to delete this image?");

    this.TITLE_MULTIPLE_INSTANCES = gettextCatalog.getString("Multiple instances found");
    this.CONTENT_MULTIPLE_INSTANCES = gettextCatalog.getString("You have edited an item that is in more than one menu. Where would you like to apply the changes?");

    this.TITLE_DELETE_OUTLET_LOCATION = gettextCatalog.getString("Delete outlet location?");
    this.CONTENT_DELETE_OUTLET_LOCATION = gettextCatalog.getString("Are you sure you want to delete this outlet location?");

    this.TITLE_DELETE_OUTLET_LOCATION_GROUP = gettextCatalog.getString("Delete group?");
    this.CONTENT_DELETE_OUTLET_LOCATION_GROUP = gettextCatalog.getString("This will delete the configuration of all sub-groups. Are you sure?");

    this.TITLE_DELETE_OUTLET = gettextCatalog.getString("Delete outlet?");
    this.CONTENT_DELETE_OUTLET = gettextCatalog.getString("Are you sure you want to delete this outlet?");

    //TAXES
    this.SNACK_SELLER_SUCCESS = gettextCatalog.getString("Seller details saved");
    this.SNACK_SELLER_ERROR = gettextCatalog.getString("Seller details not saved");

    this.TITLE_DELETE_COLLECTION_SLOT = gettextCatalog.getString("Delete collection slot?");
    this.CONTENT_DELETE_COLLECTION_SLOT = gettextCatalog.getString("Are you sure you want to delete this collection slot?");    

    this.TITLE_DELETE_EVENT = gettextCatalog.getString("Delete event?");
    this.CONTENT_DELETE_EVENT = gettextCatalog.getString("Are you sure you want to delete this event?");    

    this.TITLE_DELETE_SCHEDULE = gettextCatalog.getString("Delete schedule?");
    this.CONTENT_DELETE_SCHEDULE = gettextCatalog.getString("Are you sure you want to delete this schedule?");    

  }
}
