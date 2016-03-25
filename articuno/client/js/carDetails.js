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
	comments: () => {
		const carId = Router.current().params.carid;
		return Comments.find({
			carId: carId
		}, {
			limit: 10
		});
	},
	user: () => {
		const carId = Router.current().params.carid;
		const car = Cars.findOne({
			_id: carId,
			isActive: true
		});
		const user = Meteor.users.findOne({
			_id: car.ownerId
		});
		return user;
	},
	userEmail: () => {
		const carId = Router.current().params.carid;
		const car = Cars.findOne({
			_id: carId,
			isActive: true
		});
		const user = Meteor.users.findOne({
			_id: car.ownerId
		});
		return user.emails[0].address || 'N/A';
	},
});

Template.carDetails.events({
	'click .add-comment': function() {
		const comment = $('.comment-box textarea').val();
		if (comment && comment.trim().length === 0) {
			return;
		}
		Meteor.call('addComment', Meteor.userId(), this._id, comment, (err, result) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
		});
		$('.comment-box textarea').val('');
	}
});
