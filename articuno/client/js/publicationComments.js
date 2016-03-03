Template.publicationComments.helpers({
	commentAuthor: function() {
		return Meteor.users.findOne(this.authorId);
	}
});
