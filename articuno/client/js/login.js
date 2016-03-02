Template.login.rendered = () => {
	$('.login form').form({
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
				}]
			}
		}
	});
};

Template.login.viewmodel({
	email: '',
	password: ''
});

Template.login.events({
	'submit .login form': (event) => {
		event.preventDefault();
		let email = event.target.email.value;
		let password = event.target.password.value;
		Meteor.loginWithPassword({
			email: email
		}, password, (error) => {
			if (error) {
				return $('.login form')
					.form('add errors', ['Correo o contraseña incorrectos.<br>Intente nuevamente.']);
			}
		});
	},
	'click .login .facebook': (event) => {
		event.preventDefault();
	}
});