angular.module('features').constant('FEATURES', [
	{
		description: <?echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 1,
		name: <? echo json_encode(_("My Order App Assisant"))?>,
		price: 10,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>,<?echo json_encode(_("Feature 3"))?>,<?echo json_encode(_("Feature 4"))?>,<?echo json_encode(_("Feature 5"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/icon_cog.png'
	},
	{
		description: <? echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 2,
		name: <? echo json_encode(_("My Order App Loyalty"))?>,
		price: 20,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>,<?echo json_encode(_("Feature 3"))?>,<?echo json_encode(_("Feature 4"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/icon_pin.png'
	},
	{
		description: <? echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 3,
		name: <? echo json_encode(_("My Order App Independant"))?>,
		price: 30,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>,<?echo json_encode(_("Feature 3"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/icon_star.png'
	},
	{
		description: <? echo json_encode(_("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec eros et justo consectetur sodales. Sed dictum turpis sit amet sapien varius lobortis. Proin mi nibh, euismod eget justo quis, vestibulum molestie turpis. Integer sollicitudin tortor e")) ?>,
		id: 4,
		name: <? echo json_encode(_("Know your customers"))?>,
		price: 40,
		descriptionFeatures :[<?echo json_encode(_("Feature 1"))?>,<?echo json_encode(_("Feature 2"))?>],
		promoImg: "/img/dashboard.png",
		icon:'/img/icon_share.png'
	}	
])