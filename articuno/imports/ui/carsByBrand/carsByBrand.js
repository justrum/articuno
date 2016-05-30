import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { classNames } from 'meteor/maxharris9:classnames';

import { Cars } from '../../api/Cars/cars.js';
import { CarBrands } from '../../api/CarBrands/carBrands.js';

import '../carGrid/carGrid.js';
import '../fbSideBar/fbSideBar.js';
import './carsByBrand.html';

Template.carsByBrand.helpers({
	cars: () => {
		const brandId = Router.current().params.brandid;
		return Cars.find({
			brandId,
		});
	},
	brand: () => {
		const brandId = Router.current().params.brandid;
		return CarBrands.findOne({
			_id: brandId,
		});
	},
	gridClasses: () => {
		const user = Meteor.user();
		if (user && user.services && user.services.facebook) {
			return classNames('twelve', 'wide');
		}
		return classNames('');
	},
	carsGridClasses: () => {
		const user = Meteor.user();
		if (user && user.services && user.services.facebook) {
			return classNames('three');
		}
		return classNames('four');
	},
});
