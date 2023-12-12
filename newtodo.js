"use strict";

let userIdDropdown;
let categoriesDropdown;

window.onload = init;

function init() {
    userIdDropdown = document.getElementById("userIdDropdown");
    categoriesDropdown = document.getElementById("categoriesDropdown");
    const addTodoForm = document.getElementById("addTodoForm");
    addTodoForm.addEventListener("submit", addTodo);

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

    categoriesDropdown.addEventListener("change", () => {
        displayTaskClass();
    });
}

function displayTaskClass() {
    let urgencySelect = document.getElementById("urgencySelect");

    if (urgencySelect !== null) {
        let classification = urgencySelect.value;

        if (classification === "Low") {

        } else if (classification === "Medium") {

        } else if (classification === "High") {

        }

        displayFormResults();
    }
}

function addTodo(event) {
    event.preventDefault(); // stops default form submission 

    // get form data
    const formData = new FormData(document.getElementById("addTodoForm"));
    const todoData = {
        userid: formData.get("userId"),
        category: formData.get("categoryId"),
        description: formData.get("description"),
        deadline: formData.get("deadline"),
        priority: formData.get("urgency")
    };

    // send a post request to api/todos

    // fix post request (400 bad request)
    fetch("http://localhost:8083/api/todos", {
        method: "POST",
       


    })
    .then(response => response.json())
    .then(data => {
        // console.log tests
        console.log("ToDo added successfully:", data);
        displayTodoCard(data);
    })
    .catch(error => {
        console.error("Error adding ToDo:", error);
    });
}

// function displayTodoCard(todoData) {
  //  const todoCard = document.createElement("div");
 //   todoCard.classList.add("todoCard"); 

 //   todoCard.innerHTML = `
 //       <h3>${todoData.description}</h3>
   //     <p>User ID: ${todoData.userid}</p>
 //       <p>Category: ${todoData.category}</p>
  //      <p>Deadline: ${todoData.deadline}</p>
  //      <p>Priority: ${todoData.priority}</p>
 //   `;

  //  const todoContainer = document.getElementById("todoContainer");
  //  todoContainer.appendChild(todoCard);
//}