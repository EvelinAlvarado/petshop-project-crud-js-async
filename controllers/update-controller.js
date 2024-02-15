import { clientServices } from "../service/client-service.js";

// Get reference to the form element in the HTML document
const form = document.querySelector("[data-form");

/*
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

  // clientServices.editClient(idUrl).then((profile) => console.log(profile));

  // Fetch client information based on the provided ID
  clientServices.editClient(idUrl).then((profile) => {
    // Set the retrieved client information in the respective form fields
    editName.value = profile.name;
    editEmail.value = profile.email;
  });
}; */

// Function to retrieve and display client information for editing
const getInfo = async () => {
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

  // Try to fetch client information based on the provided ID using the editClient service
  try {
    // Use async/await to wait for the editClient service to complete and get the profile data
    const profile = await clientServices.editClient(idUrl);
    // Check if the retrieved profile data contains both name and email
    if (profile.name && profile.email) {
      // If data is complete, set the form fields with the retrieved name and email
      editName.value = profile.name;
      editEmail.value = profile.email;
    } else {
      // If client information is incomplete, throw an error to trigger the catch block
      throw new Error();
    }
  } catch (error) {
    // Handle errors by logging the error message and redirecting to the error page
    console.log("Catch Error - ", error);
    window.location.href = "/screens/error.html";
  }
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
