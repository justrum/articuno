import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Cars } from '../../api/Cars/cars.js';
import { removeComment } from '../../api/Comments/methods.js';

Template.publicationComments.helpers({
	commentAuthor() {
		return Meteor.users.findOne(this.authorId);
	},
	canDeleteComment() {
		const car = Cars.findOne({
			_id: this.carId,
		});

		return this.authorId === Meteor.userId() || car.ownerId === Meteor.userId();
	},
});

Template.publicationComments.events({
	'click .remove-comment'(event, instance) {
		removeComment.call({
			commentId: this._id,
		});
	},
});
