Template.publicationComments.helpers({
	commentAuthor: function() {
		return Meteor.users.findOne(this.authorId);
	},
	canDeleteComment: function() {
		const car = Cars.findOne({
			_id: this.carId
		});

		return this.authorId === Meteor.userId() || car.ownerId === Meteor.userId();
	}
});

Template.publicationComments.events({
	'click .remove-comment': function() {
		Meteor.call('deleteComment', this._id, Meteor.userId());
	}
});
