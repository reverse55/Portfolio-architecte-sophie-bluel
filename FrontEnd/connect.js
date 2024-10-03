
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("identification");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

  
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // Check if the fields are empty
    if (!email || !password) {
      alert("Please fill out")
      return; 
    }

    // Create a user object with the email and password
    const user = {
      email: email,
      password: password,
    }


      // Send a POST request to the login API
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Indicate the content type
        },
        body: JSON.stringify(user), // Convert the user object to JSON
      });

    
      if (response.ok) {
        const data = await response.json(); 
        localStorage.setItem("token", data.token); // Save the token in local storage
        localStorage.setItem("userId", data.userId); // Save the user ID in local storage
        location.href = "index.html"; // Redirect to the homepage on success
      } else {
        // Handle different response statuses
        if (response.status === 404) {
          alert("User not found"); 
        } else if (response.status === 401) {
          alert("Unauthorized user"); 
        }
      }
  });
});