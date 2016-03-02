Template.registerHelper('formatCurrency', (currency, amount) => {
	accounting.settings.currency.format = '%s %v';
	return accounting.formatMoney(amount, currency, 2);
});
