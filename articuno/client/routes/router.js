let setNavbarActiveItem = (item) => {
	$('.navbar a').removeClass('active');
	$(`.navbar a.${item}`).addClass('active');
};

Router.configure({
	layoutTemplate: 'ApplicationLayout'
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