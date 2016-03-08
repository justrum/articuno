Template.favorites.helpers({
	cars: () => {
		const favCarIds = UserFavorites.find({
			owner: Meteor.userId()
		}).map((favorite) => {
			return favorite.carId;
		});

		return Cars.find({
			_id: {
				$in: favCarIds
			}
		});
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
