const dbPromise = idb.open("football", 1, function(upgradeDb) {

	 if (!upgradeDb.objectStoreNames.contains("team")) {
		  const teamObjectStore = upgradeDb.createObjectStore("team", {keyPath: "id", autoIncrement:true});
		  teamObjectStore.createIndex("name", "name", { unique: true });
		}
});

// tambah data
function addFavorite(id){

	if ("caches" in window) {
        caches.match(`${BASE_URL}teams/${id}`).then(response => {
            if (response) {
                response.json().then(data => {
                    // console.log("Matches Data: " + data);
                   showFavorite(data);
                })
            }
        })
    }


	fetchDataFromApi(`${BASE_URL}teams/${id}`)
        .then(data => {
            // console.log(data.name);
            let	favName = data.name;
            let	favFounded = data.founded;
            let	favAddress = data.address;
            let	favWebsite = data.website;
            let	favLogo = data.crestUrl.replace(/^http:\/\//i, 'https://');

            dbPromise.then(function(db) {
				  const tx = db.transaction('team', 'readwrite');
				  const store = tx.objectStore('team');
				  let item = {
				    name: favName,
				    founded: favFounded,
				    address: favAddress,
				    website: favWebsite,
				    logo: favLogo,
				    created: new Date().getTime()
				  };
				  store.add(item);
				  return tx.complete;
						}).then(function() {
				            Swal.fire(
								  'success',
								  'Your favorite team was successfully added!',
								  'success'
								)
				            
				        }).catch(function() {
				            Swal.fire({
							  icon: 'error',
							  title: 'Oops...',
							  text: 'The team already exists!',
							 
							})
				        })

			        })
			        .catch(error => {
			            console.log(error);
			        })


	

}

// read data

function showFavorite(data){


	dbPromise.then(function(db) {
	  const tx = db.transaction('team', 'readonly');
	  const store = tx.objectStore('team');
	  return store.getAll();
	}).then(function(data) {
	  
	  // console.log('Data yang diambil: ');
	  // console.log(data);

	const favoriteTeams = data;

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
                        <td><a href='#favorites'  onclick="deleteFavorite(`+ id +`) ">Delete</a></td>
                        <td>`+ name + `</td>
                        <td>`+ (founded || ' ') + `</td>
                        <td>`+ (address || ' ') + `</td>
                        <td><a href=`+ (website || ' ') + `>` + (website || ' ' ) + `</a></td>
                        <td><img width="100px" src=`+ (logoUrl || 'soccer_ball_192.png') + `></td>
                    </tr>

                    `)

    });

	});

}

function showData(){
	showFavorite();
}


// hapus
function deleteFavorite(id){

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
					dbPromise.then(function(db) {
					  const tx = db.transaction('team', 'readwrite');
					  const store = tx.objectStore('team');
					  store.delete(favId);
					  return tx.complete;
					}).then(function() {
					  location.reload();
					  
					});

				  }
				})
	 
}









