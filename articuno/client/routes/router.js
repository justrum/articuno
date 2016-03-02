Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
	this.redirect('/home');
});

Router.route('/home', {
	waitOn: function() {
		return Meteor.subscribe('cars');
	},
	action: function() {
		this.render('home');
	}
});
