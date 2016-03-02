Meteor.startup(() => {
	// code to run on server at startup
	const users = initUsers();
	if (Meteor.users.find().count() === 0) {
		for (let i = 0; i < users.length; i++) {
			Accounts.createUser(users[i]);
		}
	}
});

let initUsers = () => {
	return [{
		email: 'test@test.com',
		password: 'password',
		profile: {
			name: 'Test User'
		}
	}];
}