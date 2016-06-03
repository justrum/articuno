import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Cars = new Mongo.Collection('cars');

Cars.deny({
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
	brandId: {
		type: String,
	},
	ownerId: {
		type: String,
	},
	cityId: {
		type: String,
	},
	price: {
		type: Number,
		min: 1,
		decimal: true,
		optional: true,
		defaultValue: 0,
	},
	currency: {
		type: String,
		allowedValues: ['Lps', '$'],
	},
	model: {
		type: String,
	},
	views: {
		type: Number,
		min: 0,
		optional: true,
		defaultValue: 0,
	},
	year: {
		type: Number,
	},
	isNew: {
		type: Boolean,
		optional: true,
		defaultValue: false,
	},
	isActive: {
		type: Boolean,
		defaultValue: true,
		optional: true,
	},
	milesKms: {
		type: String,
		optional: true,
	},
	motor: {
		type: String,
		optional: true,
	},
	transmission: {
		type: String,
		allowedValues: ['manual', 'automatico', 'triptonic'],
	},
	traction: {
		type: String,
		optional: true,
	},
	direction: {
		type: String,
		optional: true,
	},
	gasoline: {
		type: String,
		allowedValues: ['gasolina', 'diesel'],
	},
	color: {
		type: String,
	},
	extras: {
		type: String,
		max: 2000,
		optional: true,
	},
	financing: {
		type: String,
		max: 2000,
		optional: true,
	},
	promotion: {
		type: String,
		max: 2000,
		optional: true,
	},
	stereo: {
		type: String,
		max: 300,
		optional: true,
	},
	windows: {
		type: String,
		max: 200,
		optional: true,
	},
});

Cars.attachSchema(schema);
