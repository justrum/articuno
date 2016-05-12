Template.usedCars.created = function() {
	this.cars = new ReactiveVar([]);
	const cars = Cars.find({
		isActive: true,
		isNew: false
	});
	this.cars.set(cars);
};

Template.usedCars.helpers({
	cars: () => {
		return Template.instance().cars.get();
	},
	amountCars: () => {
		return Template.instance().cars.get().count();
	}
});

Template.usedCars.events({
	'filterCars .cars-sidebar': function(ev, template, cars) {
		if (!cars) {
			return;
		}
		template.cars.set(cars);
	}
});
