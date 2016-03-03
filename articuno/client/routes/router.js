let setNavbarActiveItem = (item) => {
	$('.navbar a').removeClass('active');
	$(`.navbar a.${item}`).addClass('active');
};

Router.configure({
	layoutTemplate: 'ApplicationLayout',
	loadingTemplate: 'ApplicationLoading',
	notFoundTemplate: 'ApplicationNotFound'
});

Router.route('/', function() {
	this.redirect('/home');
});

Router.route('/home', {
	waitOn: () => {
		return Meteor.subscribe('cars');
	},
	action: function() {
		setNavbarActiveItem('home');
		this.render('home');
	}
});

Router.route('/register', {
	action: function() {
		setNavbarActiveItem('register');
		this.render('register');
	}
});

Router.route('/car/:carid', {
	waitOn: function() {
		const commentLimit = 10;
		return Meteor.subscribe('carDetails', this.params.carid, 10);
	},
	action: function() {
		this.render('carDetails');
	}
});
