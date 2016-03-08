Template.carGrid.rendered = () => {
	$('.car-card .dimmable.image').dimmer({
		on: 'hover'
	});
};

Template.carGrid.helpers({
	carOwner: function() {
		return Meteor.users.findOne(this.ownerId);
	},
	carBrand: function() {
		return CarBrands.findOne({
			_id: this.brandId
		});
	},
	carCity: function() {
		return Cities.findOne({
			_id: this.cityId
		});
	},
	amountComments: function() {
		return Comments.find({
			carId: this._id
		}).count();
	},
	isFavorite: function() {
		return UserFavorites.findOne({
			owner: Meteor.userId(),
			carId: this._id
		}) !== undefined;
	}
});

Template.carGrid.events({
	'click .favorite-car': function() {
		Meteor.call('addFavorite', this._id);
	},
	'click .unfavorite-car': function() {
		const favorite = UserFavorites.findOne({
			owner: Meteor.userId(),
			carId: this._id
		});
		Meteor.call('removeFavorite', favorite._id);
	}
})
