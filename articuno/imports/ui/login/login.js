import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './login.html';

Template.login.onRendered(function loginOnRendered() {
	$('.login form').form({
		fields: {
			email: {
				identifier: 'email',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su correo electrónico.',
				}, {
					type: 'email',
					prompt: 'Ingrese un correo válido.',
				}],
			},
			password: {
				identifier: 'password',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su contraseña',
				}],
			},
		},
	});
});

Template.login.events({
	'submit .login form'(event) {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		Meteor.loginWithPassword({
			email,
		}, password, (error) => {
			if (error) {
				return $('.login form')
					.form('add errors', ['Correo o contraseña incorrectos.<br>Intente nuevamente.']);
			}
		});
	},
	'click .login .facebook'(event) {
		event.preventDefault();
		Meteor.loginWithFacebook({
			requestPermissions: ['user_managed_groups', 'publish_actions', 'manage_pages'],
		}, (err) => {
			if (err) {
				throw new Meteor.Error('Inicio de sesión con Facebook fallido.');
			}
		});
	},
});
