//meteor methods here
const unknownError = 'Ooops! Ha ocurrido un error, favor intentar su operacion de nuevo';
Meteor.methods({
    addFavorite(carId) {
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
        }, (error, result) => {
            if (error) {
                throw new Meteor.Error(unknownError);
            }
        });
    },
    removeFavorite(favId) {
        check(favId, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
        }
        UserFavorites.remove(favId);
    },
    addComment(userId, carId, commentText) {
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
        }, (error, result) => {
            if (error) {
                throw new Meteor.Error(unknownError);
            }
        });
    },
    deleteComment(commentId, userId) {
        check(commentId, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
        }

        Comments.remove(commentId);
    },
    addFollow(followUserId) {
        check(followUserId, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
        }

        if (Meteor.userId() === followUserId) {
            throw new Meteor.Error('Solo puedes seguir a usuarios distintos al tuyo.');
        }

        const userFollowsObj = UserFollows.findOne({
            owner: Meteor.userId(),
            follows: followUserId
        });

        const isAlreadyFollowing = userFollowsObj !== undefined;

        if (isAlreadyFollowing === true) {
            throw new Meteor.Error('Ya esta siguiendo a este usuario!');
        }

        if (!userFollowsObj) {
            UserFollows.insert({
                owner: Meteor.userId(),
                follows: followUserId
            }, (error, result) => {
                if (error) {
                    throw new Meteor.Error(unknownError);
                }
            });
        }
    },
    removeFollow(followUserId) {
        check(followUserId, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
        }

        if (Meteor.userId() === followUserId) {
            throw new Meteor.Error('Solo puedes dejar de seguir a usuarios distintos al tuyo.');
        }

        const userFollowsObj = UserFollows.findOne({
            owner: Meteor.userId(),
            follows: followUserId
        });

        if (!userFollowsObj) {
            throw new Meteor.Error('Usuario no encontrado');
        }
		
		UserFollows.remove(userFollowsObj._id);
    }
});