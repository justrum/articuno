Template.navbar.events({
	'click a.logout': () => {
		Meteor.logout();
	}
});