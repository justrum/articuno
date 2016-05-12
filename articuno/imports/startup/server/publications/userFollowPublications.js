import { Meteor } from 'meteor/meteor';
import { UserFollows } from '../../../api/UserFollows/userFollows.js';

Meteor.publish('userFollows', function userFollows() {
	return UserFollows.find({
		owner: this.userId,
	});
});
