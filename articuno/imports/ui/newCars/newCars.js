import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Cars } from '../../api/Cars/cars.js';

import './newCars.html';

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
