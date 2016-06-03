import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';

import { CarBrands } from '../../api/CarBrands/carBrands.js';
import { Cars } from '../../api/Cars/cars.js';

import '../login/login.js';
import './navbar.html';

Template.navbar.onCreated(function navbarOnCreated() {
	Session.setDefault('showBrandDropdown', false);
});

Template.navbar.onRendered(function navbarOnRendered() {
	$('.brand-dropdown').dropdown();
});

Template.navbar.events({
	'click a.logout': () => {
		Meteor.logout();
	},
	'showBrandDropdown nav.navbar'(event, instance) {
		Session.set('showBrandDropdown', true);
	},
	'hideBrandDropdown nav.navbar'(event, instance) {
		Session.set('showBrandDropdown', false);
	},
	'click .brand-item'(event, instance) {
		Router.go(`/home/${this._id}`);
	}
});

Template.navbar.helpers({
	brands() {
		return CarBrands.find();
	},
	amountCarsBrand() {
		return Cars.find({
			brandId: this._id,
			isActive: true,
		}).count();
	},
	showBrandDropdown() {
		return Session.get('showBrandDropdown');
	},
});
