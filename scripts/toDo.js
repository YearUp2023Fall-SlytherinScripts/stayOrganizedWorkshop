'use strict'

window.onload = init;

function init() {
  displayUsernameDropdown();
}

function displayUsernameDropdown() {
    const usernameList = document.querySelector('#usernameList');
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(userInfo => {
            for (const user of userInfo) {
                const newOption = new Option (user.username);
                newOption.value = `${user.id}`;
                usernameList.appendChild(newOption);
            }
    });

    usernameList.addEventListener('change', function() {
        displayToDoInfo(usernameList.value);
    });
}

function displayToDoInfo(usernameID) {
    const displayDiv = document.querySelector('#userToDoList');
    // clear previous content 
    displayDiv.textContent = "";
    fetch(`http://localhost:8083/api/todos/byuser/${usernameID}`)
        .then(response => response.json())
        .then(userToDo => {
            for (const data of userToDo) {
                let newDiv = document.createElement('div');
                //This is where the data will be displayed
                // select from data.category, data.description, data.deadline, data.priority
                newDiv.textContent = data.category;
                displayDiv.appendChild(newDiv);
            }
        });
}