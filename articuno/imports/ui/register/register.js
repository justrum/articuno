import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';

import './register.html';

Template.register.onRendered(function registerOnRendered() {
	$('.register-new-account form').form({
		fields: {
			name: {
				identifier: 'name',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su nombre.',
				}],
			},
			'register-email': {
				identifier: 'register-email',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su correo electrónico.',
				}, {
					type: 'email',
					prompt: 'Ingrese un correo válido.',
				}],
			},
			'register-password': {
				identifier: 'register-password',
				rules: [{
					type: 'empty',
					prompt: 'Ingrese su contraseña',
				}, {
					type: 'minLength[6]',
					prompt: 'Su contraseña debe tener al menos {ruleValue} caracteres.',
				}],
			},
			'confirmation': {
				identifier: 'confirmation',
				rules: [{
					type: 'empty',
					prompt: 'Confirme su contraseña.',
				}, {
					type: 'match[register-password]',
					prompt: 'La contraseña y confirmación no son iguales.',
				}],
			},
		},
	});
});

Template.register.events({
	'submit .register-new-account form'(event) {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target['register-email'].value;
		const password = event.target['register-password'].value;
		const confirmation = event.target.confirmation.value;
		if (password !== confirmation) {
			return $('.register-new-account form')
				.form('add errors', ['La contraseña y confirmación no son iguales.']);
		}
		Accounts.createUser({
			email,
			password,
			profile: {
				name,
			},
		}, (error) => {
			if (error) {
				return $('.register-new-account form')
					.form('add errors', ['Ya existe una cuenta con este correo electrónico.']);
			}
			Router.go('/home');
		});
	},
});
