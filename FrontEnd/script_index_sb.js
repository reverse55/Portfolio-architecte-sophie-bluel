// Add dynamic works to the portfolio gallery on the page
// Fetch existing works from the API
document.addEventListener("DOMContentLoaded", async () => {
  // Select the gallery element where works will be displayed
  let gallery = document.querySelector(".gallery");

    // Fetch works data from the specified API endpoint
    let response = await fetch("http://localhost:5678/api/works");
    // Convert the response to JSON format
    let dataWorks = await response.json();
    let works = dataWorks; // Store the fetched works in a variable
    console.log(works); // Log the works to the console for debugging

    // Loop through each work in the fetched data
    works.forEach((work) => {
      // Create a <figure> element for each work
      let figureSite = document.createElement("figure");
      // Set class names for styling based on the category ID
      figureSite.className = `work-item category-id-0 category-id-${work.categoryId}`;
      figureSite.id = `work-item-${work.id}`; // Set a unique ID for the figure

      // Create an <img> element to display the work's image
      let imageSite = document.createElement("img");
      imageSite.src = work.imageUrl; // Set the source of the image
      imageSite.alt = work.title; // Set the alt text for the image

      // Create a <figcaption> element for the work's title
      let figCaptionSite = document.createElement("figcaption");
      figCaptionSite.textContent = work.title; // Set the text content to the work's title

      // Append the <img> and <figcaption> to the <figure>
      figureSite.appendChild(imageSite);
      figureSite.appendChild(figCaptionSite);
      // Append the <figure> to the gallery
      gallery.appendChild(figureSite);

      console.log(work.title); // Log the work's title to the console
    });
  
});


// Adding category filters to filter works in the gallery
// Fetching existing categories from the API
document.addEventListener("DOMContentLoaded", async () => {
    // Fetch the categories from the API
    let response = await fetch("http://localhost:5678/api/categories");


    let dataCategories = await response.json();
    
    // Store the categories in a variable
    let categories = dataCategories; 

    // Add an additional category 'All' at the start of the categories array
    categories.unshift({ id: 0, name: "Tous" });

    // Loop through each category to create filter buttons
    categories.forEach((category) => {
      // Create a <button> element for filtering
      let filterButton = document.createElement("button");
      filterButton.classList.add("work-filter"); // Add a class for filtering
      filterButton.classList.add("filters-design"); // Add a class for styling

      // If it's the 'All' category, add active class to highlight it
      if (category.id === 0) {
        filterButton.classList.add("filter-active", "filter-all");
      }

      // Set a custom attribute to store the category ID
      filterButton.setAttribute("data-filter", category.id);
      // Set the button's text to the category name
      filterButton.textContent = category.name;

      // Append the new button to the existing filters container
      document.querySelector("div.filters").appendChild(filterButton);

      // Add a click event listener to the filter button
      filterButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default action of the button

        // Remove active class from all filter buttons
        document.querySelectorAll(".work-filter").forEach((button) => {
          button.classList.remove("filter-active");
        });
        // Add active class to the clicked button
        event.target.classList.add("filter-active");

        // Get the category ID from the clicked button
        let categoryId = filterButton.getAttribute("data-filter");

        // Hide all work items first
        document.querySelectorAll(".work-item").forEach((workItem) => {
          workItem.style.display = "none"; // Hide each work item
        });

        // Show work items that belong to the selected category
        document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach((workItem) => {
          workItem.style.display = "block"; // Show the matching work items
        });
      });
    });
});

// LOGIN
// This function changes the interface to show admin elements when a user is logged in
function handleAdminMode() {
  // Get the token and userId from local storage
  const token = localStorage.getItem("token"); // Retrieve the token
  const userId = localStorage.getItem("userId"); // Retrieve the userId

  // Check if both the token and userId exist
  if (token !== null && userId !== null) {
    // If the user is authenticated, make changes to the UI

    // Add the class 'connected' to the body element
    document.querySelector("body").classList.add("connected");

    // Show the admin bar by changing its display style to 'flex'
    const adminBar = document.getElementById("barre");
    adminBar.style.display = "flex";

    // Hide the filters section since it's not needed for admins
    const filtersSection = document.getElementById("all-filters");
    filtersSection.style.display = "none";

    // Add padding to the admin-only space for better layout
    const adminSpace = document.getElementById("space-only-admin");
    adminSpace.style.paddingBottom = "25px";
  }
}


// LOGOUT
// This function clears the local storage data and updates the visual appearance of the page when the admin logs out

// Add an event listener to the logout link in the navigation
document.getElementById("nav-logout").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default behavior of the link

    // Remove userId and token from local storage to log the user out
    localStorage.removeItem("userId"); // Remove the userId
    localStorage.removeItem("token"); // Remove the authentication token

    // Update the page to reflect that the admin is logged out
    document.querySelector("body").classList.remove("connected"); // Remove the 'connected' class from the body

    // Hide the admin bar since the user is no longer logged in
    let topBar = document.getElementById("barre");
    topBar.style.display = "none"; // Set the display of the admin bar to 'none'

    // Show the filters section, which is needed when the admin is logged out
    let filters = document.getElementById("all-filters");
    filters.style.display = "flex"; // Set the display of the filters section to 'flex'

    // Reset the padding for the admin-only space to improve layout
    let space = document.getElementById("space-only-admin");
    space.style.paddingBottom = "0"; // Set padding-bottom to 0
  });




// click sur on link "modifier"
function clickOnLinkModify() {
  let lienPourModifier = document.getElementById("update-works");
    lienPourModifier.addEventListener("click", function (event) {
      event.preventDefault();
    
      document.getElementById("modal").style.display = "flex";
      document.getElementById("modal-works").style.display = "block";
    });
  fetchWorksAndUpdateModal();
}



// Request to the API to retrieve existing works.
// If the response is okay, call the function updateWorksModal with the received data.
async function fetchWorksAndUpdateModal() {

    // Send a request to the API to fetch existing works
    const response = await fetch("http://localhost:5678/api/works");
    // Parse the response data as JSON
    const data = await response.json();

    // Call the function to update the modal with the fetched works data
    updateWorksModal(data);
  } 


// In modal - constructing and returning a <figure> element
// that will contain all the information about the work
function createWorkFigureInModal(work) {
  // Create a <figure> element to represent the work
  let myFigure = document.createElement("figure");

  // Set class names for the figure element to categorize it
  myFigure.className = `work-item category-id-0 category-id-${work.categoryId}`;
  
  // Set the ID for the figure element for easy reference
  myFigure.id = `work-item-popup-in-modal-${work.id}`;

  // Append an image element for the work to the figure
  myFigure.appendChild(createImageElement(work));

  // Append a trash icon element for deleting the work to the figure
  myFigure.appendChild(createTrashIcon(work));

  // Return the constructed figure element
  return myFigure;
}





function updateWorksModal(works) {
  // Select the modal content element where works will be displayed
  let modalContent = document.querySelector(
    "#modal-works.modal-gallery .modal-content"
  );

  // Clear any existing content in the modal content area
  modalContent.innerText = "";

  // Loop through each work in the works array
  works.forEach((work) => {
    // Create a figure element for the work using the createWorkFigureInModal function
    let workFigure = createWorkFigureInModal(work);

    // Append the newly created work figure to the modal content
    modalContent.appendChild(workFigure);

    // Set up the trash icon listener for the current work to enable deletion
    setupTrashIconListener(work);
  });
}


function createWorkFigureInPage(work) {
  // Create a <figure> element to represent the work
  let myFigure = document.createElement("figure");

  // Set class names for the figure element to categorize it
  myFigure.className = `work-item category-id-0 category-id-${work.categoryId}`;
  
  // Set the ID for the figure element for easy reference
  myFigure.id = `work-item-popup-in-page-${work.id}`;

  // Append an image element for the work to the figure
  myFigure.appendChild(createImageElement(work));

  // Create <figcaption> for the title of the work
  let figCaptionSite = document.createElement("figcaption");
  figCaptionSite.textContent = work.title; // Set the text of the figcaption to the work's title

  // Append the <figcaption> to the figure
  myFigure.appendChild(figCaptionSite);

  // Return the constructed figure element
  return myFigure;
}


// Function to create an image element for a work item
function createImageElement(work) {
  // Create a new <img> element
  let myImg = document.createElement("img");
  
  // Set the source of the image to the work's image URL
  myImg.src = work.imageUrl;

  // Set the alt text of the image to the work's title for better accessibility
  myImg.alt = work.title;

  // Return the created image element
  return myImg;
}


// Function to create and configure the <i> element for the trash icon
function createTrashIcon() {
  // Create a new <i> element for the icon
  let trashIcon = document.createElement("i");
  
  // Add classes to the icon for Font Awesome styling
  trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");

  // Return the created trash icon element
  return trashIcon;
}

// Display a window to confirm deletion. If confirmed, then delete the work item.
function setupTrashIconListener(work) {
  // Find the trash icon associated with the specific work item
  let trashIcon = document
    .getElementById(`work-item-popup-in-modal-${work.id}`) // Get the modal for the work item using its ID
    .querySelector(".trash"); // Select the trash icon inside that modal

  // Check if the trash icon exists
  if (trashIcon) {
    // Add a click event listener to the trash icon
    trashIcon.addEventListener("click", async function (event) {
      event.preventDefault(); // Prevent the default action of the event (like a link click)
      event.stopPropagation(); // Stop the event from bubbling up to parent elements

      // Ask the user for confirmation to delete the item
      if (confirm("veux tu vraiment supprimer?")) {
        // If confirmed, call the deleteWork function to delete the work item
        await deleteWork(work.id);
      }
    });
  }
}


async function deleteWork(workId) {
  
    // Send a DELETE request to the API
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Specify the content type
        Authorization: "Bearer " + localStorage.getItem("token"), // Include the token for authorization
      },
    });

    // Check if the response indicates success
    if (response.ok) {
      // Remove the work item from the DOM
      document.getElementById(`work-item-${workId}`)?.remove();
      document.getElementById(`work-item-popup-in-modal-${workId}`).remove();
      document.getElementById(`work-item-popup-in-page-${workId}`).remove();
      
      // Reload works after deletion
      await fetchWorksAndUpdateModal(); // Reload the works after deletion
    } else {
      // Handle server response if not successful
      handleDeleteResponse(response, workId);
    }
  
}
// This function handles the server's response after trying to delete a work item.
function handleDeleteResponse(response, workId) {
  // Check the response status to see what happened
  if (response.status === 200) { // If the item was deleted successfully
    // Remove the item from the webpage
    document.getElementById(`work-item-${workId}`).remove();
    document.getElementById(`work-item-popup-in-page-${workId}`).remove();
    document.getElementById(`work-item-popup-in-modal-${workId}`).remove();
  } else if (response.status === 204) { // No Content (deleted successfully)
    // Just do nothing; the item is already removed.
  } else if (response.status === 401) {
    alert("tu n'es pas authorisé à supprimer"); 
  } else if (response.status === 500) { 
    alert("probleme avec le server"); 
  } else if (response.status === 503) { 
    alert("server est indisponible"); 
  }
}



// This function shows the modal content while hiding the main modal and works modal.
function openWorkModal() {
  // Get the main modal and works modal elements
  const mainModal = document.getElementById("modal"); // Get the main modal
  const worksModal = document.getElementById("modal-works"); // Get the works modal
  const modalContent = document.querySelector(".modal-content"); // Get the content area of the modal

  // Hide the main modal and works modal
  mainModal.style.display = "none"; // Hide the main modal
  worksModal.style.display = "none"; // Hide the works modal

  // Show the modal content
  modalContent.style.display = "flex"; // Display the modal content
}


// This function manages the closing of modals in the application.
function setupModalCloseListeners() {
  // Select the modal-works and modal-edit elements
  const modalWorks = document.getElementById("modal-works");
  const modalEdit = document.getElementById("modal-edit");
  const mainModal = document.getElementById("modal");

  // Add a click event to the modal-works to stop it from closing when clicked inside
  if (modalWorks) {
    modalWorks.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from closing the modal
    });
  }

  // Add a click event to the modal-edit to stop it from closing when clicked inside
  if (modalEdit) {
    modalEdit.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from closing the modal
    });
  }

  // When the main modal is clicked, close it
  if (mainModal) {
    mainModal.addEventListener("click", closeModal);
  }

  // Add event listeners for the close buttons
  const closeFirstButton = document.getElementById("button-to-close-first-window");
  if (closeFirstButton) {
    closeFirstButton.addEventListener("click", closeModal); // Close the modal
  }

  const closeSecondButton = document.getElementById("button-to-close-second-window");
  if (closeSecondButton) {
    closeSecondButton.addEventListener("click", closeModalAndReset); // Close and reset
  }
}


// This function hides the main modal and its two sections: modal-works and modal-edit
function closeModal(event) {
  // Find the main modal by its ID and hide it
  document.getElementById("modal").style.display = "none"; // Hide the main modal

  // Find the modal for works by its ID and hide it
  document.getElementById("modal-works").style.display = "none"; // Hide the works modal

  // Find the modal for editing by its ID and hide it
  document.getElementById("modal-edit").style.display = "none"; // Hide the edit modal
}


// close the modal and reset
function closeModalAndReset(event) {
  closeModal(event);
  resetModalForm();
}


// This function resets the modal form to its starting state
function resetModalForm() {
  // Check if the image preview exists
  const imagePreview = document.getElementById("form-image-preview");
  if (imagePreview) {
    // If it exists, remove it from the document
    imagePreview.remove();
  }

  // Find the form where the user edits the work and reset it
  const editForm = document.getElementById("modal-edit-work-form");
  editForm.reset(); // Clear all input fields in the form

  // Show the icon that allows users to add a photo
  const addIcon = document.getElementById("photo-add-icon");
  addIcon.style.display = "block"; // Make the add icon visible

  // Show the label for the new image input
  const newImageLabel = document.getElementById("new-image");
  newImageLabel.style.display = "block"; // Make the new image label visible

  // Show the paragraph that gives information about photo dimensions
  const sizeInfo = document.getElementById("photo-size");
  sizeInfo.style.display = "block"; // Make the size info visible

  // Set the padding for the div that contains the photo-related elements
  const photoDiv = document.getElementById("modal-edit-new-photo");
  photoDiv.style.padding = "30px 0 19px 0"; // Adjust the padding

  // Change the submit button color to show it's not active yet
  const submitButton = document.getElementById("submit-new-work");
  submitButton.style.backgroundColor = "grey"; // Set the button color to grey
}


// Function to navigate between the two sections of the modal and reset the form for editing
function setupModalEditListeners() {
  // Set up the "modal-edit-add" button from the works list
  document
    .getElementById("modal-edit-add")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default action of the button
      document.getElementById("modal-works").style.display = "none"; // Hide the works modal
      document.getElementById("modal-edit").style.display = "block"; // Show the edit modal
    });
  // Set up the "arrow-return" button to return to the works modal
  document
    .getElementById("arrow-return")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default action of the button
      document.getElementById("modal-works").style.display = "block"; // Show the works modal
      document.getElementById("modal-edit").style.display = "none"; // Hide the edit modal
      resetModalForm(); // Call the function to reset the form fields
    });
}


// Function to fetch categories from the API and fill the list using populateCategories
async function fetchCategories() {
    // Send a request to the API to get categories
    const response = await fetch("http://localhost:5678/api/categories");
    // Convert the response data to JSON format
    const data = await response.json();
    
    // Call the function to populate the categories with the fetched data
    populateCategories(data);
  
}

// Function to create a dropdown list of options using the categories received
function populateCategories(categories) {
  // Loop through each category in the categories array
  categories.forEach((category) => {
    // Create a new option element for the dropdown menu
    let myOption = document.createElement("option");
    
    // Set the value of the option to the category's unique ID
    myOption.value = category.id;
    
    // Set the text that will be displayed for the option to the category's name
    myOption.textContent = category.name;
    
    // Find the <select> element with the class "choice-category" and add the option to it
    document.querySelector("select.choice-category").appendChild(myOption);
  });
}

// Function to set up handlers for form events
function setupFormHandlers() {
  // Find the file input element with the ID "form-image"
  document
    .getElementById("form-image").addEventListener("change", function (event) {
      // This function runs when the user selects a new file

      event.preventDefault(); // Prevent the page from refreshing

      // Call the function that shows a preview of the selected image
      handleImagePreview(); 
    });
}

// Function to handle the image upload and show a preview
function handleImagePreview() {
  // Get the file input element where users can select an image
  let fileInput = document.getElementById("form-image"); // This is the "+ Add photo" button in the second modal
  let maxFileSize = 4 * 1024 * 1024; // Maximum allowed file size is 4 MB (megabytes)

  // Check if the user has selected at least one file
  if (fileInput.files.length > 0) {
    // Get the first file that the user selected
    let file = fileInput.files[0];

    // Check if the file is too large or not an image
    if (
      file.size > maxFileSize || // Check if the file size is more than 4 MB
      (file.type !== "image/jpeg" && // Check if the file type is not JPEG
        file.type !== "image/png" && // Check if the file type is not PNG
        file.type !== "image/jpg") // Check if the file type is not JPG
    ) {
      // Show an alert if the file is too large or the format is not allowed
      alert(
        "le fichier depasse 4mo (.jpeg, .jpg, or .png)"
      );
      return; // Stop the function if the file is invalid
    }

    // Create a FileReader object to read the file
    let reader = new FileReader();
    
    // Use addEventListener to handle the load event of the FileReader
    reader.addEventListener('load', function (e) {
      // Call the function to show the image preview using the file data
      updateImagePreview(e.target.result);
    });

    // Start reading the file as a data URL (to show the image)
    reader.readAsDataURL(file);
  }
}

// Function to add a new photo to the gallery and modal
async function submitNewWork() {
  // Create a new FormData object to hold the form data
  let formData = new FormData();
  
  // Collect data from the form
  formData.append("title", document.getElementById("form-title").value); 
  formData.append("category", document.getElementById("form-category").value); 
  formData.append("image", document.getElementById("form-image").files[0]); 

  // Send a POST request to the API to add the new work
  let response = await fetch("http://localhost:5678/api/works", {
    method: "POST", // Use POST method to send the data
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"), // Add authorization token
    },
    body: formData, // Attach the FormData object to the request body
  });

  // Handle the response from the request
  await handleNewWorkResponse(response); 

  // Check if the request was successful
  if (response.ok) {
    let json = await response.json(); // Parse the response data as JSON
    addNewWorkToPage(json); // Add the new work to the gallery
    addNewWorkToModale(json); // Add the new work to the modal
  }
}

// Function to handle the API response after sending a new work
function handleNewWorkResponse(response) {
  if (response.status === 500) {
    alert("erreur inatendue!"); // Server error
  } else if (response.status === 401) {
    alert("pas authorisé!"); // User not authorized
  } else if (response.status === 400) {
    alert("impossible à ajouter"); // Bad request
  } else if (response.status === 201) {
    return response; // Work created successfully
  }
}

// Function to add a new work to the gallery
function addNewWorkToPage(json) {
  // Create a new figure element for the gallery using the provided data
  let myFigure = createWorkFigureInPage(json);
  
  // Add the new figure to the gallery section on the page
  document.querySelector("div.gallery").appendChild(myFigure);
  
  // Reset the modal form to prepare for the next entry
  resetModalForm();
}

// Function to add a new work to the modal
function addNewWorkToModale(json) {
  // Create a new figure element for the modal using the provided data
  let myFigure = createWorkFigureInModal(json);
  
  // Add the new figure to the modal's content area
  document.querySelector("#modal-works.modal-gallery .modal-content").appendChild(myFigure);
  
  // Reset the modal form to prepare for the next entry
  resetModalForm();
  
  // Set up the trash icon listener for the new work in the modal
  setupTrashIconListener(json);
}

// Function to preview a new photo and update the modal layout
function updateImagePreview(imageSrc) {
  // Try to get the image preview element by its ID
  let imgPreview = document.getElementById("form-image-preview") || document.createElement("img");
  
  // Set the properties for the image preview
  imgPreview.id = "form-image-preview"; // Assign an ID to the image element
  imgPreview.src = imageSrc; // Set the source of the image to the provided imageSrc
  imgPreview.alt = "Preview of the new photo"; // Set alt text for accessibility
  imgPreview.style.width = "129px"; // Set the width of the image
  imgPreview.style.height = "168px"; // Set the height of the image
  imgPreview.style.objectFit = "cover"; // Ensure the image covers the area without distortion

  // If the image preview element was just created, prepend it to the modal
  if (!document.getElementById("form-image-preview")) {
    let formDiv = document.getElementById("modal-edit-new-photo");
    formDiv.prepend(imgPreview); // Add the image preview to the beginning of the modal
  }

  // Hide the elements related to adding a new photo
  document.getElementById("photo-add-icon").style.display = "none"; // Hide the add photo icon
  document.getElementById("new-image").style.display = "none"; // Hide the new image prompt
  document.getElementById("photo-size").style.display = "none"; // Hide the photo size information

  // Adjust the padding of the modal containing the new photo
  document.getElementById("modal-edit-new-photo").style.padding = "0"; // Remove padding for better layout
}


// Function to bind validation to form fields
function bindFormFieldsCheck() {
  // Select all input and select elements in the form
  let formFields = document.querySelectorAll("#modal-edit-work-form input, #modal-edit-work-form select"
  );
  // Loop through each form field
  formFields.forEach((field) => {
    // Add an event listener for input changes
    field.addEventListener("input", validateFormFields);
  });
}

// Function to validate form fields and update the submit button's color
function validateFormFields() {
  // Select all input and select elements in the form
  let formFields = document.querySelectorAll(
    "#modal-edit-work-form select, #modal-edit-work-form input"
  );

  let allFieldsFilled = true; // Start by assuming all fields are filled

  // Check each form field to see if it's empty
  formFields.forEach((field) => {
    // If a field is empty, set allFieldsFilled to false
    if (!field.value.trim()) {
      allFieldsFilled = false;
    }
  });

  // Change the background color of the submit button based on field validation
  document.getElementById("submit-new-work").style.backgroundColor =
    allFieldsFilled ? "#1D6154" : "#A7A7A7"; // Green if filled, gray if not
}

// Function to listen for the submit event on the modal edit form
function ListenSubmitModalEdit() {
  // Add an event listener for the submit event on the form
  document
    .getElementById("modal-edit-work-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior (page reload)
      
      // Call the function to submit the new work
      submitNewWork();
    });
}


/* --- When logged in with ---
   --- user and password: --- */

// Wait for the HTML document to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Check if there is a token and userId in localStorage (indicating an authenticated user)
  handleAdminMode();

  // Set up a click event listener for the "edit" link
  clickOnLinkModify();

  // Set up listeners to manage the closing of modals
  setupModalCloseListeners();

  // Set up listeners to navigate between sections in the modal and reset the form for editing
  setupModalEditListeners();

  // Request categories from the API and pass them to the function to populate the categories list
  fetchCategories();

  // Set up the event handler for the "Submit" button of the photo upload form
  setupFormHandlers();

  // Validate if all fields are filled in before adding a photo
  validateFormFields();

  // Select all elements in the form. If any change occurs, call the validation function
  bindFormFieldsCheck();

  // Set up listeners for the submit event on the edit modal
  ListenSubmitModalEdit();
});



