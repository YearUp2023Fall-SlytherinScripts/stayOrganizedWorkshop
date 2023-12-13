"use strict";

let userIdDropdown;
let categoriesDropdown;

window.onload = init;

function init() {
    userIdDropdown = document.getElementById("userid");
    categoriesDropdown = document.getElementById("category");


    document.getElementById("addTask").addEventListener("click", addTodo);


    // fetch user id
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const option = document.createElement("option");
                option.textContent = user.id;
                userIdDropdown.appendChild(option);
            });
        });

    userIdDropdown.addEventListener("change", () => {
        let userSelected = userIdDropdown.value;
        if (userSelected != null) {
            displayCategories();
        }
    });
}

function displayCategories() {
    // fetch categories
    fetch("http://localhost:8083/api/categories")
        .then(response => response.json())
        .then(data => {
            categoriesDropdown.innerHTML = ""; 
            data.forEach(category => {
                const option = document.createElement("option");
                option.textContent = category.name;
                categoriesDropdown.appendChild(option);
            });
        });

    
}



function addTodo() {
    // get form data
    const formData = new FormData(document.getElementById("todoForm"));
    const todoData = {
        userid: formData.get("userid"),
        category: formData.get("category"),
        description: formData.get("description"),
        deadline: formData.get("deadline"),
        priority: formData.get("urgency")
    };

    // send a POST request to api/todos
    fetch("http://localhost:8083/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify(todoData),
        })
    .then(response => response.json())
    .then(data => {
        console.log("To Do added check:", data);
        // Clear form fields
    document.getElementById("todoForm").reset();

    
        displayTodoCard(data);
    })
    .catch(error => {
        console.error("Error adding To Do:", error);
        alert("Please try again.");
    });
    
}
//display in bootstrap card
 function displayTodoCard(todoData) {
   const todoCard = document.createElement("div");
   todoCard.classList.add("todoCard"); 

  todoCard.innerHTML = 
   `<div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-header"><h4>User ID: ${todoData.userid}</h4></div>
  <div class="card-body text-success">
    <h5 class="card-title">Category: ${todoData.category}</h5>
    <p class="card-text">Description: ${todoData.description}</p>
    <p class="card-text" >Priority: ${todoData.priority}</p>
    <p class="card-text">Deadline: ${new Date(todoData.deadline).toLocaleDateString()}</p>
    </div>
    </div>
    `;

    const todoContainer = document.getElementById("todoContainer");
    todoContainer.appendChild(todoCard);
}