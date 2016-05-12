Template.userProfileCars.rendered = () => {
	$('.car-item .dimmable.image').dimmer({
		on: 'hover'
	});
};

Template.userProfileCars.helpers({
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
});