Template.usedCars.helpers({
	cars: function() {
		return Cars.find({
			isActive: true,
			isNew: false
		});
	},
	amountCars: function() {
		return Cars.find({
			isActive: true,
			isNew: false
		}).count();
	}
});
