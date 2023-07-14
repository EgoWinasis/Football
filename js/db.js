const dbPromise = idb.open("football", 1, function (upgradeDb) {

	if (!upgradeDb.objectStoreNames.contains("team")) {
		const teamObjectStore = upgradeDb.createObjectStore("team", {
			keyPath: "id",
			autoIncrement: true
		});
		teamObjectStore.createIndex("name", "name", {
			unique: true
		});
	}
});




const getFavTeams = (id) => {

	let cacheFav = id.split("@", 20);

	let cacheId = cacheFav[0];
	let cacheName = cacheFav[1];
	let cacheFounded = cacheFav[2];
	let cacheAddress = cacheFav[3];
	let cacheWebsite = cacheFav[4];
	let cacheLogo = cacheFav[5];
	// jika ada ada di caches dengan  endpoint sebagi argument 
	if ("caches" in window) {
		caches.match(`${BASE_URL}teams`).then(response => {
			if (response) {
				response.json().then(data => {
					let objectTeam = {
						name: cacheName,
						founded: cacheFounded,
						address: cacheAddress,
						website: cacheWebsite,
						crestUrl: cacheLogo,
					};
					addFavorite(objectTeam);
				})
			}
		})
	}

	// jika tidak ada ada di caches, dengan  endpoint seabagai argument 

	fetchDataFromApi(`${BASE_URL}teams/${cacheId}`)
		.then(data => {
			addFavorite(data);
		})
		.catch(error => {
			console.log(error);
		})
}



// tambah data
function addFavorite(data) {


	// console.log(data);

	let name = data.name;
	let founded = data.founded;
	let address = data.address;
	let website = data.website;
	let crestUrl = data.crest;

	if (crestUrl === null) {
		crestUrl = '/images/pwa-192x192.png';
	}

	dbPromise.then(function (db) {
		const tx = db.transaction('team', 'readwrite');
		const store = tx.objectStore('team');
		let item = {
			name: name,
			founded: founded,
			address: address,
			website: website,
			logo: crestUrl,
			created: new Date().getTime()
		};
		store.put(item);
		return tx.complete;
	}).then(function () {
		Swal.fire(
			'success',
			'Your favorite team was successfully added!',
			'success'
		)

	}).catch(function () {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'The team already exists!',

		})
	})




}

// read data

function showFavorite(data) {


	dbPromise.then(function (db) {
		const tx = db.transaction('team', 'readonly');
		const store = tx.objectStore('team');
		return store.getAll();
	}).then(function (data) {

		// console.log('Data yang diambil: ');
		// console.log(data);

		const favoriteTeams = data;

		$(".preloader").fadeOut();
		
		// console.log(favoriteTeams);
		document.querySelector('body')
		$.each(favoriteTeams, function (i, data) {
			let id = data.id;
			let name = data.name;
			let founded = data.founded;
			let address = data.address;
			let website = data.website;
			let logoUrl = data.logo;



			// console.log(id);
			$('#favorite').append(`

                    <tr>
                        <td><a href='#favorites'  onclick="deleteFavorite(` + id + `) ">Delete</a></td>
                        <td>` + name + `</td>
                        <td>` + (founded || ' ') + `</td>
                        <td>` + (address || ' ') + `</td>
                        <td><a href=` + (website || ' ') + `>` + (website || ' ') + `</a></td>
                        <td><img width="100px" alt="Logo Team" src=` + logoUrl + `></td>
                    </tr>

                    `)

		});

	});

}

function showData() {
	showFavorite();
}


// hapus
function deleteFavorite(id) {

	let check = Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire(
				'Deleted!',
				'Your team has been deleted.',
				'success'
			)

			const favId = id;
			// console.log(id);
			dbPromise.then(function (db) {
				const tx = db.transaction('team', 'readwrite');
				const store = tx.objectStore('team');
				store.delete(favId);
				return tx.complete;
			}).then(function () {
				location.reload();

			});

		}
	})

}