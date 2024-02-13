import { clientServices } from "../service/client-service.js";

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

getInfo();
