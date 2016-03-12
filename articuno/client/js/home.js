Template.home.rendered = function() {
	$('.brand-dropdown').dropdown();
};

Template.home.helpers({
	cars: () => {
		return Cars.find({
			isActive: true
		}, {
			limit: 20
		});
	},
	amountCars: () => {
		return Cars.find({
			isActive: true
		}, {
			limit: 20
		}).count();
	}
});
