var features = [
	{
		description: <?echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 1,
		name: <? echo json_encode(_("Assisant"))?>,
		upfrontPrice: 10,
		subscriptionPrice:5,
		showAppTitle:true,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>,<?echo json_encode(_("Feature 3"))?>,<?echo json_encode(_("Feature 4"))?>,<?echo json_encode(_("Feature 5"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/asisstant-icon.png'
	},
	{
		description: <? echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 2,
		name: <? echo json_encode(_("Loyalty"))?>,
		upfrontPrice: 20,
		subscriptionPrice:6,
		showAppTitle:true,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>,<?echo json_encode(_("Feature 3"))?>,<?echo json_encode(_("Feature 4"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/loyalty-icon.png'
	},
	{
		description: <? echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 3,
		name: <? echo json_encode(_("Independant"))?>,
		upfrontPrice: 30,
		subscriptionPrice:7,
		showAppTitle:true,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>,<?echo json_encode(_("Feature 3"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/independent-icon.png'
	},
	{
		description: <? echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 4,
		name: <? echo json_encode(_("Know your customers"))?>,
		upfrontPrice: 40,
		subscriptionPrice:8,
		showAppTitle:false,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/KYC-icon.png'
	}	
];

if (window.angular)
	angular.module('features').constant('FEATURES', features)