Template.newCars.created = function() {
	this.cars = new ReactiveVar([]);
	const cars = Cars.find({
		isActive: true,
		isNew: true
	});
	this.cars.set(cars);
};

Template.newCars.rendered = function() {
	$('.filter-dropdown').dropdown();
};

Template.newCars.viewmodel({
	brand: '',
	city: '',
	initYear: '',
	finalYear: '',
	initPrice: '',
	finalPrice: '',
	currency: '$',
	resetFilterFields: function() {
		this.brand('');
		this.city('');
		this.initYear('');
		this.finalYear('');
		this.initPrice('');
		this.finalPrice('');
		this.currency('$');
		$('.filter-dropdown').dropdown('restore default text');
	},
	filterCars: function(ev) {
		const filterObject = {
			brandId: this.brand(),
			cityId: this.city(),
			initYear: this.initYear(),
			finalYear: this.finalYear(),
			initPrice: this.initPrice(),
			finalPrice: this.finalPrice(),
			currency: this.currency()
		};

		let filterFields = {};
		let whereClause = {
			isActive: true,
			isNew: true
		};

		for (let key in filterObject) {
			if (filterObject.hasOwnProperty(key)) {
				if (filterObject[key] && filterObject[key].trim().length !== 0) {
					filterFields[key] = filterObject[key];
					if (key === 'brandId' || key === 'cityId' || key === 'currency') {
						whereClause[key] = filterObject[key];
					}
				}
			}
		}

		if (filterFields.initYear) {
			if (filterFields.finalYear) {
				if (parseInt(filterFields.initYear, 10) <= parseInt(filterFields.finalYear, 10)) {
					whereClause['year'] = {
						$gte: parseInt(filterFields.initYear, 10),
						$lte: parseInt(filterFields.finalYear, 10)
					};
				}
			} else {
				whereClause['year'] = {
					$gte: parseInt(filterFields.initYear, 10)
				};
			}
		}

		if (filterFields.initPrice) {
			if (filterFields.finalPrice) {
				if (parseInt(filterFields.initPrice, 10) <= parseInt(filterFields.finalPrice, 10)) {
					whereClause['price'] = {
						$gte: parseInt(filterFields.initPrice, 10),
						$lte: parseInt(filterFields.finalPrice, 10)
					};
				}
			} else {
				whereClause['price'] = {
					$gte: parseInt(filterFields.initPrice, 10)
				};
			}
		}

		const filteredCars = Cars.find(whereClause);
		this.templateInstance.cars.set(filteredCars);
	},
	resetFilters: function(ev) {
		const unFilteredNewCars = Cars.find({
			isActive: true,
			isNew: true
		});
		this.resetFilterFields();
		this.templateInstance.cars.set(unFilteredNewCars);
	}
});

Template.newCars.helpers({
	cars: () => {
		return Template.instance().cars.get();
	},
	amountCars: () => {
		return Template.instance().cars.get().count();
	},
	brands: () => {
		return CarBrands.find();
	},
	amountCarsBrand: function() {
		return Cars.find({
			brandId: this._id,
			isActive: true,
			isNew: true
		}).count();
	},
	cities: () => {
		return Cities.find();
	}
});

Template.newCars.events({
	'click .brand-filter-item': function(ev, template) {
		if (this._id) {
			return template.viewmodel.brand(this._id);
		}
		template.viewmodel.brand('');
	},
	'click .city-filter-item': function(ev, template) {
		if (this._id) {
			return template.viewmodel.city(this._id);
		}
		template.viewmodel.city('');
	}
});
