Template.carsByBrand.helpers({
	cars: () => {
		const brandId = Router.current().params.brandid;
		return Cars.find({
			brandId: brandId
		});
	},
	brand: () => {
		const brandId = Router.current().params.brandid;
		return CarBrands.findOne({
			_id: brandId
		});
	},
	gridClasses: () => {
		let user = Meteor.user();
		if (user && user.services && user.services.facebook) {
			return classNames('twelve', 'wide');
		}
		return classNames('');
	},
	carsGridClasses: () => {
		let user = Meteor.user();
		if (user && user.services && user.services.facebook) {
			return classNames('three');
		}
		return classNames('four');
	}
});
