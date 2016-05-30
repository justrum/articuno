import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { toastr } from 'meteor/pcel:toastr';

import { Cars } from '../../api/Cars/cars.js';
import { UserFollows } from '../../api/UserFollows/userFollows.js';
import { removeFollow } from '../../api/UserFollows/methods.js';
import './userProfileCars.js';
import './userProfile.html';

Template.userProfile.helpers({
	user() {
		const userId = Router.current().params.userid;
		const user = Meteor.users.findOne({
			_id: userId,
		});
		return user;
	},
	userEmail() {
		const userId = Router.current().params.userid;
		const user = Meteor.users.findOne({
			_id: userId,
		});
		return user.emails[0] ? user.emails[0].address : 'N/A';
	},
	userCars() {
		const userId = Router.current().params.userid;
		return Cars.find({
			isActive: true,
			ownerId: userId,
		}, {
			limit: 4,
		});
	},
	diffLoginUser() {
		const userId = Router.current().params.userid;
		const user = Meteor.users.findOne({
			_id: userId,
		});

		return user._id !== Meteor.userId();
	},
	isOnFollowList() {
		const userFollows = UserFollows.findOne({
			owner: Meteor.userId(),
			follows: this._id,
		});

		return userFollows !== undefined;
	},
});

Template.userProfile.events({
	'click .follow-user'(ev, instance) {
		Meteor.call('addFollow', this._id, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
			const userId = Router.current().params.userid;
			const user = Meteor.users.findOne({
				_id: userId,
			});
			return toastr.success(`Ahora sigues a ${user.profile.name}!`);
		});
	},
	'click .unfollow-user'(ev, instance) {
		removeFollow.call({
			followUserId: this._id,
		}, (err) => {
			if (err && err.error) {
				return toastr.error(err.error);
			}
		});
	},
});
