Template.carDetails.helpers({
	car: () => {
		var carId = Router.current().params.carid;
		return Cars.findOne({
			_id: carId
		});
	},
	contact: () => {
		return {
			name: 'Autolote JustRum',
			address: 'Meteor',
			city: 'Meteorite',
			phoneNumber1: '9999-9999',
			phoneNumber2: '9999-9999',
			email: 'justrum@gmail.com'
		};
	},
	comments: () => {
		return [{
			author: 'Vkrum',
			date: 'Today at 5:42PM',
			text: 'Que cool este carro!'
		}, {
			author: 'JustRdk',
			date: 'Today at 6:42PM',
			text: 'que buen carro! ya le llamare a su celular!'
		}];
	},
});
