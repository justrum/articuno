import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './fbSideBar.html';

Template.fbSidebar.onCreated(function fbSidebarOnCreated() {
	this.fbGroups = new ReactiveVar([]);
	this.fbPages = new ReactiveVar([]);
	const user = Meteor.user();

	const interval = setInterval(() => {
		if (typeof FB !== 'undefined' && user && user.services && user.services.facebook) {
			FB.api(`/${user.services.facebook.id}/groups`, (response) => {
				if (response && !response.error) {
					this.fbGroups.set(response.data);
				}
			}, {
				fields: ['general_info', 'access_token', 'name', 'link', 'picture'],
				access_token: user.services.facebook.accessToken,
			});
			FB.api(`/${user.services.facebook.id}/accounts`, (response) => {
				if (response && !response.error) {
					this.fbPages.set(response.data.filter((page) => {
						return page.general_info &&
							page.general_info.toLowerCase().match(/#eligebientucarro/);
					}));
				}
			}, {
				fields: ['general_info', 'access_token', 'name', 'link', 'picture'],
				access_token: user.services.facebook.accessToken,
			});
			clearInterval(interval);
		}
	}, 300);
});

Template.fbSidebar.helpers({
	fbGroups() {
		return Template.instance().fbGroups.get();
	},
	fbPages() {
		return Template.instance().fbPages.get();
	},
});
