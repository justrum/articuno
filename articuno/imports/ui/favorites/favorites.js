import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { UserFavorites } from '../../api/UserFavorites/userFavorites.js';
import { Cars } from '../../api/Cars/cars.js';

import '../carGrid/carGrid.js';
import '../fbSideBar/fbSideBar.js';
import './favorites.html';

Template.favorites.helpers({
	cars: () => {
		const favCarIds = UserFavorites.find({
			owner: Meteor.userId(),
		}).map((favorite) => favorite.carId);

		return Cars.find({
			_id: {
				$in: favCarIds,
			},
		});
	},
});
