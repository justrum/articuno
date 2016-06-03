import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Comments } from './comments.js';

const unknownError = 'Ooops! Ha ocurrido un error, favor intentar su operacion de nuevo';

export const addComment = new ValidatedMethod({
	name: 'comments.addComment',
	validate: new SimpleSchema({
		carId: { type: String },
		commentText: { type: String, max: 2000 },
	}).validator(),
	run({ carId, commentText }) {
		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}
		Comments.insert({
			carId,
			authorId: this.userId,
			text: commentText,
			createdAt: new Date(),
		}, (error) => {
			if (error) {
				throw new Meteor.Error(unknownError);
			}
		});
	},
});

export const removeComment = new ValidatedMethod({
	name: 'comments.removeComment',
	validate: new SimpleSchema({
		commentId: { type: String },
	}).validator(),
	run({ commentId }) {
		if (!this.userId) {
			throw new Meteor.Error('Necesita iniciar sesión para realizar esta operación.');
		}
		Comments.remove(commentId);
	},
});
