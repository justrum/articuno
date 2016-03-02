Template.home.helpers({
	cars: () => {
		return Cars.find({}, {
			limit: 20
		});
	},
	amountCars: () => {
		return Cars.find().count();
	}
});
