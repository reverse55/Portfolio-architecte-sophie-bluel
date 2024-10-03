document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetch("http://localhost:5678/api/works");
  const piece = await data.json();
  const picture = piece

  // Boucle
  picture.forEach((work) => {
    // Create TABLEAU
    let Tableau = document.createElement("figure");
    Tableau.className = `tool category-id-${work.categoryId}`;



    // Create img
    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;


    // Create title
    let title = document.createElement("figcaption");
    title.textContent = work.title;

    // take gallery
    let gallery = document.querySelector(".gallery");

    //Append
    Tableau.appendChild(img);
    Tableau.appendChild(title);
    gallery.appendChild(Tableau)
  });

});

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  // Add "id" and "Tous" 
  categories.unshift({ id: 0, name: "Tous" });

  // boucle
  categories.forEach((category) => {
    // Create a button for each category
    let button = document.createElement("button");
    button.classList.add("filtre-management", "conception");

    if (category.id === 0) {
      button.classList.add("filter-active");
    }

    button.textContent = category.name;
    button.setAttribute("data-category-id", category.id);

    // Add the button to the filters 
    document.querySelector(".filters").appendChild(button);


    button.addEventListener("click", () => {
      // Remove the "display" class from all buttons
      document.querySelectorAll(".filtre-management").forEach((btn) => {
        btn.classList.remove("filter-active");
      });

      // Add the "display" class to the clicked button
      button.classList.add("filter-active");

      // Get the selected category ID
      let selectedCategoryId = button.getAttribute("data-category-id");

      // Filter the works based on the selected category
      document.querySelectorAll(".tool").forEach((workItem) => {
        if (selectedCategoryId == 0) {
          // Show all works when "Tous"
          workItem.style.display = "block";
        } else {
          // Hide all
          workItem.style.display = "none";

          // Only show works from the selected category
          document.querySelectorAll(`.tool.category-id-${selectedCategoryId}`).forEach((filteredWork) => {
            filteredWork.style.display = "block";
          });
        }
      });
    });
  });
});



// LOGIN
function handleAdminMode() {
  // Check if the the existence of token and userId in localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (token && userId) {
    // Add the 'connected' class to the body to show the admin mode
    document.body.classList.add("connected");

    document.getElementById("banner").style.display = "flex";
    document.getElementById("hide-filter").style.display = "none";
    document.getElementById("hideLogIn").style.display = "none"
    document.getElementById("backup").style.display="flex"
  }
}

// LOGOUT FUNCTION
document.getElementById("logout").addEventListener("click", () => {
  

  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  document.body.classList.remove("connected");

  
  document.getElementById("banner").style.display = "none";

  
  document.getElementById("hide-filter").style.display = "flex";
  document.getElementById("hideLogIn").style.display = "flex"
  document.getElementById("backup").style.display="none"

}); 


function clickOnLinkModifier() {
  // Get the link element by ID
  linkForModify = document.getElementById("backup");

  // Check if the link exists
  if (linkForModify) {
    // Add a click event listener to the link
    linkForModify.onclick = () =>{
  
      document.getElementById("modal").style.display = "flex"; // 
      document.getElementById("modal-works").style.display = "flex"; 

      // Call the function to fetch works and update the modal
      fetchWorksAndUpdateModal();
    };
  }
}

// Function to fetch works from the API and update the modal
function fetchWorksAndUpdateModal() {
  // Use the Fetch API to get data from the API
  fetch("http://localhost:5678/api/works")
    .then(function(response) {
      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json(); // Parse the JSON data
    })
    .then(function(data) {
      // Update the modal with the fetched data
      updateWorksModal(data);
    })
    .catch(function(error) {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to update the modal with works data
function updateWorksModal(data) {
modalWorksContainer = document.getElementById("modal-works");

  // Clear existing content
  modalWorksContainer.innerHTML = "";

  // Loop through the data and create elements to display
  data.forEach(function(work) {
    workElement = document.createElement("div"); // Create a new div for each work
    workElement.textContent = work.title; // Set the title
    modalWorksContainer.appendChild(workElement); // Add the new element to the modal
  });
}

function createWorkFigureInModal(work) {
  // Check if the work object is valid
  if (!work) {
    console.error("Work object is missing.");
    return; 
  }

  // Create the figure element
  let myFigure = document.createElement("figure");

  // Set the class name based on the category ID
  myFigure.className = "work-item category-id-" + work.categoryId;

  // Set a ID
  myFigure.id = "work-item-popup-in-modal-" + work.id;

  // Create and append the image element
  let imgElement = createImageElement(work); 
  if (imgElement) {
    myFigure.appendChild(imgElement);
  }

  // Create and append the trash icon
  let trashIcon = createTrashIcon(work); 
  if (trashIcon) {
    myFigure.appendChild(trashIcon);
  }
  return myFigure;
}


function updateWorksModal(works) {
  let modalContent = document.querySelector(
    "#modal-works.modal-gallery .modal-content"
  );


  if (!modalContent) {
    console.log("Modal content not found");
    return; 
  }

  // Clear the existing content in the modal
  modalContent.innerHTML = ""; 

  
  for (let i = 0; i < works.length; i++) {
    let work = works[i]; // Get the current work
    let workFigure = createWorkFigureInModal(work); // Create an HTML element for the work
    modalContent.appendChild(workFigure); // Add the work figure to the modal content
    setupTrashIconListener(work); // Set up the listener for deleting the work
  }
}


//6--
//In page - la construction et le retourn d'un element <figure>,
//qui va contenir toutes les infos sur le travaux
function createWorkFigureInPage(work) {
  // Create a <figure> element
  let myFigure = document.createElement("figure");

  // Set class and id for the figure
  myFigure.className = `work-item category-id-${work.categoryId}`;
  myFigure.id = `work-item-popup-in-page-${work.id}`;

  // Create and add the image element
  let img = document.createElement("img");
  img.src = work.imageUrl; 
  img.alt = work.title; 
  myFigure.appendChild(img);

  // Create and add a <figcaption>
  let figCaption = document.createElement("figcaption");
  figCaption.textContent = work.title; // Set the text of the caption to the work title
  myFigure.appendChild(figCaption);

  return myFigure;
}

//7--
// picture creation
function createImageElement(work) {
  let myImg = document.createElement("img");
  myImg.src = work.imageUrl;
  myImg.alt = work.title;
  return myImg;
}
//8--
//Creation trash
function createTrashIcon() {
  let trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");

  return trashIcon;
}
//9--
// Delete window 
function setupTrashIconListener(work) {
  // Get the trash icon element using its ID
  trashIcon = document.getElementById(`work-item-popup-in-modal-${work.id}`).querySelector(".trash");

  if (trashIcon) {
    // Add a click event listener to the trash icon
    trashIcon.addEventListener("click", () => {
      event.stopPropagation(); // Stop the event from bubbling up

      // Show a confirmation dialog to the user
      userConfirmed = confirm("Are you sure you want to delete this item?");

      // If the user confirmed deletion
      if (userConfirmed) {
        deleteWork(work.id); 
        alert("Item deleted successfully!"); 
      }
    });
  }
}
//10--
// Function for delete 
// request API for deletion 
// token send for autorisation
async function deleteWork(workId) {
  // Get the token from local storage
  const token = localStorage.getItem("token");

  if (!token) {
      alert("You must be logged in to delete a work.");
      return; // Exit if there's no token
  }

  // Make the DELETE request
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
      },
  });

  // Check if the response is successful
  if (response.ok) {
      // Remove the work items from the DOM
      const workItem = document.getElementById(`work-item-${workId}`);
      if (workItem) {
          workItem.remove();
      }

      // Update the modal (optional)
      fetchWorksAndUpdateModal(); // Reload works after deletion
  } else {
      // Handle deletion failure
      alert("Failed to delete work. Please try again.");
  }

  // Reset the modal form (if necessary)
  resetModalForm();
}

//11-- response handling from API 
function handleDeleteResponse(response, workId) {
  // Create a message variable to hold alert messages
  let message;

  // Check the response status
  if (response.status === 500 || response.status === 503) {
    message = "unexpected behavior!";
  } else if (response.status === 401) {
    message = "deletion impossible";
  } else if (response.status === 200 || response.status === 204) {
    // Remove the elements from the DOM
    document.getElementById(`work-item-${workId}`).remove();
    document.getElementById(`work-item-popup-in-page-${workId}`).remove();
    document.getElementById(`work-item-popup-in-modal-${workId}`).remove();
    return; // Exit the function after successful deletion
  } else {
    message = "unknown error!";
  }

  // Show the alert with the determined message
  alert(message);
}

//12--
// Modal visibility 
function openWorkModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal-works").style.display = "none";
  document.getElementById("modal-works").style.cssText = ` display: none`;

  document.querySelector(".modal-content").style.cssText = `display: flex`;
}
//13--
//Manage modal closures
function setupModalCloseListeners() {
  // Select all modal elements
  const modalWorks = document.getElementById("modal-works");
  const modalEdit = document.getElementById("modal-edit");
  const modal = document.getElementById("modal");

  // If modal elements exist, add event listeners
  if (modalWorks) {
    modalWorks.addEventListener("click", (event) => event.stopPropagation());
  }

  if (modalEdit) {
    modalEdit.addEventListener("click", (event) => event.stopPropagation());
  }

  // Add listener to close modal when clicking outside of it
  if (modal) {
    modal.addEventListener("click", closeModal);
  }

  // Select buttons to close modals
  const closeButton1 = document.getElementById("button-to-close-first-window");
  const closeButton2 = document.getElementById("button-to-close-second-window");}

//14--
//Hide the main modal and the 2 sections: modal-works and modal-edit
function closeModal(event) {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal-works").style.display = "none";
  document.getElementById("modal-edit").style.display = "none";
}
//15--
// close lodal and reset 
function closeModalAndReset(event) {
  closeModal(event);
  resetModalForm();
}
//16--
// Reset modal form
// If the element with id = "form-image-preview" exists, it is removed from the DOM
// Show the gray icon with the sun and the mountains
// Show label id new-image
// Display the <p> tag which gives information on the size of the photo
// Padding for the div which contains the 3 previous elements
// Change the color of the validate button to indicate that it is not active
function resetModalForm() {
  if (document.getElementById("form-image-preview")) {
    document.getElementById("form-image-preview").remove();
  }
  document.getElementById("modal-edit-work-form").reset();
  document.getElementById("photo-add-icon").style.display = "block";
  document.getElementById("new-image").style.display = "block";
  document.getElementById("photo-size").style.display = "block";
  document.getElementById("modal-edit-new-photo").style.padding =
    "30px 0 19px 0";
  document.getElementById("submit-new-work").style.backgroundColor = "grey";
}

//17--
// Navigate between the 2 sections of the modal + Reset the form to edit
function setupModalEditListeners() {
  // Find the "Add" button that shows the edit modal and hide the works list
  let addButton = document.getElementById("modal-edit-add");
  addButton.addEventListener("click", function (event) {
    event.preventDefault(); 
    document.getElementById("modal-works").style.display = "none";
    document.getElementById("modal-edit").style.display = "block";
  });

  // Find the "Return" arrow button and set it up to go back to the works list
  let returnButton = document.getElementById("arrow-return");
  returnButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("modal-works").style.display = "block"; 
    document.getElementById("modal-edit").style.display = "none"; 
    resetModalForm(); // Reset the form (this function should be defined elsewhere)
  });
}
//18--
// Ask the API for the categories and pass them to the populateCategories function to increase the list
async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    populateCategories(data);
  
}
//19--
// Creation of a list of dropdown options with the categories obtained previously
function populateCategories(categories) {

  const selectElement = document.querySelector("select.choice-category");

  // Loop through each category in the categories array
  categories.forEach(function(category) {
    // Create a new <option> element
    let myOption = document.createElement("option");
    
    // Set the value and text content of the option
    myOption.value = category.id;
    myOption.textContent = category.name;
    
    // Append the new option to the select element
    selectElement.appendChild(myOption);
  });
}

//20--//Management of the SUBMIT event sent by the "Validate" button on the photo addition
function setupFormHandlers() {
  document
    .getElementById("form-image")
    .addEventListener("change", function (event) {
      event.preventDefault(); 
      handleImagePreview();
    });
}

//21--
//// Image management - does it respect the dimensions?
//If there is at least one selected image type file
// the file is stored in the "file" variable
// The function stops if the image is too large
// Anonymous function for the FileReader onload event.
// If the file is read successfully, we call this function and give it an "e" event.
function handleImagePreview() {
  // Get the file input element by its ID
  let fileInput = document.getElementById("form-image");
  
  // Set the maximum file size to 4MB (4 * 1024 * 1024 bytes)
  let maxFileSize = 4 * 1024 * 1024;
  let errorMessage = document.getElementById("error-message");
  errorMessage.textContent = ""; // Reset the error message

  // Check if a file was selected
  if (fileInput.files.length > 0) {
    // Get the first file from the file input
    let file = fileInput.files[0];

    // Validate file size and type
    if (file.size > maxFileSize) {
      errorMessage.textContent = "The file is too large. Maximum size is 4MB.";
      return; // Stop the function if the file is invalid
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      errorMessage.textContent = "Unsupported format. Please upload a JPEG or PNG image.";
      return; // Stop the function if the file is invalid
    }

    // Create a FileReader object to read the file data
    let reader = new FileReader();

    // When the file is loaded, display the image in the preview
    reader.onload = function (go) {
      // Get the image element where the preview will be shown
      let imagePreview = document.getElementById("image-preview");

      // Set the image source to the loaded file data (base64 format)
      imagePreview.src = go.target.result;

      // Make sure the image is visible (it might be hidden initially)
      imagePreview.style.display = "block";
    };

    // Read the file as a data URL (this will trigger the onload event)
    reader.readAsDataURL(file);
  }
}

// Attach the function to the file input's change event, so it runs when a file is selected
document.getElementById("form-image").addEventListener("change", handleImagePreview);

//22--
//add new picture in the gallery and modal
function submitNewWork() {
  // Get form values
  title = document.getElementById("form-title").value;
  category = document.getElementById("form-category").value;
  imageFile = document.getElementById("form-image").files[0];

  // Basic validation to check if fields are filled
  if (!title || !category || !imageFile) {
    alert("Please fill in all fields and select an image.");
    return; // Exit the function if validation fails
  }

  // Create a new FormData object to collect the form data
  var formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", imageFile);

  // Prepare the request
  xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5678/api/works", true);
  xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

  // Define what happens on successful data submission
  xhr.onload = function() {
    if (xhr.status === 200) {
      var jsonResponse = JSON.parse(xhr.responseText);
      addNewWorkToPage(jsonResponse);  // Update the page with the new work
      addNewWorkToModale(jsonResponse); // Add new work to the modal
    } else {
      alert("Error: " + xhr.status); // Display error if the request fails
    }
  };

  // Send the request with the form data
  xhr.send(formData);
}

//23--
//Management of the API response, after sending a new job
function handleNewWorkResponse(response) {
  if (response.status === 500) { // Unexpected Error
    alert("Unexpected Error");
  } else if (response.status === 401) { // Unauthorized
    alert("Unauthorized");
  } else if (response.status === 400) { // Bad Request
    alert("Bad Request");
  } else if (response.status === 201) { // Created
    return response.json(); // Return parsed JSON for created response
  } else { // Unknown Error
    alert("Unknown Error");
  }
}


//24--
// Add new work to the gallery Close and reset the add modal
function addNewWorkToPage(json) {
  let myFigure = createWorkFigureInPage(json);
  document.querySelector("div.gallery").appendChild(myFigure);
  //closeModalAndReset();
  resetModalForm();
}

//25--
// add new work in the modal
function addNewWorkToModale(json) {
  let myFigure = createWorkFigureInModal(json);
  document
    .querySelector("#modal-works.modal-gallery .modal-content")
    .appendChild(myFigure);

  // closeModalAndReset();
  resetModalForm();
  setupTrashIconListener(json);
}
//26--
//preview a new photo, hide elements and modify the container style
//try to get the image preview element with id=form-image-preview
//if the element does not exist, it is created with its characteristics: id, src, etc...
//IF - if the element with id = form-image-preview does not exist, the imgPreview element is added to the top of the element
//with id = modal-edit-new-photo (the one with the sun+mountain icon + "+Add photo" button + image dimension)
function updateImagePreview(imageSrc) {
  let imgPreview =
    document.getElementById("form-image-preview") ||
    document.createElement("img");
  imgPreview.id = "form-image-preview";
  imgPreview.src = imageSrc;
  imgPreview.alt = "Prévisualisation de la nouvelle photo";
  imgPreview.style.width = "129px";
  imgPreview.style.height = "168px";
  imgPreview.style.objectFit = "cover";
  if (!document.getElementById("form-image-preview")) {
    let formDiv = document.getElementById("modal-edit-new-photo");
    formDiv.prepend(imgPreview);
  }
  document.getElementById("photo-add-icon").style.display = "none";
  document.getElementById("new-image").style.display = "none";
  document.getElementById("photo-size").style.display = "none";

  document.getElementById("modal-edit-new-photo").style.padding = "0";
}


//27--
//select all elements of the form. If change => call the validation function
function bindFormFieldsCheck() {
  let formFields = document.querySelectorAll(
    "#modal-edit-work-form input, #modal-edit-work-form select"
  );
  formFields.forEach((field) => {
    field.addEventListener("input", validateFormFields);
  });
}

//28--
//Initializing a variable to true - allFieldsFilled
//Check if the value of each element in the formFields list is empty
//(trim eliminates leading and trailing spaces)
//If an element is empty, the value of the allFieldsFilled variable is set to false
//The "Validate" button with id = submit-new-work changes color depending on the value of the allFieldsFilled variable
//if allFieldsFilled is true - green color
//allFieldsFilled is false - gray color
//after pressing the validate button, the modal closes
function validateFormFields() {
  // Select all input and select elements within the form
  let formFields = document.querySelectorAll(
    "#modal-edit-work-form select, #modal-edit-work-form input"
  );

  // Check if all fields are filled
  for (let i = 0; i < formFields.length; i++) {
    if (!formFields[i].value.trim()) {
      // If any field is empty, change the button color and return
      document.getElementById("submit-new-work").style.backgroundColor = "#A7A7A7";
      return; // Exit the function early
    }
  }

  // If all fields are filled, change the button color to indicate it's ready to submit
  document.getElementById("submit-new-work").style.backgroundColor = "#1D6154";
}

function ListenSubmitModalEdit() {
  // Add a submit event listener to the form
  document
    .getElementById("modal-edit-work-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the page from reloading

      // Validate form fields
      validateFormFields();

      // Check if the button is enabled (fields are filled)
      if (document.getElementById("submit-new-work").style.backgroundColor === "#1D6154") {
        submitNewWork(); // Call the submission function
      } else {
        alert("Please fill all fields before submitting."); // Alert the user
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  handleAdminMode(); //check if there is a token and userId in localStorage (authenticated user)
  clickOnLinkModifier(); // click on the "edit" link
  setupModalCloseListeners(); //Manage modal closures
  setupModalEditListeners(); // Navigate between the 2 sections of the modal + Reset the form to edit
  fetchCategories(); // Ask the API for the categories and pass them to the populateCategories function to populate the list
  setupFormHandlers(); //Management of the SUBMIT event sent by the "Validate" button of the photo addition form
  validateFormFields(); //Check if all fields are filled in, to add a photo
  bindFormFieldsCheck(); //select all elements of the form. If change => call the validation function
  ListenSubmitModalEdit();
});
