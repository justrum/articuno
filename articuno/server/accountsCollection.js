Accounts.onCreateUser((options, user) => {
	if (options.profile) {
		user.profile = user.profile || {};
		user.profile.name = options.profile.name;
	}
	return user;
});

// Accounts.validateNewUser((user) => {
// 	var regex = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/;
// 	if (user.email && user.email.toLowerCase().match(regex)) {
// 		return true;
// 	}
// 	throw new Meteor.Error(403, "Invalid email address.");
// });

// Accounts.validateNewUser((user) => {
// 	if (user.password && user.password.length > 6) {
// 		return true;
// 	}
// 	throw new Meteor.Error(403, "Password must have at least 6 chareacteres.");
// });

Accounts.validateNewUser((user) => {
	if (user.profile && user.profile.name) {
		return true;
	}
	throw new Meteor.Error(403, 'Name is required.');
});
