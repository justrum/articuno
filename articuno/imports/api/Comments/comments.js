import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'aldeed:simple-schema';

export const Comments = new Mongo.Collection('comments');

Comments.deny({
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
	text: {
		type: String,
		max: 2000,
	},
	authorId: {
		type: String,
	},
	createdAt: {
		type: Date,
	},
});

Comments.attachSchema(schema);
