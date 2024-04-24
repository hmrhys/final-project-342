import api from './APIClient.js';

let query = document.getElementById('searchBar');
const searchBar = document.querySelector('#searchBar');

await api.getCurrentUser().then(r => {
    let handle = document.getElementById('user-handle');
    let profPic = document.getElementById('profile-pic');
    let profLink = document.getElementById("profile-link");

    handle.innerHTML = r.username;
    profPic.src = r.avatar;
    profLink.href = "./profile?id=" + r.user_id;
})

async function search() {
    console.log(query.value);
    api.gameSearch(query.value).then(r => {
        console.log(r);
        document.location = "./game?id=" + r.game_id;
    }).catch(
        document.location = "./"    
    )
}

const searchOnEnter = (e) => {
    if (e.key === 'Enter') {
        search();
    }
};

// add keyup events for Enter key in username and password
searchBar.addEventListener('keyup', searchOnEnter);