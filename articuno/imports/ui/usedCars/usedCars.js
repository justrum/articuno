import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../carGrid/carGrid.js';
import '../filterComponent/filterComponent.js';
import '../fbSideBar/fbSideBar.js';
import './usedCars.html';

import { Cars } from '../../api/Cars/cars.js';

Template.usedCars.onCreated(function usedCarsOnCreated() {
	this.cars = new ReactiveVar([]);
	const cars = Cars.find({
		isActive: true,
		isNew: false,
	});
	this.cars.set(cars);
});

Template.usedCars.helpers({
	cars() {
		return Template.instance().cars.get();
	},
	amountCars() {
		return Template.instance().cars.get().count();
	},
});

Template.usedCars.events({
	'filterCars .cars-sidebar'(ev, template, cars) {
		if (!cars) {
			return;
		}
		template.cars.set(cars);
	},
});
