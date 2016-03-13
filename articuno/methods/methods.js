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
	},
	addComment: function(userId, carId, commentText) {
		check(commentText, String);
		check(userId, String);
		check(carId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}

		if (Meteor.userId() !== userId) {
			throw new Meteor.Error('Solo puede agregar comentarios con su propio usuario');
		}

		Comments.insert({
			carId: carId,
			authorId: userId,
			text: commentText,
			createdAt: new Date()
		});
	},
	deleteComment: function(commentId, userId) {
		check(commentId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}

		Comments.remove(commentId);
	}
});
