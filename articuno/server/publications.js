Meteor.publish('carbrands', () => {
	return CarBrands.find();
});

Meteor.publish('cities', () => {
	return Cities.find();
});

Meteor.publish('cars', () => {
	return Cars.find();
});
