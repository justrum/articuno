import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { UserFollows } from './userFollows.js';

const unknownError = 'Ooops! Ha ocurrido un error, favor intentar su operacion de nuevo';

export const addFollow = new ValidatedMethod({
	name: 'userFollows.addFollow',
	validate: new SimpleSchema({
		followUserId: { type: String },
	}).validator(),
	run({ followUserId }) {
		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}

		if (this.userId === followUserId) {
			throw new Meteor.Error('Solo puedes seguir a usuarios distintos al tuyo.');
		}

		const userFollowsObj = UserFollows.findOne({
			owner: this.userId,
			follows: followUserId,
		});

		const isAlreadyFollowing = userFollowsObj !== undefined;

		if (isAlreadyFollowing === true) {
			throw new Meteor.Error('Ya esta siguiendo a este usuario!');
		}

		if (!userFollowsObj) {
			UserFollows.insert({
				owner: this.userId,
				follows: followUserId,
			}, (error) => {
				if (error) {
					throw new Meteor.Error(unknownError);
				}
			});
		}
	},
});

export const removeFollow = new ValidatedMethod({
	name: 'userFollows.removeFollow',
	validate: new SimpleSchema({
		followUserId: { type: String },
	}).validator(),
	run({ followUserId }) {
		 if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}

		if (this.userId === followUserId) {
			throw new Meteor.Error('Solo puedes dejar de seguir a usuarios distintos al tuyo.');
		}

		const userFollowsObj = UserFollows.findOne({
			owner: this.userId,
			follows: followUserId,
		});

		if (!userFollowsObj) {
			throw new Meteor.Error('Usuario no encontrado');
		}

		UserFollows.remove(userFollowsObj._id);
	},
});
