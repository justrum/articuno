import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'aldeed:simple-schema';

export const UserFavorites = new Mongo.Collection('userfavorites');

UserFavorites.deny({
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
	carId: {
		type: String,
	},
	owner: {
		type: String,
	},
});

UserFavorites.attachSchema(schema);
