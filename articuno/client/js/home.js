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
