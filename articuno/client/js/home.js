Template.home.helpers({
	cars: () => {
		return Cars.find({}, {
			limit: 20
		});
	},
	amountCars: () => {
		return Cars.find().count();
	},
	gridClasses: () => {
		let user = Meteor.user();
		if (user && user.services && user.services.facebook) {
			return classNames('twelve', 'wide');
		}
		return classNames('');
	},
	carsGridClasses: () => {
		let user = Meteor.user();
		if (user && user.services && user.services.facebook) {
			return classNames('three');
		}
		return classNames('four');
	}
});