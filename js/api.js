const API_KEY = "66977226766349bfbd0758ecd35f661f";
const BASE_URL = "https://api.football-data.org/v2/";

// Kita buat method untuk request ke API (disini dinamai fetchDataFromApi dengan menerima parameter endpoint)

const fetchDataFromApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

//membuat method buat untuk mendapatkan semua pertandingan (getAllmatch) 


const getAllMatch = () => {
    // jika ada ada di caches dengan  endpoint sebagi argument 
    if ("caches" in window) {
        caches.match(`${BASE_URL}competitions/CL/matches`).then(response => {
            if (response) {
                response.json().then(data => {
                    // console.log("Matches Data: " + data);
                    showMatches(data);
                })
            }
        })
    }

    // jika tidak ada ada di caches, dengan  endpoint seabagai argument 

    fetchDataFromApi(`${BASE_URL}competitions/CL/matches`)
        .then(data => {
            showMatches(data);
        })
        .catch(error => {
            console.log(error)
        })
}

// ini buat showmatche yang akan dijalankan pada method getAllMatch
const showMatches = dataMatches => {
    // console.log(dataMatches.matches);
    const matches = dataMatches.matches;
    // console.log(matches);
    $.each(matches, function (i, data) {
        // menyimpan data ke dalam variable 

        let dateTime = data.utcDate;
        let status = data.status;
        let group = data.group;
        let homeTeamName = data.homeTeam['name'];
        let awayTeamName = data.awayTeam['name'];
        let homeTeamScore = data.score['fullTime']['homeTeam'];
        let awayTeamScore = data.score['fullTime']['awayTeam'];

        $('#jadwal').append(`
                    <tr>
                        <td>`+ dateTime.slice(0,10) +`</td>
                        <td>`+ dateTime.slice(11,16) +`</td>
                        <td>`+ status + `</td>
                        <td>`+ (group || '-') + `</td>
                        <td>`+ homeTeamName + `<span style="color:red;">   VS   </span>`  + awayTeamName + `</td>
                        <td>`+ (homeTeamScore || 0) + ` - ` + (awayTeamScore || 0) + `</td>
                    </tr>

                    `)

    });
}






const getAllTeams = () => {
    // jika ada ada di caches dengan  endpoint sebagi argument 
    if ("caches" in window) {
        caches.match(`${BASE_URL}competitions/2001/teams`).then(response => {
            if (response) {
                response.json().then(data => {
                    // console.log("Matches Data: " + data);
                    showTeams(data);
                })
            }
        })
    }

    // jika tidak ada ada di caches, dengan  endpoint seabagai argument 

    fetchDataFromApi(`${BASE_URL}competitions/2001/teams`)
        .then(data => {
            showTeams(data);
        })
        .catch(error => {
            console.log(error);
        })
}

const showTeams = dataTeams => {
    // console.log(dataTeams);
    const teams = dataTeams.teams;
    document.querySelector('body')
    // console.log(teams);
    $.each(teams, function (i, data) {
        let id  =   data.id;
        let name = data.name;
        let founded = data.founded;
        let address = data.address;
        let website = data.website;
        let logoUrl = data.crestUrl.replace(/^http:\/\//i, 'https://');
        // console.log(id);
        $('#teams').append(`
                    <tr>
                        <td><a href='#teams'  onclick="addFavorite('${id}')">Add Favorite</a></td>
                        <td>`+ name + `</td>
                        <td>`+ (founded || ' ') + `</td>
                        <td>`+ (address || ' ') + `</td>
                        <td><a href=`+ (website || ' ') + `>` + (website || ' ' ) + `</a></td>
                        <td><img width="100px" src=`+ (logoUrl || 'soccer_ball_192.png') + `></td>
                    </tr>

                    `)

    });

}


