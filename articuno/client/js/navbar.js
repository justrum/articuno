Template.navbar.created = function() {
	Session.setDefault('showBrandDropdown', false);
};

Template.navbar.rendered = function() {
	$('.brand-dropdown').dropdown();
};

Template.navbar.events({
	'click a.logout': () => {
		Meteor.logout();
	},
	'showBrandDropdown nav.navbar': () => {
		Session.set('showBrandDropdown', true);
	},
	'hideBrandDropdown nav.navbar': () => {
		Session.set('showBrandDropdown', false);
	},
	'click .brand-item': function() {
		Router.go(`/home/${this._id}`);
	}
});

Template.navbar.helpers({
	brands: () => {
		return CarBrands.find();
	},
	amountCarsBrand: function() {
		return Cars.find({
			brandId: this._id,
			isActive: true
		}).count();
	},
	showBrandDropdown: () => {
		return Session.get('showBrandDropdown');
	}
});
