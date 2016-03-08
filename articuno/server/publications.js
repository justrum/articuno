Meteor.publish('carbrands', () => {
	return CarBrands.find({}, {
		sort: {
			name: 1
		}
	});
});

Meteor.publish('cities', () => {
	return Cities.find();
});

Meteor.publish('userData', function() {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'services': 1
		}
	});
});

Meteor.publish('userFavorites', function(){
	return UserFavorites.find({
		owner: this.userId
	});
})

Meteor.publishComposite('cars', {
	find: function() {
		return Cars.find({
			isActive: true
		});
	},
	children: [{
		find: function(car) {
			return CarBrands.find({
				_id: car.brandId
			});
		}
	}, {
		find: function(car) {
			return Cities.find({
				_id: car.cityId
			});
		}
	}, {
		find: function(car) {
			return Meteor.users.find({
				_id: car.ownerId
			}, {
				fields: {
					password: 0
				}
			});
		}
	}, {
		find: function(car) {
			return Comments.find({
				carId: car._id
			});
		},
		children: [{
			find: function(comment, car) {
				return Meteor.users.find({
					_id: comment.authorId
				}, {
					fields: {
						password: 0
					}
				});
			}
		}]
	}]
});
