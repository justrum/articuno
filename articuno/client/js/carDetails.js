Template.carDetails.helpers({
	car: () => {
		const carId = Router.current().params.carid;
		return Cars.findOne({
			_id: carId,
			isActive: true
		});
	},
	carBrand: function() {
		return CarBrands.findOne({
			_id: this.brandId
		});
	},
	contact: () => {
		return {
			name: 'Autolote JustRum',
			address: 'Meteor',
			city: 'Meteorite',
			phoneNumber1: '9999-9999',
			phoneNumber2: '9999-9999',
			email: 'justrum@gmail.com'
		};
	},
	comments: () => {
		const carId = Router.current().params.carid;
		return Comments.find({
			carId: carId
		}, {
			limit: 10
		});
	},
});

Template.carDetails.events({
	'click .add-comment': function() {
		const comment = $('.comment-box textarea').val().trim();
		if (comment.length === 0) {
			return;
		}
		Meteor.call('addComment', Meteor.userId(), this._id, comment);
		$('.comment-box textarea').val('');
	}
});
