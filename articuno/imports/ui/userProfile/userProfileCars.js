import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { CarBrands } from '../../api/CarBrands/carBrands.js';
import { Cities } from '../../api/Cities/cities.js';
import { Comments } from '../../api/Comments/comments.js';
import './userProfileCars.html';

Template.userProfileCars.onRendered(function userProfileCarsOnRendered() {
	$('.car-item .dimmable.image').dimmer({
		on: 'hover',
	});
});

Template.userProfileCars.helpers({
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
});
