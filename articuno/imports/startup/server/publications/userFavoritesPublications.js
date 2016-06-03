import { Meteor } from 'meteor/meteor';
import { UserFavorites } from '../../../api/UserFavorites/userFavorites.js';

Meteor.publish('userFavorites', function userFavorites() {
	return UserFavorites.find({
		owner: this.userId,
	});
});
