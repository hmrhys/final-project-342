import api from './APIClient.js';

const form = document.getElementById('createAccountForm');

form.addEventListener('submit', async (event) => {
    console.log("create account form submitted");
    console.log("processing...");

    event.preventDefault(); // Prevent default form submission -- needs checks
    
    console.log("processing");

    const formData = new FormData(form);

    console.log("form received");
    console.log("processing...");
  
    try {
        console.log("getting data");
        const response = await api.createUser(
            // formData.get('userId'),
            formData.get('first_name'),
            formData.get('last_name'),
            formData.get('username'),
            formData.get('password'),
        //     formData.get('pwd_salt'),
        //     formData.get('avatar')
        );
        console.log("data received");
        
        const { username } = formData.get('username');
        console.log('User successfully created:', response);
        alert(`User ${username} created.`);
        form.reset(); 
    } catch (error) {
        console.error("Error creating user: ", error);
        alert('Your account was unable to be created at this time.');
    }
});