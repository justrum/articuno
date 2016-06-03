import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { toastr } from 'meteor/pcel:toastr';

import './carGrid.html';
import { CarBrands } from '../../api/CarBrands/carBrands.js';
import { Comments } from '../../api/Comments/comments.js';
import { Cities } from '../../api/Cities/cities.js';
import { UserFavorites } from '../../api/UserFavorites/userFavorites.js';
import { addFavorite, removeFavorite } from '../../api/UserFavorites/methods.js';

Template.carGrid.onRendered(function carGridOnRendered() {
	$('.car-card .dimmable.image').dimmer({
		on: 'hover',
	});
});

Template.carGrid.helpers({
	carOwner() {
		return Meteor.users.findOne(this.ownerId);
	},
	carBrand() {
		return CarBrands.findOne({
			_id: this.brandId,
		});
	},
	carCity() {
		return Cities.findOne({
			_id: this.cityId,
		});
	},
	amountComments() {
		return Comments.find({
			carId: this._id,
		}).count();
	},
	isFavorite() {
		return UserFavorites.findOne({
			owner: Meteor.userId(),
			carId: this._id,
		}) !== undefined;
	},
});

Template.carGrid.events({
	'click .favorite-car'(event, instance) {
		addFavorite.call({
			carId: this._id,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
		});
	},
	'click .unfavorite-car'(event, instance) {
		const favorite = UserFavorites.findOne({
			owner: Meteor.userId(),
			carId: this._id,
		});
		// removeFavorite.call({
		// 	_id: favorite._id,
		// });
	},
});
