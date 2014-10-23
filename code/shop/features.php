<?php 
	session_start();
?>

var features = [
	{
		id: 1,
		description: <?echo json_encode(_("We understand that running a successful business such as yours can be time-consuming and that there aren't always enough hours in the day. That is why we offer Assistant, so we can concentrate on supporting your new app and you can concentrate on your business.")) ?>,
		shortDescription: <? echo json_encode(_("Get some help managing your app, from set-up to ongoing maintenance."))?>,	
		name: <? echo json_encode(_("Assistant"))?>,
		upfrontPrice: 100,
		subscriptionPrice:10,
		contractMonths:3,
		descriptionFeatures :[<?echo json_encode(_("Set up your branded app in My Order App "))?>,
													<?echo json_encode(_("Manage your menu, pricing, payments and artwork"))?>,
													<?echo json_encode(_("Set up extra staff users"))?>,
													<?echo json_encode(_("1 set of changes per month"))?>],
		<!-- promoImgs: ["/img/dashboard.png","/img/dashboard1.png","/img/dashboard2.png"], -->
		icon:'/img/asisstant-icon.png',
		trialPeriod:0,		
		active:true,
		$terms:{
			purchase:'/terms/140702 Premium Services - Assist.pdf'
		}
	},
	{
		id: 2,
		description: <? echo json_encode(_("Preoday already provides you with your own branded app in the 'My Order App' directory.  It’s free of charge, you can be up and running within 30 minutes, and it avoids the cost and hassle of submissions to Apple, Google and Windows Store.  However, we understand that some businesses want to see their app in these places too, so with the Independent service we do it for you, and at a much lower cost than doing it yourself.")) ?>,
		shortDescription: <? echo json_encode(_("Find your venue in the App Store, Google Play and Windows Phone Store."))?>,		
		name: <? echo json_encode(_("Independent"))?>,
		upfrontPrice: 1000,
		subscriptionPrice:50,		
		contractMonths:12,
		trialPeriod:0,
		descriptionFeatures :[<?echo json_encode(_("Create, submit, manage and maintain your own branded app in the App Store, Google Play and Windows Phone Store "))?>,
													<?echo json_encode(_("Manage and resolve any issues or queries"))?>,
													<?echo json_encode(_("Provide quarterly updates/changes to the app"))?>],
		<!-- promoImgs: ["/img/dashboard.png","/img/dashboard1.png","/img/dashboard2.png"], -->
		icon:'/img/independent-icon.png',
		active:true,
		$terms:{
			purchase:'/terms/140702 Premium Services - Independent.pdf'
		}
	},
	{
		id: 3,
		description: <? echo json_encode(_("Now that customers can order at your venue on their smartphones, you literally have them at their fingertips. So the best way to keep them interested is to use Loyalty and offer them exclusive loyalty programmes.")) ?>,
		shortDescription: <? echo json_encode(_("Keep customers coming back by offering them exclusive loyalty programmes."))?>,		
		name: <? echo json_encode(_("Loyalty"))?>,
		upfrontPrice: 0,
		subscriptionPrice:0,
		trialPeriod:0,
		descriptionFeatures :[<?echo json_encode(_("Mobile Stamp Cards"))?>,
													<?echo json_encode(_("Points System"))?>,
													<?echo json_encode(_("Sales analyser"))?>,
													<?echo json_encode(_("Spend bands"))?>],
		<!-- promoImgs: ["/img/dashboard.png","/img/dashboard1.png","/img/dashboard2.png"], -->
		icon:'/img/loyalty-icon.png',
		active:false
	},	
	{
		id: 4,
		description: <? echo json_encode(_("Using Preoday, you move closer to your customers. With our Know Your Customer module you will have the data you need to manage and market to them online.  Information is presented in exciting charts and in an easy-to-use format, allowing fresh insights into buying patterns and improved customer service.  Whether you want to offer special deals to favoured customers, manage stock flows better, understand where new business is coming from, or simply plot your app's growth, it’s all there and ready for you in Know Your Customer.")) ?>,
		shortDescription: <? echo json_encode(_("Get extensive reports and analytics on your mobile customers."))?>,		
		name: <? echo json_encode(_("Know your customer"))?>,
		upfrontPrice: 0,
		subscriptionPrice:20,	
		trialPeriod:30,
		descriptionFeatures :[<?echo json_encode(_("Customer profiles and order histories"))?>,
													<?echo json_encode(_("Order analytics and easy-to-use charts"))?>,
													<?echo json_encode(_("Standard and customised reporting"))?>,
													<?echo json_encode(_("Reports across multiple outlets"))?>,
													<?echo json_encode(_("Excel downloads	"))?>],
		promoImgs: ["/img/KYC_screenshot1.jpg","/img/KYC_screenshot3.jpg","/img/KYC_screenshot4.jpg","/img/KYC_screenshot5.jpg"],
		icon:'/img/KYC-icon.png',
		$link:'/kyc',
		active:true,
		$terms:{
			trial:'/terms/140702 Premium Services - KYC Trial Period.pdf',
			purchase:'/terms/140702 Premium Services - KYC.pdf'
		}
	},	
	{
		id: 6,
		description: <? echo json_encode(_("Web Order gives your customers the chance to be able to place orders online from your own dedicated web page. Use it as your website, or link to it from an existing website or social media page, and give your business extra presence and functionality on the web. It is managed from the same dashboard as your mobile app, so every update you make is automatically synced across both platforms.")) ?>,
		shortDescription: <? echo json_encode(_("Your own individual web page that allows customers to place orders online."))?>,
		name: <? echo json_encode(_("Web Order"))?>,
		upfrontPrice: 0,
		subscriptionPrice:25,
		trialPeriod: 3,
		descriptionFeatures :[<?echo json_encode(_("Have your own branded webpage for customers to place web-orders"))?>,
							  <?echo json_encode(_("Can be updated and managed in real-time"))?>,
							  <?echo json_encode(_("Automatically syncs with your mobile app"))?>,
							  <?echo json_encode(_("No commission on orders"))?>,
							],
		icon:'/img/weborders-icon.png',
		active:true,
		modal: {
			success: {
				content: [<?echo json_encode(_("Customers can now place orders online by visiting:")); ?>,
						  <?echo json_encode("<a class='linkSuccessShop' href='http://" . $_SERVER['HTTP_HOST'] . "/" . str_replace(' ', '-', $_SESSION['venue_name']) . "'>http://" . $_SERVER['HTTP_HOST'] . "/" . str_replace(' ', '-', $_SESSION['venue_name']) . "</a>"); ?>
						 ]
			}
		},
		$terms:{
			purchase:'/terms/140702 Premium Services - Web Order and Web Order Plus.pdf'
		}		
	},
	{
		id: 7,
		description: <? echo json_encode(_("Upgrade your Web Orders page with a customised domain name of your choosing. This could be the name of your restaurant or something else relevant. A memorable web address can make it easier for customers to find you online and strengthens your brand.")) ?>,
		shortDescription: <? echo json_encode(_("Upgrade Web Order with a customised web address, chosen by you"))?>,
		name: <? echo json_encode(_("Web Order PLUS"))?>,
		upfrontPrice: 0,
		subscriptionPrice:5,
		trialPeriod:0,
		descriptionFeatures :[<?echo json_encode(_("Have your own branded webpage for customers to place web-orders"))?>,
							   <?echo json_encode(_("Can be updated and managed in real-time"))?>,
							   <?echo json_encode(_("Automatically syncs with your mobile app"))?>,
							   <?echo json_encode(_("No commission on orders"))?>,
							   <?echo json_encode(_("Choose your own customised domain name"))?>,
							],
		icon:'/img/weborders-icon-plus.png',
		active:true,
		depends: [6],
		modal: {
			success: {
				content: <?echo json_encode(_("A member of our team will be in touch very shortly to register your custom domain name.")); ?>
			}
		},		
		$terms:{
			purchase:'/terms/140702 Premium Services - Web Order and Web Order Plus.pdf'
		}
	},		
	{
		id: 5,
		description: <? echo json_encode(_("Preoday is not only for small independent companies.  At its heart, Preoday is a robust, open and scale-able mobile ordering platform ideal for the business and performance needs of the world’s largest customers. It is an off-the-shelf solution designed from inception for integrating with your firm’s existing ePOS systems, payment processors, booking systems, website, and loyalty and marketing platforms to offer a complete mobile experience.  Why not get in touch and find out more?")) ?>,
		shortDescription: <? echo json_encode(_("A mobile ecommerce platform to meet the integration, marketing and management needs of larger businesses."))?>,		
		name: <? echo json_encode(_("Enterprise"))?>,
		descriptionFeatures :[<?echo json_encode(_("A ready-built, fully-equipped mobile ecommerce platform."))?>,
													<?echo json_encode(_("Real-time executive tools and dashboards for managing multiple branches and outlets."))?>,
													<?echo json_encode(_("API and tools for rapid integration with third party systems."))?>,
													<?echo json_encode(_("Consulting Services and, where necessary, bespoke development"))?>,
													<?echo json_encode(_("Maintenance and support"))?>],
		<!-- promoImgs: ["/img/dashboard.png","/img/dashboard1.png","/img/dashboard2.png"], -->
		icon:'/img/Enterprise-icon.png',
		getInTouch: true,
		active:true,
	}	
];

features.sort(function(a, b){
			if (a.active && b.active)
				return 0
			else if (a.active)
				return -1
			else 
				return 1
})
if (window.angular)
	angular.module('features',[]).constant('FEATURES', features)