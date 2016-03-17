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
	}
});
