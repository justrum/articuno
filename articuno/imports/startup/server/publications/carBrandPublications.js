import { Meteor } from 'meteor/meteor';
import { CarBrands } from '../../../api/CarBrands/carBrands.js';

Meteor.publish('carbrands', function allCarBrands() {
	return CarBrands.find({}, {
		sort: {
			name: 1,
		},
	});
});
