import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { UserFavorites } from './userFavorites.js';

const unknownError = 'Ooops! Ha ocurrido un error, favor intentar su operacion de nuevo';

export const addFavorite = new ValidatedMethod({
	name: 'userFavorite.add',
	validate: new SimpleSchema({
		carId: { type: String },
	}).validator(),
	run({ carId }) {
		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}
		if (UserFavorites.find({
			carId,
			owner: this.userId,
		}).count() > 0) {
			throw new Meteor.Error('Carro ya esta agregado en favoritos');
		}
		UserFavorites.insert({
			carId,
			owner: this.userId,
		}, (error) => {
			if (error) {
				throw new Meteor.Error(unknownError);
			}
		});
	},
});

export const removeFavorite = new ValidatedMethod({
	name: 'userFavorite.remove',
	validate: new SimpleSchema({
		favId: { type: String },
	}).validator(),
	run({ favId }) {
		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}
		const isOwner = UserFavorites.findOne({
			owner: this.userId,
		}) !== undefined;

		if (!isOwner) {
			throw new Meteor.Error('Solo el dueño del favorito puede removerlo de la lista de favoritos');
		}

		UserFavorites.remove(favId);
	},
});
