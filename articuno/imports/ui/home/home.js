import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Cars } from '../../api/Cars/cars.js';

import '../carGrid/carGrid.js';
import './home.html';

Template.home.rendered = function rendered() {
	$('.brand-dropdown').dropdown();
	$('.brand-dropdown').dropdown('restore default text');
};

Template.home.helpers({
	cars() {
		return Cars.find({
			isActive: true,
		}, {
			limit: 20,
		});
	},
	amountCars() {
		return Cars.find({
			isActive: true,
		}, {
			limit: 20,
		}).count();
	},
});
