import { Meteor } from 'meteor/meteor';
import { Cars } from '../../../api/Cars/cars.js';
import { CarBrands } from '../../../api/CarBrands/carBrands.js';
import { Cities } from '../../../api/Cities/cities.js';
import { Comments } from '../../../api/Comments/comments.js';

Meteor.publishComposite('cars', function cars() {
	return {
		find() {
			return Cars.find({
				isActive: true,
			});
		},
		children: [{
			find(car) {
				return CarBrands.find({
					_id: car.brandId,
				});
			},
		}, {
			find(car) {
				return Cities.find({
					_id: car.cityId,
				});
			},
		}, {
			find(car) {
				return Meteor.users.find({
					_id: car.ownerId,
				}, {
					fields: {
						password: 0,
					},
				});
			},
		}, {
			find(car) {
				return Comments.find({
					carId: car._id,
				});
			},
			children: [{
				find(comment) {
					return Meteor.users.find({
						_id: comment.authorId,
					}, {
						fields: {
							password: 0,
						},
					});
				},
			}],
		}],
	};
});
