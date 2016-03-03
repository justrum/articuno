Meteor.publish('carbrands', () => {
	return CarBrands.find();
});

Meteor.publish('cities', () => {
	return Cities.find();
});

Meteor.publish('cars', () => {
	return Cars.find({
		isActive: true
	});
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
