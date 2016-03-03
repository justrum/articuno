Meteor.startup(() => {
	// code to run on server at startup
	const carBrands = initCarBrands();
	const cities = initCities();
	const cars = initDummyCars(carBrands, cities);

	if (CarBrands.find().count() === 0) {
		for (let i = 0; i < carBrands.length; i++) {
			CarBrands.insert(carBrands[i]);
		}
	}

	if (Cities.find().count() === 0) {
		for (let i = 0; i < cities.length; i++) {
			Cities.insert(cities[i]);
		}
	}

	if (Cars.find().count() === 0) {
		for (let i = 0; i < cars.length; i++) {
			Cars.insert(cars[i]);
		}
	}
});

let initDummyCars = (carBrands, cities) => {
	const models = ['A6', 'Murcielago', 'Corolla', 'Lancer Evolution'];
	const status = [true, false];
	const colors = ['Rojo', 'Verde', 'Negro', 'Azul'];
	let cars = [];
	for (let i = 0; i < 20; i++) {
		let brand = Math.floor((Math.random() * (carBrands.length - 1)));
		let city = Math.floor((Math.random() * (cities.length - 1)));
		let model = Math.floor((Math.random() * (models.length - 1)));

		cars.push({
			brand: carBrands[brand],
			city: cities[city],
			price: Math.floor((Math.random() * 20000) + 25000),
			currency: '$',
			model: models[model],
			comments: Math.floor((Math.random() * 30) + 1),
			views: Math.floor((Math.random() * 150) + 1),
			year: Math.floor(Math.random() * (2016 - 1992 + 1)) + 1992,
			isNew: status[Math.floor((Math.random() * status.length))],
			isActive: true,
			milesKms: '60,0000 millas',
			motor: '2.0 CC',
			transmission: 'manual',
			traction: 'tracera',
			direction: 'hidraulica',
			gasoline: 'diesel',
			color: colors[Math.floor((Math.random() * colors.length))],
			extras: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat cum vitae fugit est, eaque ea, quod pariatur numquam natus cumque aut laborum voluptates vero molestias, ad unde inventore tempore praesentium!',
			financing: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			promotion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			stereo: 'radio/cd/bluetooth',
			windows: 'electricos'
		});
	}

	return cars;
};

let initCities = () => {
	return [{
		name: 'Tegucigalpa'
	}, {
		name: 'San Pedro Sula'
	}, {
		name: 'Choloma'
	}, {
		name: 'La Ceiba'
	}, {
		name: 'El Progreso'
	}, {
		name: 'Choluteca'
	}, {
		name: 'Comyagua'
	}, {
		name: 'Puerto Cortes'
	}, {
		name: 'La Lima'
	}, {
		name: 'Danli'
	}, {
		name: 'Siguatepeque'
	}, {
		name: 'Catacamas'
	}, {
		name: 'Juticalpa'
	}, {
		name: 'Tocoa'
	}, {
		name: 'Villanueva'
	}, {
		name: 'Tela'
	}, {
		name: 'Olanchito'
	}, {
		name: 'Santa Rosa de Copan'
	}, {
		name: 'San Lorenzo'
	}, {
		name: 'Cofradia'
	}, {
		name: 'El Paraiso'
	}, {
		name: 'La Paz'
	}, {
		name: 'Yoro'
	}, {
		name: 'La Entrada'
	}, {
		name: 'Porterillos'
	}, {
		name: 'Santa Barbara'
	}, {
		name: 'Talanga'
	}, {
		name: 'Nacaome'
	}, {
		name: 'Santa Rita'
	}, {
		name: 'Intibuca'
	}, {
		name: 'Guaimaca'
	}, {
		name: 'Morazan'
	}, {
		name: 'Trujillo'
	}, {
		name: 'Nueva Ocotepeque'
	}, {
		name: 'Gracias'
	}, {
		name: 'Coxen Hole (Roatan)'
	}, {
		name: 'La Esperanza'
	}, {
		name: 'Puerto Lempira'
	}];
};

let initCarBrands = () => {
	return [{
		name: 'Alfa Romeo'
	}, {
		name: 'Aston Martin'
	}, {
		name: 'Audi'
	}, {
		name: 'Bentley'
	}, {
		name: 'Benz'
	}, {
		name: 'BMW'
	}, {
		name: 'Bugatti'
	}, {
		name: 'Cadillac'
	}, {
		name: 'Chevrolet'
	}, {
		name: 'Chrysler'
	}, {
		name: 'Citroen'
	}, {
		name: 'Corvette'
	}, {
		name: 'DAF'
	}, {
		name: 'Dacia'
	}, {
		name: 'Daewoo'
	}, {
		name: 'Daihatsu'
	}, {
		name: 'Datsun'
	}, {
		name: 'De Lorean'
	}, {
		name: 'Dino'
	}, {
		name: 'Dodge'
	}, {
		name: 'Farboud'
	}, {
		name: 'Ferrari'
	}, {
		name: 'Fiat'
	}, {
		name: 'Ford'
	}, {
		name: 'Honda'
	}, {
		name: 'Hummer'
	}, {
		name: 'Hyundai'
	}, {
		name: 'Jaguar'
	}, {
		name: 'Jeep'
	}, {
		name: 'KIA'
	}, {
		name: 'Koenigsegg'
	}, {
		name: 'Lada'
	}, {
		name: 'Lamborghini'
	}, {
		name: 'Lancia'
	}, {
		name: 'Land Rover'
	}, {
		name: 'Lexus'
	}, {
		name: 'Ligier'
	}, {
		name: 'Lincoln'
	}, {
		name: 'Lotus'
	}, {
		name: 'Martini'
	}, {
		name: 'Maserati'
	}, {
		name: 'Maybach'
	}, {
		name: 'Mazda'
	}, {
		name: 'McLaren'
	}, {
		name: 'Mercedes'
	}, {
		name: 'Mercedes-Benz'
	}, {
		name: 'Mini'
	}, {
		name: 'Mitsubishi'
	}, {
		name: 'Nissan'
	}, {
		name: 'Noble'
	}, {
		name: 'Opel'
	}, {
		name: 'Peugeot'
	}, {
		name: 'Pontiac'
	}, {
		name: 'Porsche'
	}, {
		name: 'Renault'
	}, {
		name: 'Rolls-Royce'
	}, {
		name: 'Rover'
	}, {
		name: 'Saab'
	}, {
		name: 'Seat'
	}, {
		name: 'äkoda'
	}, {
		name: 'Smart'
	}, {
		name: 'Spyker'
	}, {
		name: 'Subaru'
	}, {
		name: 'Suzuki'
	}, {
		name: 'Toyota'
	}, {
		name: 'Vauxhall'
	}, {
		name: 'Volkswagen'
	}, {
		name: 'Volvo'
	}];
};
