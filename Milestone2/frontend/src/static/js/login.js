import api from './APIClient.js'

const loginBtn = document.querySelector('#loginBtn');
const username = document.querySelector('#username');
const password = document.querySelector('#pwd');
const errorBox = document.querySelector('#error');

// login error check
const login = e => {
    errorBox.classList.add("hidden");
    api.logIn(username.value, password.value).then(userData => {
        document.location = "./";
    }).catch((err) => {
        errorBox.classList.remove("hidden");
        if(err.status === 401) {
            errorBox.innerHTML = "Invalid username or password";
        } else {
            errorBox.innerHTML = err;
        }
    });
};

// login button click -> try to log in
loginBtn.addEventListener('click', login);

// add button clicking functionality for ENTER keys on username/password fields
const loginOnEnter = (e) => {
    if (e.key === 'Enter') {
        login();
    }
};

// add keyup events for Enter key in username and password
username.addEventListener('keyup', loginOnEnter);
password.addEventListener('keyup', loginOnEnter);