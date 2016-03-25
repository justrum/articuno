Accounts.onCreateUser((options, user) => {
	if (options.profile) {
		user.profile = user.profile || {};
		user.profile.name = options.profile.name;
		user.profile.address = options.profile.address || 'N/A',
		user.profile.phoneNumber1 = options.profile.phoneNumber1 || 'N/A';
		user.profile.phoneNumber2 = options.profile.phoneNumber2 || 'N/A';
		user.profile.city = options.profile.city || 'N/A';
	}
	return user;
});

Accounts.validateNewUser((user) => {
	if (user.profile && user.profile.name) {
		return true;
	}
	throw new Meteor.Error(403, 'Name is required.');
});
