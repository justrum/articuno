const setNavbarActiveItem = (item) => {
	$('.navbar a').removeClass('active');
	$(`.navbar a.${item}`).addClass('active');
};

Router.configure({
	layoutTemplate: 'applicationLayout',
	loadingTemplate: 'applicationLoading',
	notFoundTemplate: 'applicationNotFound',
	waitOn: function() {
		return [
			Meteor.subscribe('userData'),
			Meteor.subscribe('carbrands'),
			Meteor.subscribe('cities'),
			Meteor.subscribe('cars'),
			Meteor.subscribe('userFavorites'),
			Meteor.subscribe('userFollows')
		];
	}
});

Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
}, {
	only: ['favorites']
});

Router.route('/', function() {
	this.redirect('/home');
});

Router.route('/home', {
	action: function() {
		setNavbarActiveItem('home');
		$('nav.navbar').trigger('showBrandDropdown');
		this.render('home');
	}
});

Router.route('/home/:brandid', {
	action: function() {
		setNavbarActiveItem('home');
		$('nav.navbar').trigger('showBrandDropdown');
		this.render('carsByBrand');
	}
});

Router.route('/register', {
	action: function() {
		setNavbarActiveItem('register');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('register');
	}
});

Router.route('/car/:carid', {
	action: function() {
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('carDetails');
	}
});

Router.route('/favorites', {
	action: function() {
		setNavbarActiveItem('favorites');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('favorites');
	}
});

Router.route('/newCars', {
	action: function() {
		setNavbarActiveItem('newCars');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('newCars');
	}
});

Router.route('/usedCars', {
	action: function() {
		setNavbarActiveItem('usedCars');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('usedCars');
	}
});

Router.route('/profile/:userid', {
	action: function() {
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('userProfile');
	}
});
