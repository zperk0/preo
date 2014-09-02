<?php session_start();  require_once('lang.php');?>

function _tr(str){
	var trans=Dictionary[str];
	return trans !==undefined ? trans : str;
} 

var Dictionary = { 
	"Sorry, but there's been an error processing your request.":<? echo json_encode(_("Sorry, but there's been an error processing your request.")) ?>,
	"Incorrect credentials or account does not exist.":<? echo json_encode(_("Incorrect credentials or account does not exist.")) ?>,
	"Success! Please check your email for further instructions.":<? echo json_encode(_("Success! Please check your email for further instructions.")) ?>,
	"Sorry, incorrect code.":<? echo json_encode(_("Sorry, incorrect code.")) ?>,
	"Your password has been reset.<br/>You will now be redirected to the login page.":<? echo json_encode(_("Your password has been reset.<br/>You will now be redirected to the login page.")) ?>,
	"Venue changes have been saved!":<? echo json_encode(_("Venue changes have been saved!")) ?>,
	"Uploaded!":<? echo json_encode(_("Uploaded!")) ?>,
	"Error uploading file":<? echo json_encode(_("Error uploading file")) ?>,
	"Incorrect Image File":<? echo json_encode(_("Incorrect Image File")) ?>,
	"App changes have been saved!":<? echo json_encode(_("App changes have been saved!")) ?>,
	"Choose a size":<? echo json_encode(_("Choose a size")) ?>,
	"Choose a flavour":<? echo json_encode(_("Choose a flavour")) ?>,
	"Choose a topping":<? echo json_encode(_("Choose a topping")) ?>,
	"Choose some extras":<? echo json_encode(_("Choose some extras")) ?>,
	"Choose a side dish":<? echo json_encode(_("Choose a side dish")) ?>,
	"Pick an option type":<? echo json_encode(_("Pick an option type")) ?>,
	"Yes, delete this section and all its contents!":<? echo json_encode(_("Yes, delete this section and all its contents!")) ?>,
	"No, go back.":<? echo json_encode(_("No, go back.")) ?>,
	"Choose a main":<? echo json_encode(_("Choose a main")) ?>,
	"Choose a side":<? echo json_encode(_("Choose a side")) ?>,
	"Choose a drink":<? echo json_encode(_("Choose a drink")) ?>,
	"Choose a curry":<? echo json_encode(_("Choose a curry")) ?>,
	"Choose a burger":<? echo json_encode(_("Choose a burger")) ?>,
	"Menu configuration has been saved!":<? echo json_encode(_("Menu configuration has been saved!")) ?>,
	"Choose a Collection Slot":<? echo json_encode(_("Choose a Collection Slot")) ?>,
	"Choose Event Location":<? echo json_encode(_("Choose Event Location")) ?>,
	"Are you sure you want to delete this event? Note: all event data will be lost!":<? echo json_encode(_("Are you sure you want to delete this event? Note: all event data will be lost!")) ?>,
	"Yes, delete this event!":<? echo json_encode(_("Yes, delete this event!")) ?>,
	"Role":<? echo json_encode(_("Role")) ?>,
	"Are you sure you want to delete this user? Note: all user data will be lost!":<? echo json_encode(_("Are you sure you want to delete this user? Note: all user data will be lost!")) ?>,
	"Yes, delete this user!":<? echo json_encode(_("Yes, delete this user!")) ?>,
	"Username/email already exists":<? echo json_encode(_("Username/email already exists")) ?>,
	"User configuration has been saved!":<? echo json_encode(_("User configuration has been saved!")) ?>,
	"Select all menus":<? echo json_encode(_("Select all menus")) ?>,
	"Unselect all menus":<? echo json_encode(_("Unselect all menus")) ?>,
	"Select menu(":<? echo json_encode(_("Select menu(")) ?>,
	"# of # selected":<? echo json_encode(_("# of # selected")) ?>,
	"Are you sure you want to delete this outlet? Note: all outlet data will be lost!":<? echo json_encode(_("Are you sure you want to delete this outlet? Note: all outlet data will be lost!")) ?>,
	"Yes, delete this outlet!":<? echo json_encode(_("Yes, delete this outlet!")) ?>,
	"Outlet configuration has been saved!":<? echo json_encode(_("Outlet configuration has been saved!")) ?>,
	"These times have been applied to all days!":<? echo json_encode(_("These times have been applied to all days!")) ?>,
	"We still need some more information. Don't forget to fill out the remaining days of the week!":<? echo json_encode(_("We still need some more information. Don't forget to fill out the remaining days of the week!")) ?>,
	"Where should this meal deal appear?":<? echo json_encode(_("Where should this meal deal appear?")) ?>,
	"Choose a menu section":<? echo json_encode(_("Choose a menu section")) ?>,
	"Are you sure you want to delete this meal deal? Note: all associated data will be lost!":<? echo json_encode(_("Are you sure you want to delete this meal deal? Note: all associated data will be lost!")) ?>,
	"Yes, delete this meal deal!":<? echo json_encode(_("Yes, delete this meal deal!")) ?>,
	"All changes has been saved!":<? echo json_encode(_("All changes has been saved!")) ?>,
	"Are you sure you want to delete this menu? Note: all menu data will be lost!":<? echo json_encode(_("Are you sure you want to delete this menu? Note: all menu data will be lost!")) ?>,
	"Yes, delete this menu!":<? echo json_encode(_("Yes, delete this menu!")) ?>,
	"Sorry, incorrect password.":<? echo json_encode(_("Sorry, incorrect password.")) ?>,
	"Settings and Password has been saved!<br/>You will need to log in again with your new password to continue.":<? echo json_encode(_("Settings and Password has been saved!<br/>You will need to log in again with your new password to continue.")) ?>,
	"Settings have been saved!":<? echo json_encode(_("Settings have been saved!")) ?>,
	"Please select features you require":<? echo json_encode(_("Please select features you require")) ?>,
	"Select all":<? echo json_encode(_("Select all")) ?>,
	"Your app is now live!":<? echo json_encode(_("Your app is now live!")) ?>,
	"Your app is now in demo mode!":<? echo json_encode(_("Your app is now in demo mode!")) ?>,
	"Your app is now offline!":<? echo json_encode(_("Your app is now offline!")) ?>,
	"My order app ":<? echo json_encode(_("My order app ")) ?>,
	"Sorry, these password do not match. Please try again.":<? echo json_encode(_("Sorry, these password do not match. Please try again.")) ?>,
	"All the fields are required.":<? echo json_encode(_("All the fields are required.")) ?>,
	"Please fill in all the required fields.":<? echo json_encode(_("Please fill in all the required fields.")) ?>,
	"Outstanding payment resolved":<? echo json_encode(_("Outstanding payment resolved")) ?>,
	"Ok":<? echo json_encode(_("Ok")) ?>,
	"Payment method updated succesfully!":<? echo json_encode(_("Payment method updated succesfully!")) ?>,
	"Your outstand payment has been paid. Your card was charged <b>&pound;" + result.ammount.toFixed(":<? echo json_encode(_("Your outstand payment has been paid. Your card was charged <b>&pound;" + result.ammount.toFixed(")) ?>,
	"OK":<? echo json_encode(_("OK")) ?>,
	"This Premium Feature will remain active on your account until the end of the current billing cycle. You can cancel this uninstall at any time. If you wish to reinstall this Premium Feature after it has been deactivated, simply click on the <span>reinstall</span> option.":<? echo json_encode(_("This Premium Feature will remain active on your account until the end of the current billing cycle. You can cancel this uninstall at any time. If you wish to reinstall this Premium Feature after it has been deactivated, simply click on the <span>reinstall</span> option.")) ?>,
	"Are you sure you want to uninstall this Premium Feature?":<? echo json_encode(_("Are you sure you want to uninstall this Premium Feature?")) ?>,
	"UNINSTALL":<? echo json_encode(_("UNINSTALL")) ?>,
	"Your free trial will be cancelled immediately and you will no longer have access to this feature.":<? echo json_encode(_("Your free trial will be cancelled immediately and you will no longer have access to this feature.")) ?>,
	"Are you sure you want to cancel this Free Trial? This action cannot be undone?":<? echo json_encode(_("Are you sure you want to cancel this Free Trial? This action cannot be undone?")) ?>,
	"This Premium Feature is currently canceled. A new charge will be made to your card before reinstalling this feature.":<? echo json_encode(_("This Premium Feature is currently canceled. A new charge will be made to your card before reinstalling this feature.")) ?>,
	"Are you sure you want to reinstall this Premium Feature?":<? echo json_encode(_("Are you sure you want to reinstall this Premium Feature?")) ?>,
	"REINSTALL":<? echo json_encode(_("REINSTALL")) ?>,
	"Error":<? echo json_encode(_("Error")) ?>,
	"PAYMENT METHOD":<? echo json_encode(_("PAYMENT METHOD")) ?>,
	"Your new Premium Feature is now live!":<? echo json_encode(_("Your new Premium Feature is now live!")) ?>,
	"You can manage subscriptions from your account settings page.":<? echo json_encode(_("You can manage subscriptions from your account settings page.")) ?>,
	"Your outstand payment has been paid. Your card was charged <b>&pound;"+a.ammount.toFixed(":<? echo json_encode(_("Your outstand payment has been paid. Your card was charged <b>&pound;"+a.ammount.toFixed(")) ?>,
	"CANCEL":<? echo json_encode(_("CANCEL")) ?>,
	"Please enter a discount code":<? echo json_encode(_("Please enter a discount code")) ?>,
	"Welcome to Know Your Customer":<? echo json_encode(_("Welcome to Know Your Customer")) ?>,
	"From here you can view detailed reports and analytics about your customers and the transactions they make.":<? echo json_encode(_("From here you can view detailed reports and analytics about your customers and the transactions they make.")) ?>,
	"GET STARTED":<? echo json_encode(_("GET STARTED")) ?>,
	"Customers":<? echo json_encode(_("Customers")) ?>,
	"Reports":<? echo json_encode(_("Reports")) ?>,
	"Stock":<? echo json_encode(_("Stock")) ?>,
	"Date Range":<? echo json_encode(_("Date Range")) ?>,
	"Week":<? echo json_encode(_("Week")) ?>,
	"Month":<? echo json_encode(_("Month")) ?>,
	"3 Months":<? echo json_encode(_("3 Months")) ?>,
	"6 Months":<? echo json_encode(_("6 Months")) ?>,
	"Year":<? echo json_encode(_("Year")) ?>,
	"Total Customers":<? echo json_encode(_("Total Customers")) ?>,
	"Orders per Customer":<? echo json_encode(_("Orders per Customer")) ?>,
	"Average Order Value":<? echo json_encode(_("Average Order Value")) ?>,
	"Items Ordered":<? echo json_encode(_("Items Ordered")) ?>,
	"Orders By Outlet":<? echo json_encode(_("Orders By Outlet")) ?>,
	"Most Popular Items":<? echo json_encode(_("Most Popular Items")) ?>,
	"On the day":<? echo json_encode(_("On the day")) ?>,
	"In advance":<? echo json_encode(_("In advance")) ?>,
	"Time of Orders Placed":<? echo json_encode(_("Time of Orders Placed")) ?>,
	"Average order value (are":<? echo json_encode(_("Average order value (are")) ?>,
	"New":<? echo json_encode(_("New")) ?>,
	"Returning":<? echo json_encode(_("Returning")) ?>,
	"Customers (Pi":<? echo json_encode(_("Customers (Pi")) ?>,
	"Total":<? echo json_encode(_("Total")) ?>,
	"Customers (Ba":<? echo json_encode(_("Customers (Ba")) ?>,
	" orders":<? echo json_encode(_(" orders")) ?>,
	"Number of Orders":<? echo json_encode(_("Number of Orders")) ?>,
	"Menu Item Popularity":<? echo json_encode(_("Menu Item Popularity")) ?>,
	"Revenue":<? echo json_encode(_("Revenue")) ?>,
	"Date Joined":<? echo json_encode(_("Date Joined")) ?>,
	"Name":<? echo json_encode(_("Name")) ?>,
	"Email Address":<? echo json_encode(_("Email Address")) ?>,
	"Marketing":<? echo json_encode(_("Marketing")) ?>,
	"Date of Order":<? echo json_encode(_("Date of Order")) ?>,
	"Total Spent":<? echo json_encode(_("Total Spent")) ?>,
	"% Increase":<? echo json_encode(_("% Increase")) ?>,
	"% Decrease":<? echo json_encode(_("% Decrease")) ?>,
	"Last Order":<? echo json_encode(_("Last Order")) ?>,
	"Item Name":<? echo json_encode(_("Item Name")) ?>,
	"Quantity Sold":<? echo json_encode(_("Quantity Sold")) ?>,
	"Day":<? echo json_encode(_("Day")) ?>,
	"Date":<? echo json_encode(_("Date")) ?>,
	"Loyalty":<? echo json_encode(_("Loyalty")) ?>,
	"Other":<? echo json_encode(_("Other")) ?>,
	"Offers":<? echo json_encode(_("Offers")) ?>,
	"Value Sold":<? echo json_encode(_("Value Sold")) ?>,
	"New Customers":<? echo json_encode(_("New Customers")) ?>,
	"Displays all new customers who have signed up, or had their first order, in the past two weeks.":<? echo json_encode(_("Displays all new customers who have signed up, or had their first order, in the past two weeks.")) ?>,
	"Customers with zero orders":<? echo json_encode(_("Customers with zero orders")) ?>,
	"Displays all customers who have signed up but have not yet placed any orders.":<? echo json_encode(_("Displays all customers who have signed up but have not yet placed any orders.")) ?>,
	"One Time Buyers":<? echo json_encode(_("One Time Buyers")) ?>,
	"Displays all customers who have placed only one order.":<? echo json_encode(_("Displays all customers who have placed only one order.")) ?>,
	"Most Frequent Buyers":<? echo json_encode(_("Most Frequent Buyers")) ?>,
	"Displays top 50 customers who have placed the most number of orders.":<? echo json_encode(_("Displays top 50 customers who have placed the most number of orders.")) ?>,
	"Highest Spending Customers":<? echo json_encode(_("Highest Spending Customers")) ?>,
	"Displays top 50 customers who have the highest transactional spend.":<? echo json_encode(_("Displays top 50 customers who have the highest transactional spend.")) ?>,
	"Customers Increasing Orders":<? echo json_encode(_("Customers Increasing Orders")) ?>,
	"Displays all customers who placed more orders this month than the previous month.":<? echo json_encode(_("Displays all customers who placed more orders this month than the previous month.")) ?>,
	"Customers Decreasing Orders":<? echo json_encode(_("Customers Decreasing Orders")) ?>,
	"Displays all customers who placed less orders this month than the previous month.":<? echo json_encode(_("Displays all customers who placed less orders this month than the previous month.")) ?>,
	"Customers Increasing Spend":<? echo json_encode(_("Customers Increasing Spend")) ?>,
	"Displays all customers who spent more this month than the previous month.":<? echo json_encode(_("Displays all customers who spent more this month than the previous month.")) ?>,
	"Customers Decreasing Spend":<? echo json_encode(_("Customers Decreasing Spend")) ?>,
	"Displays all customers who spent less this month than the previous month.":<? echo json_encode(_("Displays all customers who spent less this month than the previous month.")) ?>,
	"Sleeping Customers":<? echo json_encode(_("Sleeping Customers")) ?>,
	"Displays all customers who have previously made at least one order, but haven't ordered for 3 months.":<? echo json_encode(_("Displays all customers who have previously made at least one order, but haven't ordered for 3 months.")) ?>,
	"Displays top 10 most popular items.":<? echo json_encode(_("Displays top 10 most popular items.")) ?>,
	"Item Popularity Increase":<? echo json_encode(_("Item Popularity Increase")) ?>,
	"Displays all items that sold more this month than last month.":<? echo json_encode(_("Displays all items that sold more this month than last month.")) ?>,
	"Item Popularity Decrease":<? echo json_encode(_("Item Popularity Decrease")) ?>,
	"Displays all items that sold less this month than last month":<? echo json_encode(_("Displays all items that sold less this month than last month")) ?>,
	"Highest Grossing Days":<? echo json_encode(_("Highest Grossing Days")) ?>,
	"Display top 10 highest grossing days.":<? echo json_encode(_("Display top 10 highest grossing days.")) ?>,
	"Lowest Grossing Days":<? echo json_encode(_("Lowest Grossing Days")) ?>,
	"Display top 10 lowest grossing days.":<? echo json_encode(_("Display top 10 lowest grossing days.")) ?>,
	"Highest Order Days":<? echo json_encode(_("Highest Order Days")) ?>,
	"Display top 10 highest order days.":<? echo json_encode(_("Display top 10 highest order days.")) ?>,
	"Lowest Order Days":<? echo json_encode(_("Lowest Order Days")) ?>,
	"Display top 10 lowest order days.":<? echo json_encode(_("Display top 10 lowest order days.")) ?>,
	"Highest Grossing Hours":<? echo json_encode(_("Highest Grossing Hours")) ?>,
	"Displays the accumulative total spent, broken down by 24 x 1 hour time slots.":<? echo json_encode(_("Displays the accumulative total spent, broken down by 24 x 1 hour time slots.")) ?>,
	"Highest Order Hours":<? echo json_encode(_("Highest Order Hours")) ?>,
	"Displays the accumulative number of orders, broken down by 24 x 1 hour time slots.":<? echo json_encode(_("Displays the accumulative number of orders, broken down by 24 x 1 hour time slots.")) ?>,
	">1?"years ago":"year ago":<? echo json_encode(_(">1?"years ago":"year ago")) ?>,
	">1?"months ago":"month ago":<? echo json_encode(_(">1?"months ago":"month ago")) ?>,
	"days ago":<? echo json_encode(_("days ago")) ?>,
	"yesterday":<? echo json_encode(_("yesterday")) ?>,
	">1?"hours ago":"hour ago":<? echo json_encode(_(">1?"hours ago":"hour ago")) ?>,
	">1?"minutes ago":"minute ago":<? echo json_encode(_(">1?"minutes ago":"minute ago")) ?>,
	">1?"seconds ago":"second ago":<? echo json_encode(_(">1?"seconds ago":"second ago")) ?>,
	"Contact this customer regarding loyalty programmes":<? echo json_encode(_("Contact this customer regarding loyalty programmes")) ?>,
	"Contact this customer with discounts and special offers":<? echo json_encode(_("Contact this customer with discounts and special offers")) ?>,
	"Contact this customer with newsletters, research and marketing emails":<? echo json_encode(_("Contact this customer with newsletters, research and marketing emails")) ?>,
	"years ago":<? echo json_encode(_("years ago")) ?>,
	"year ago":<? echo json_encode(_("year ago")) ?>,
	"months ago":<? echo json_encode(_("months ago")) ?>,
	"month ago":<? echo json_encode(_("month ago")) ?>,
	"hours ago":<? echo json_encode(_("hours ago")) ?>,
	"hour ago":<? echo json_encode(_("hour ago")) ?>,
	"minutes ago":<? echo json_encode(_("minutes ago")) ?>,
	"minute ago":<? echo json_encode(_("minute ago")) ?>,
	"seconds ago":<? echo json_encode(_("seconds ago")) ?>,
	"second ago":<? echo json_encode(_("second ago")) ?>,
	"Successfully saved delivery settings.":<? echo json_encode(_("Successfully saved delivery settings.")) ?>,
	"Your order is running 15 mins late":<? echo json_encode(_("Your order is running 15 mins late")) ?>,
	"Late Order":<? echo json_encode(_("Late Order")) ?>,
	"Your order is on its way":<? echo json_encode(_("Your order is on its way")) ?>,
	"En-route":<? echo json_encode(_("En-route")) ?>,
	"There is a problem with your order. Please call us":<? echo json_encode(_("There is a problem with your order. Please call us")) ?>,
	"Call us":<? echo json_encode(_("Call us")) ?>,
	"Your address is out of our delivery zone":<? echo json_encode(_("Your address is out of our delivery zone")) ?>,
	"Out of zone":<? echo json_encode(_("Out of zone")) ?>,
	"Sorry, that item is out of stock":<? echo json_encode(_("Sorry, that item is out of stock")) ?>,
	"Out of stock":<? echo json_encode(_("Out of stock")) ?>,
	"Sorry, Your order has been rejected. Please call us":<? echo json_encode(_("Sorry, Your order has been rejected. Please call us")) ?>,
	"Email is invalid":<? echo json_encode(_("Email is invalid")) ?>,
	"BUY":<? echo json_encode(_("BUY")) ?>,
	" DAY FREE TRIAL":<? echo json_encode(_(" DAY FREE TRIAL")) ?>,
	"START TRIAL":<? echo json_encode(_("START TRIAL")) ?>,
	"You will be contacted shortly by a member of our team. You can manage subscriptions from your <a href='/accountSettings#/subscription'>account settings page.</a>":<? echo json_encode(_("You will be contacted shortly by a member of our team. You can manage subscriptions from your <a href='/accountSettings#/subscription'>account settings page.</a>")) ?>,
	"Please add a payment method to your account in order to subscribe to Premium Features":<? echo json_encode(_("Please add a payment method to your account in order to subscribe to Premium Features")) ?>,
	"ADD CARD":<? echo json_encode(_("ADD CARD")) ?>,
	"Your card will be charged ":<? echo json_encode(_("Your card will be charged ")) ?>,
	" for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page.":<? echo json_encode(_(" for this transaction. <br/> You may cancel this Premium Feature at any time from your account settings page.")) ?>,
}
