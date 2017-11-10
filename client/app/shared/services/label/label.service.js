export default class LabelService {

	static get UID(){
    return "LabelService"
  }

  constructor(gettextCatalog) {
    "ngInject";

    this.gettextCatalog = gettextCatalog;

    this.CONFIRMATION = gettextCatalog.getString("Got it");

    this.NOT_AVAILABLE = gettextCatalog.getString("Not available");

    this.CREATE = gettextCatalog.getString("Create");

    this.SNACK_WRONG_CREDENTIALS = gettextCatalog.getString("Invalid username and/or password");

    this.SNACK_WEBSETTINGS_ERROR = gettextCatalog.getString("Could not save weborders style");
    this.SNACK_WEBSETTINGS_SUCCESS = gettextCatalog.getString("Saved weborders style");

    this.SNACK_EMAILS_ERROR = gettextCatalog.getString("Could not save emails style");
    this.SNACK_EMAILS_SUCCESS = gettextCatalog.getString("Saved emails style");

    this.SNACK_MOBILE_STYLING_SUCCESS = gettextCatalog.getString("Mobile App styling saved with success.");
    this.SNACK_MOBILE_STYLING_ERROR = gettextCatalog.getString("Error updating Mobile App styling.");

    this.TITLE_DELETE_SECTION = gettextCatalog.getString("Delete section?");
    this.CONTENT_DELETE_SECTION = gettextCatalog.getString("Are you sure you want to delete this section?");

    this.TITLE_DELETE_ITEM_IMAGE  = gettextCatalog.getString("Delete image?");
    this.CONTENT_DELETE_ITEM_IMAGE = gettextCatalog.getString("Are you sure you want to permanently delete this image?");

    this.IMAGE_DELETE_SUCCESS = gettextCatalog.getString("Image Deleted successfully.");
    this.IMAGE_DELETE_ERROR = gettextCatalog.getString("Error deleting image.");

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

    this.TITLE_DELETE_CUSTOM_FIELD = gettextCatalog.getString("Delete custom field?");
    this.CONTENT_DELETE_CUSTOM_FIELD = gettextCatalog.getString("Are you sure you want to delete this custom field?");

    this.TITLE_DELETE_OUTLET_CUSTOM_FIELD = gettextCatalog.getString("This outlet location has custom fields");
    this.CONTENT_DELETE_OUTLET_CUSTOM_FIELD = gettextCatalog.getString("Deleting this outlet will also delete the custom fields at checkout. Are you sure?");

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

    this.TITLE_DELETE_EXTERNAL_EVENT = gettextCatalog.getString("Delete external event?");
    this.CONTENT_DELETE_EXTERNAL_EVENT = gettextCatalog.getString("This event will no longer be linked to Preoday. Are you sure?");

    this.TITLE_DELETE_SCHEDULE = gettextCatalog.getString("Delete schedule?");
    this.CONTENT_DELETE_SCHEDULE = gettextCatalog.getString("Are you sure you want to delete this schedule?");

    this.TITLE_DELETE_TAX_GROUP = gettextCatalog.getString("Delete tax group?");
    this.CONTENT_DELETE_TAX_GROUP = gettextCatalog.getString("Are you sure you want to delete this tax group?");

    this.TITLE_DELETE_TAX_RATE = gettextCatalog.getString("Delete tax rate?");
    this.CONTENT_DELETE_TAX_RATE = gettextCatalog.getString("Are you sure you want to delete this tax rate?");

    this.SNACK_VENUE_DETAILS_SUCCESS = gettextCatalog.getString("Venue details saved");
    this.SNACK_VENUE_DETAILS_ERROR = gettextCatalog.getString("Venue details not saved");

    this.SNACK_VENUE_LOCATION_SUCCESS = gettextCatalog.getString("Venue location saved");
    this.SNACK_VENUE_LOCATION_ERROR = gettextCatalog.getString("Venue location not saved");

    this.SNACK_VENUE_SERVICES_SUCCESS = gettextCatalog.getString("Services saved");
    this.SNACK_VENUE_SERVICES_ERROR = gettextCatalog.getString("Services not saved");

    this.SNACK_VENUE_PAYMENTS_SUCCESS = gettextCatalog.getString("Payments saved");
    this.SNACK_VENUE_PAYMENTS_ERROR = gettextCatalog.getString("Payments not saved");

    this.SNACK_DELIVERY_ZONES_SUCCESS = gettextCatalog.getString("Delivery zone saved");
    this.SNACK_DELIVERY_ZONES_ERROR = gettextCatalog.getString("Delivery zone not saved");
    this.SNACK_DELIVERY_ZONES_SHAPE_ERROR = gettextCatalog.getString("Please select a circle or draw a delivery area");
    this.TITLE_DELETE_DELIVERY_ZONE = gettextCatalog.getString("Delete delivery zone?");
    this.CONTENT_DELETE_DELIVERY_ZONE= gettextCatalog.getString("Are you sure you want to permanently delete this delivery zone?");

    this.TITLE_STRIPE_CONNECTED = gettextCatalog.getString("Connection confirmed");
    this.CONTENT_STRIPE_CONNECTED= gettextCatalog.getString("Your venue was successfully connected to your Stripe account");

    this.TITLE_DELETE_USER = gettextCatalog.getString("Delete user?");
    this.CONTENT_DELETE_USER= gettextCatalog.getString("This user will no longer be able to access the dashboard. Are you sure?");

    this.TITLE_DELETE_ACCOUNT = gettextCatalog.getString("Delete account");
    this.CONTENT_DELETE_ACCOUNT = gettextCatalog.getString("Deleting your account means you won't be able to access the dashboard any longer. This cannot be undone. Are you sure?");

    this.SNACK_USER_DELETED= gettextCatalog.getString("User access removed");
    this.SNACK_USER_DELETED_ERROR= gettextCatalog.getString("User access not removed");
    this.SNACK_USER_ROLE_UPDATE= gettextCatalog.getString("User access updated");
    this.SNACK_USER_ROLE_UPDATE_ERROR= gettextCatalog.getString("User access not updated");
    this.UPDATE_ROLE_BUTTON= gettextCatalog.getString("Update role");
    this.SEND_INVITE_BUTTON= gettextCatalog.getString("Send invite");
    this.RESEND_INVITE_BUTTON= gettextCatalog.getString("Resend invite");
    this.SNACK_USER_INVITE_ERROR= gettextCatalog.getString("Invitation not sent");
    this.SNACK_USER_INVITE_CONFLICT= gettextCatalog.getString("This user already has an account");
    this.SNACK_USER_INVITE_SUCCESS= gettextCatalog.getString("Invitation sent");

    this.SNACK_CUSTOMER_ERROR = gettextCatalog.getString("Customer not saved");
    this.SNACK_CUSTOMER_CONFLICT = gettextCatalog.getString("This customer already has an account");
    this.SNACK_CUSTOMER_SUCCESS = gettextCatalog.getString("Customer saved");

    this.TITLE_INACTIVE_PROMOTION = gettextCatalog.getString("Remove validity period?");
    this.CONTENT_INACTIVE_PROMOTION = gettextCatalog.getString("This promotion hasn't started yet or has ended. If you activate it manually, the start and end dates will be removed.");

    this.TITLE_DELETE_PROMOTION = gettextCatalog.getString("Delete promotion?");
    this.CONTENT_DELETE_PROMOTION = gettextCatalog.getString("Are you sure you want to permanently delete this promotion?");
    this.SNACK_PROMOTION_DELETED = gettextCatalog.getString("Promotion deleted");
    this.SNACK_PROMOTION_DELETED_ERROR = gettextCatalog.getString("Promotion not deleted");
    this.SNACK_PROMOTION_SAVED = gettextCatalog.getString("Promotion saved");
    this.SNACK_PROMOTION_SAVED_ERROR = gettextCatalog.getString("Promotion not saved");
    this.SNACK_PROMOTION_EXISTING_CODE = gettextCatalog.getString("This promotion code is already being used.");
    this.SNACK_PROMOTION_ADD_USER = gettextCatalog.getString("Users were applied to this promotion.");

    this.SNACK_ERROR_FETCHING_FEES = gettextCatalog.getString("An error ocurred to fetch the fees. Try again later.");

    //dropdownActions - Analytics
    this.EXPORT_CSV  = { id: 1, name: gettextCatalog.getString('Export as CSV'), type: 'csv' },
    this.EXPORT_PDF  = { id: 2, name: gettextCatalog.getString('Export as PDF'), type: 'pdf' },
    this.DAILY_MODE  = { id: 3, name: gettextCatalog.getString('Daily') , type: 'daily' },
    this.WEEKLY_MODE = { id: 4, name: gettextCatalog.getString('Weekly'), type: 'weekly' },
    this.MONTHLY_MODE= { id: 5, name: gettextCatalog.getString('Monthly'), type: 'monthly'},
    this.NOTIFICATION= { id: 6, name: gettextCatalog.getString('Send push notification'), type: 'notification'}

    // CUSTOM TAGS
    this.TITLE_DELETE_TAG = gettextCatalog.getString("Delete tag?");
    this.CONTENT_DELETE_TAG = gettextCatalog.getString("Are you sure you want to delete this tag?");

    this.TITLE_DELETE_TAG_ACTION = gettextCatalog.getString("Delete tag action?");
    this.CONTENT_DELETE_TAG_ACTION = gettextCatalog.getString("Are you sure you want to delete this tag action?");

    this.TITLE_DELETE_TAG_IN_USE = gettextCatalog.getString("This tag is in use");
    this.CONTENT_DELETE_TAG_IN_USE = gettextCatalog.getString("Deleting this tag will remove it from all items and tag actions. Are you sure?");

    this.TITLE_DUPLICATED_TAG_NAME = gettextCatalog.getString("Warning");
    this.CONTENT_DUPLICATED_TAG_NAME = gettextCatalog.getString("There is already another tag with the same name, are you sure you want to create this new tag?");

    this.SNACK_TAG_CREATED = gettextCatalog.getString('Tag created');
    this.SNACK_TAG_CREATED_ERROR = gettextCatalog.getString('Error creating tag');

    this.SNACK_TAG_UPDATED = gettextCatalog.getString('Tag updated');
    this.SNACK_TAG_UPDATED_ERROR = gettextCatalog.getString('Error updating tag');

    this.SNACK_TAG_DELETED = gettextCatalog.getString('Tag deleted');

    this.SNACK_TAG_ACTION_CREATED = gettextCatalog.getString('Tag action created');
    this.SNACK_TAG_ACTION_CREATED_ERROR = gettextCatalog.getString('Error creating tag action');

    this.SNACK_TAG_ACTION_UPDATED = gettextCatalog.getString('Tag action updated');
    this.SNACK_TAG_ACTION_UPDATED_ERROR = gettextCatalog.getString('Error updating tag action');

    this.SNACK_TAG_ACTION_DELETED = gettextCatalog.getString('Tag action deleted');
    this.SNACK_TAG_ACTION_DELETED_ERROR = gettextCatalog.getString('An error ocurred to delete the tag. Try again later.');
  }
}
