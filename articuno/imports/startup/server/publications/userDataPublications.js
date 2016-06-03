import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function userData() {
	return Meteor.users.find({
		_id: this.userId,
	}, {
		fields: {
			services: 1,
		},
	});
});
