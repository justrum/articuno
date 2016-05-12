import { Meteor } from 'meteor/meteor';
import { Cities } from '../../../api/Cities/cities.js';

Meteor.publish('cities', function allCities() {
	return Cities.find();
});
