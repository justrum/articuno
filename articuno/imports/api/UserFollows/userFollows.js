import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserFollows = new Mongo.Collection('userfollows');

UserFollows.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
});

const schema = new SimpleSchema({
	follows: {
		type: String,
	},
	owner: {
		type: String,
	},
});

UserFollows.attachSchema(schema);
