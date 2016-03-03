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
	}
});
