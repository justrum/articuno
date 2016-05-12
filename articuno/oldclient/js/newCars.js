Template.newCars.created = function() {
	this.cars = new ReactiveVar([]);
	const cars = Cars.find({
		isActive: true,
		isNew: true
	});
	this.cars.set(cars);
};

Template.newCars.helpers({
	cars: () => {
		return Template.instance().cars.get();
	},
	amountCars: () => {
		return Template.instance().cars.get().count();
	}
});

Template.newCars.events({
	'filterCars .cars-sidebar': function(ev, template, cars) {
		if (!cars) {
			return;
		}
		template.cars.set(cars);
	}
});
