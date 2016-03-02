Template.home.rendered = () => {
	if (Meteor.user()) {
		$('.car-card .image').dimmer({
			on: 'hover'
		});
	}
};
Template.home.helpers({
	cars: () => {
		return Cars.find({}, {
			limit: 20
		});
	},
	amountCars: () => {
		return Cars.find().count();
	}
});
