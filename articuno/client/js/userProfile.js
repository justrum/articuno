Template.userProfile.helpers({
	user: function() {
		const userId = Router.current().params.userid;
		const user = Meteor.users.findOne({
			_id: userId
		});
		return user;
	},
	userEmail: function() {
		const userId = Router.current().params.userid;
		const user = Meteor.users.findOne({
			_id: userId
		});
		return user.emails[0].address || 'N/A';
	},
	userCars: function() {
		const userId = Router.current().params.userid;
		return Cars.find({
			isActive: true,
			ownerId: userId
		}, {
			limit: 4
		});
	},
	diffLoginUser: function() {
		const userId = Router.current().params.userid;
		const user = Meteor.users.findOne({
			_id: userId
		});

		return user._id !== Meteor.userId();
	},
	isOnFollowList: function() {
		const userFollows = UserFollows.findOne({
			owner: Meteor.userId(),
			follows: this._id
		});

		return userFollows !== undefined;
	}
});

Template.userProfile.events({
	'click .follow-user': function(ev, template) {
		Meteor.call('addFollow', this._id, (err, result) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			const userId = Router.current().params.userid;
			const user = Meteor.users.findOne({
				_id: userId
			});
			return toastr.success(`Ahora sigues a ${user.profile.name}!`);
		});
	},
	'click .unfollow-user': function(ev, template) {
		Meteor.call('removeFollow', this._id, (err, result) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
		});
	}
});