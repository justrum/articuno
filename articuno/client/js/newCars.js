Template.newCars.helpers({
	cars: function() {
		return Cars.find({
			isActive: true,
			isNew: true
		});
	},
	amountCars: function() {
		return Cars.find({
			isActive: true,
			isNew: true
		}).count();
	}
});
