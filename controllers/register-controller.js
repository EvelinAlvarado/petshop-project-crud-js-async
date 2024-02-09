import { clientServices } from "../service/client-service.js";

// Get a reference to the new client form in the HTML document
const formNewClient = document.querySelector("[data-form]");

// Event listener for the form submission
formNewClient.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameNewClient = document.querySelector("[data-name]").value;
  const emailNewClient = document.querySelector("[data-email]").value;
  console.log(nameNewClient, emailNewClient);

  // Use clientServices to register a new client on the server
  clientServices
    .registerNewClient(nameNewClient, emailNewClient)
    .then(() => {
      // console.log(response);
      // If the registration is successful, redirect to the registration completion page
      window.location.href = "/screens/register_complete.html";
    })
    .catch((error) => console.log(error));
});
