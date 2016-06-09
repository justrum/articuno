import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';
import { toastr } from 'meteor/pcel:toastr';

import { Cars } from '../../api/Cars/cars.js';
import { CarBrands } from '../../api/CarBrands/carBrands.js';
import { Comments } from '../../api/Comments/comments.js';
import { addComment } from '../../api/Comments/methods.js';

import './carDetails.html';

Template.carDetails.helpers({
	car() {
		const carId = Router.current().params.carid;
		return Cars.findOne({
			_id: carId,
			isActive: true,
		});
	},
	carBrand() {
		return CarBrands.findOne({
			_id: this.brandId,
		});
	},
	comments() {
		const carId = Router.current().params.carid;
		return Comments.find({
			carId,
		}, {
			limit: 10,
		});
	},
	user() {
		const carId = Router.current().params.carid;
		const car = Cars.findOne({
			_id: carId,
			isActive: true,
		});
		const user = Meteor.users.findOne({
			_id: car.ownerId,
		});
		return user;
	},
	userEmail() {
		const carId = Router.current().params.carid;
		const car = Cars.findOne({
			_id: carId,
			isActive: true,
		});
		const user = Meteor.users.findOne({
			_id: car.ownerId,
		});
		return user.emails[0].address || 'N/A';
	},
});

Template.carDetails.events({
	'click .add-comment'(event, instance) {
		const comment = $('.comment-box textarea').val();
		if (comment && comment.trim().length === 0) {
			return;
		}
		addComment.call({
			carId: this._id,
			commentText: comment,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			$('.comment-box textarea').val('');
		});
	},
});
