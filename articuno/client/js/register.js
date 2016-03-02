Template.register.rendered = () => {
	$('.register-new-account form').form({
		fields: {
			email: {
				identifier: 'email',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su correo electrónico.'
				}, {
					type: 'email',
					prompt: 'Ingrese un correo válido.'
				}]
			},
			password: {
				identifier: 'password',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su contraseña'
				}, {
					type: 'minLength[6]',
					prompt: 'Su contraseña debe tener al menos {ruleValue} caracteres.'
				}]
			},
			'confirmation': {
				identifier: 'confirmation',
				rules: [{
					type: 'empty',
					prompt: 'Confirme su contraseña.'
				}, {
					type: 'match[password]',
					prompt: 'La contraseña y confirmación no son iguales.'
				}]
			}
		}
	});
};

Template.register.viewmodel({
	email: '',
	password: ''
});

Template.register.events({
	'submit .register-new-account form': (event) => {
		event.preventDefault();
		let email = event.target.email.value;
		let password = event.target.password.value;
		let confirmation = event.target.confirmation.value;
		if (password !== confirmation) {
			return $('.register-new-account form')
				.form('add errors', ['La contraseña y confirmación no son iguales.']);
		}
		Accounts.createUser({
			email: email,
			password: password
		}, (error) => {
			if (error) {
				return $('.register-new-account form')
					.form('add errors', ['Ya existe una cuenta con este correo electrónico.']);
			}
			location = '/home';
		});
	}
});