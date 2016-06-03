import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { CarBrands } from '../../api/CarBrands/carBrands.js';
import { Cars } from '../../api/Cars/cars.js';
import { Cities } from '../../api/Cities/cities.js';

import './filterComponent.html';

Template.filterComponent.onRendered(function filterComponentOnRendered() {
	$('.filter-dropdown').dropdown();
});

Template.filterComponent.helpers({
	brands() {
		return CarBrands.find();
	},
	amountCarsBrand() {
		return Cars.find({
			brandId: this._id,
			isActive: true,
			isNew: Template.instance().data.newCars !== undefined,
		}).count();
	},
	cities() {
		return Cities.find();
	},
});

Template.filterComponent.events({
	'click .brand-filter-item'(ev, template) {
		if (this._id) {
			return template.viewmodel.brand(this._id);
		}
		template.viewmodel.brand('');
	},
	'click .city-filter-item'(ev, template) {
		if (this._id) {
			return template.viewmodel.city(this._id);
		}
		template.viewmodel.city('');
	},
});

Template.filterComponent.viewmodel({
	brand: '',
	city: '',
	initYear: '',
	finalYear: '',
	initPrice: '',
	finalPrice: '',
	currency: '$',
	resetFilterFields() {
		this.brand('');
		this.city('');
		this.initYear('');
		this.finalYear('');
		this.initPrice('');
		this.finalPrice('');
		this.currency('$');
		$('.filter-dropdown').dropdown('restore default text');
	},
	filterCars(ev) {
		const filterNewCars = this.templateInstance.data.newCars !== undefined;
		const filterObject = {
			brandId: this.brand(),
			cityId: this.city(),
			initYear: this.initYear(),
			finalYear: this.finalYear(),
			initPrice: this.initPrice(),
			finalPrice: this.finalPrice(),
			currency: this.currency(),
		};

		const filterFields = {};
		const whereClause = {
			isActive: true,
			isNew: filterNewCars,
		};

		for (const key in filterObject) {
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
					whereClause.year = {
						$gte: parseInt(filterFields.initYear, 10),
						$lte: parseInt(filterFields.finalYear, 10),
					};
				}
			} else {
				whereClause.year = {
					$gte: parseInt(filterFields.initYear, 10),
				};
			}
		}

		if (filterFields.initPrice) {
			if (filterFields.finalPrice) {
				if (parseInt(filterFields.initPrice, 10) <= parseInt(filterFields.finalPrice, 10)) {
					whereClause.price = {
						$gte: parseInt(filterFields.initPrice, 10),
						$lte: parseInt(filterFields.finalPrice, 10),
					};
				}
			} else {
				whereClause.price = {
					$gte: parseInt(filterFields.initPrice, 10),
				};
			}
		}

		const filteredCars = Cars.find(whereClause);
		this.templateInstance.data.cars = filteredCars;
		$('.cars-sidebar').trigger('filterCars', this.templateInstance.data.cars);
	},
	resetFilters(ev) {
		const filterNewCars = this.templateInstance.data.newCars !== undefined;
		const unFilteredNewCars = Cars.find({
			isActive: true,
			isNew: filterNewCars,
		});

		this.resetFilterFields();
		this.templateInstance.data.cars = unFilteredNewCars;
		$('.cars-sidebar').trigger('filterCars', this.templateInstance.data.cars);
	},
});
