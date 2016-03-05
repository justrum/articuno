Template.navbar.created = function() {
	Session.setDefault('showBrandDropdown', false);
	Tracker.autorun(() => {
		if (Session.get('showBrandDropdown') === true) {
			Tracker.afterFlush(() => {
				$('.brand-dropdown').dropdown();
			});
		}
	});
}

Template.navbar.events({
	'click a.logout': () => {
		Meteor.logout();
	},
	'showBrandDropdown nav.navbar': () => {
		Session.set('showBrandDropdown', true);
	},
	'hideBrandDropdown nav.navbar': () => {
		Session.set('showBrandDropdown', false);
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
