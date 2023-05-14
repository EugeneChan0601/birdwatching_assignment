let nameInput = null;
let isUploader = null;

let chatDiv;
let infoDiv;
let changeDiv;

function toggleDivs() {
    if (chatDiv.style.display === 'none') {
        chatDiv.style.display = 'flex';
        infoDiv.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize chatDiv and infoDiv after the DOM is fully loaded
    chatDiv = document.querySelector('.chat');
    infoDiv = document.querySelector('.info');
    changeDiv = document.querySelector('.change-container')

    // Get the name and password
    nameInput = document.querySelector('#name');
    isUploader = document.querySelector('#password');

    // Initially hide the chat div
    chatDiv.style.display = 'none';
    changeDiv.style.display = 'none';
    infoDiv.style.display = 'flex'; // Set to 'flex' to maintain your layout

    document.querySelectorAll('.confirm-button').forEach(function (button) {
        button.addEventListener('click', function (e){
            // If no name is entered, it will prompt that a name needs to be entered
            if (nameInput.value === null || nameInput.value.trim() === '') {
                alert('Please enter your name to continue');
            } else {
                localStorage.setItem('username', nameInput.value);
                toggleDivs();
                changeDiv.style.display = 'block';
            }
            e.preventDefault();
        });
    });
});
