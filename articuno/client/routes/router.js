let setNavbarActiveItem = (item) => {
	$('.navbar a').removeClass('active');
	$(`.navbar a.${item}`).addClass('active');
};

Router.configure({
	layoutTemplate: 'ApplicationLayout',
	loadingTemplate: 'ApplicationLoading',
	notFoundTemplate: 'ApplicationNotFound',
	waitOn: function() {
		return [
			Meteor.subscribe('userData'),
			Meteor.subscribe('carbrands'),
			Meteor.subscribe('cities'),
			Meteor.subscribe('cars')
		]
	}
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

Router.route('/register', {
	action: function() {
		setNavbarActiveItem('register');
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('register');
	}
});

Router.route('/car/:carid', {
	waitOn: function() {
		const commentLimit = 10;
		return Meteor.subscribe('carDetails', this.params.carid, 10);
	},
	action: function() {
		$('nav.navbar').trigger('hideBrandDropdown');
		this.render('carDetails');
	}
});
