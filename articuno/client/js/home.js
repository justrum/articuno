Template.home.rendered = () => {
	$('.car-card .image').dimmer({
		on: 'hover'
	});
};

Template.home.helpers({
	cars: () => {
		return Cars.find({});
	}
});
