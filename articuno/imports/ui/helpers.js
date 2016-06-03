import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { accounting } from 'accounting';
import { classNames } from 'meteor/maxharris9:classnames';
import { moment } from 'meteor/momentjs:moment';

Template.registerHelper('formatCurrency', (currency, amount) => {
	accounting.settings.currency.format = '%s %v';
	return accounting.formatMoney(amount, currency, 2);
});

Template.registerHelper('gridClasses', () => {
	const user = Meteor.user();
	if (user && user.services && user.services.facebook) {
		return classNames('twelve', 'wide');
	}
	return classNames('');
});

Template.registerHelper('carsGridClasses', () => {
	const user = Meteor.user();
	if (user && user.services && user.services.facebook) {
		return classNames('three');
	}
	return classNames('four');
});

Template.registerHelper('formatDate', (date) => { moment(date).fromNow(); });
