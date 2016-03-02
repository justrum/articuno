Template.carGrid.rendered = () => {
	Tracker.autorun(() => {
		if (Meteor.user()) {
			Tracker.afterFlush(() => {
				$('.car-card .dimmable.image').dimmer({
					on: 'hover'
				});
			});
		}
	});
};
Template.carGrid.helpers({
	statusIs: function(status) {
		return this.status.toLowerCase() === status;
	}
});
