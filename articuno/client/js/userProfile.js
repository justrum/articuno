Template.userProfile.helpers({
    user: function() {
        const userId = Router.current().params.userid;
        const user = Meteor.users.findOne({
            _id: userId
        });
        return user;
    },
    userEmail: function() {
        const userId = Router.current().params.userid;
        const user = Meteor.users.findOne({
            _id: userId
        });
        return user.emails[0].address || 'N/A';
    },
    carBrand: function() {
        return CarBrands.findOne({
            _id: this.brandId
        });
    },
    userCars: function() {
        const userId = Router.current().params.userid;
        return Cars.find({
            isActive: true,
            ownerId: userId
        }, {
            limit: 4
        });
    },
    diffLoginUser: function() {
        const userId = Router.current().params.userid;
        const user = Meteor.users.findOne({
            _id: userId
        });

        return user._id !== Meteor.userId();
    },
    isOnFollowList: function() {
        const userFollows = UserFollows.findOne({
            owner: Meteor.userId()
        });

        if (!userFollows) {
            return false;
        }

        return userFollows.follows.filter((follow) => {
            return follow.followUserId === this._id && follow.isActive === true;
        }).length > 0;
    }
});

Template.userProfile.events({
    'click .follow-user': function(ev, template) {
        Meteor.call('addFollow', this._id, (err, result) => {
            if (err && err.error) {
                return toastr.error(err.error);
            }
            const userId = Router.current().params.userid;
            const user = Meteor.users.findOne({
                _id: userId
            });
            return toastr.success(`Ahora sigues a ${user.profile.name}!`);
        });
    }
});