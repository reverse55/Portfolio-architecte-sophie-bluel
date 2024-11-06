// Wait for the HTML document to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the login form for when it is submitted
  document
    .getElementById("user-login-form")
    .addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Collect the email and password from the form
      const user = {
        email: document.querySelector("#email").value, // Get email input value
        password: document.querySelector("#password").value, // Get password input value
      };

      // Send a POST request to the server to log in the user
      fetch("http://localhost:5678/api/users/login", {
        method: "POST", // Use the POST method for sending data
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(user), // Convert the user object to a JSON string
      })
        .then(function (response) {
          // Check the response status to determine the result of the login attempt
          if (response.ok) { // If the response status is OK (200)
            return response.json(); // Parse the JSON data from the response
          } else if (response.status === 404) { // If user is not found (404)
            alert("User not found"); // Alert the user
          } else if (response.status === 401) { // If unauthorized (401)
            alert("Unauthorized user"); // Alert the user
          } else { // For any other errors
            alert("Server error"); // Alert about server errors
          }
        })
        .then(function (data) {
          // If the login is successful, this block will execute
          if (data) { // Check if data is received
            // Store the token and user ID in local storage for later use
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            // Redirect the user to the index.html page after successful login
            location.href = "index.html";
          }
        })
    });
});
