import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../carGrid/carGrid.js';
import '../filterComponent/filterComponent.js';
import '../fbSideBar/fbSideBar.js';
import './newCars.html';

import { Cars } from '../../api/Cars/cars.js';

Template.newCars.onCreated(function newCarsOnCreated() {
	this.cars = new ReactiveVar([]);
	const cars = Cars.find({
		isActive: true,
		isNew: true,
	});
	this.cars.set(cars);
});

Template.newCars.helpers({
	cars() {
		return Template.instance().cars.get();
	},
	amountCars() {
		return Template.instance().cars.get().count();
	},
});

Template.newCars.events({
	'filterCars .cars-sidebar'(ev, template, cars) {
		if (!cars) {
			return;
		}
		template.cars.set(cars);
	},
});
