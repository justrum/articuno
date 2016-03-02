Template.home.rendered = function() {
	$('.car-card .image').dimmer({
		on: 'hover'
	});
};

Template.home.helpers({
	cars: function() {
		return Cars.find({});
	}
});
