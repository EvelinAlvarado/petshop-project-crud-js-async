import { clientServices } from "../service/client-service.js";

// Get reference to the form element in the HTML document
const form = document.querySelector("[data-form");

// Function to retrieve and display client information for editing
const getInfo = () => {
  // Get the current URL
  const url = new URL(window.location);
  console.log(url);

  // Extract the client ID from the URL parameters
  const idUrl = url.searchParams.get("id");

  // Redirect to an error page if no ID is found in the URL
  if (idUrl === null) {
    window.location.href = "/screens/error.html";
  }

  // Get references to HTML elements for editing client information
  const editName = document.querySelector("[data-name]");
  const editEmail = document.querySelector("[data-email]");
  console.log(editName, "---", editEmail);

  /* clientServices.editClient(idUrl).then((profile) => console.log(profile)); */

  // Fetch client information based on the provided ID
  clientServices.editClient(idUrl).then((profile) => {
    // Set the retrieved client information in the respective form fields
    editName.value = profile.name;
    editEmail.value = profile.email;
  });
};

// Invoke the getInfo function when the page loads
getInfo();

// Event listener for the form's submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = new URL(window.location);
  const idUrl = url.searchParams.get("id");

  // Get the updated client information from the form fields
  const editName = document.querySelector("[data-name]").value;
  const editEmail = document.querySelector("[data-email]").value;
  console.log(editName, "---", editEmail);

  // Call the updateClient function to update client information on the server
  clientServices.updateClient(editName, editEmail, idUrl).then(() => {
    // Redirect to the edition complete page after successful update
    window.location.href = "/screens/edition_complete.html";
  });
});
