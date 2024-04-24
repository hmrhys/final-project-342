import api from './APIClient.js';


const query = window.location.search;
let param = new URLSearchParams(query);
let userId = param.get(`id`);

api.getUserById(id).then(user => {
    document.querySelectorAll('.user-name').forEach(element => {
        console.log(user.username);
        element.innerHTML = user.username;
    });
})