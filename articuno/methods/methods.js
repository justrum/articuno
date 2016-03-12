//meteor methods here
Meteor.methods({
	addFavorite: function(carId) {
		check(carId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}
		if (UserFavorites.find({
				carId: carId,
				owner: Meteor.userId()
			}).count() > 0) {
			throw new Meteor.Error('Carro ya esta agregado en favoritos');
		}
		UserFavorites.insert({
			carId: carId,
			owner: Meteor.userId()
		});
	},
	removeFavorite: function(favId) {
		check(favId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}
		UserFavorites.remove(favId);
	}
});
