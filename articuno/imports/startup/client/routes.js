import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';

import '../../ui/helpers.js';

const setNavbarActiveItem = (item) => {
	$('.navbar a').removeClass('active');
	$(`.navbar a.${item}`).addClass('active');
};

Router.configure({
	layoutTemplate: 'applicationLayout',
	loadingTemplate: 'applicationLoading',
	notFoundTemplate: 'applicationNotFound',
	waitOn: function waitOn() {
		return [
			Meteor.subscribe('userData'),
			Meteor.subscribe('carbrands'),
			Meteor.subscribe('cities'),
			Meteor.subscribe('cars'),
			Meteor.subscribe('userFavorites'),
			Meteor.subscribe('userFollows'),
		];
	},
});

Router.onBeforeAction(function onBeforeAction() {
	if (!Meteor.userId()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
}, {
	only: ['favorites'],
});

Router.route('/', function render() {
	this.redirect('/home');
});

Router.route('/home', {
	action: function action() {
		setNavbarActiveItem('home');
		$('nav.navbar').trigger('showBrandDropdown');
		this.render('home');
	},
});

Router.route('/home/:brandid', {
	action: function action() {
		setNavbarActiveItem('home');
		$('nav.navbar').trigger('showBrandDropdown');
		this.render('carsByBrand');
	},
});

Router.route('/register', {
	action: function action() {
		setNavbarActiveItem('register');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('register');
	},
});

Router.route('/car/:carid', {
	action: function action() {
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('carDetails');
	},
});

Router.route('/favorites', {
	action: function action() {
		setNavbarActiveItem('favorites');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('favorites');
	},
});

Router.route('/newCars', {
	action: function action() {
		setNavbarActiveItem('newCars');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('newCars');
	},
});

Router.route('/usedCars', {
	action: function action() {
		setNavbarActiveItem('usedCars');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('usedCars');
	},
});

Router.route('/profile/:userid', {
	action: function action() {
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('userProfile');
	},
});
