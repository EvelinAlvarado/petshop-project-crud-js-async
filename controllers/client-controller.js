import { clientServices } from "../service/client-service.js";

console.log(clientServices);

// Function to create a new row in the table with profile data
const createNewRow = (name, email, id) => {
  // Create a new <tr> element (table row)
  const tableRow = document.createElement("tr");

  // HTML content of the row with name and email data
  const rowContent = `
    <td class="td" data-td>
      ${name}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/edit_client.html?id=${id}"
            class="simple-button simple-button--edit"
          >
            Edit
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id}">
            Delete
          </button>
        </li>
      </ul>
    </td>
  `;

  // Set the HTML content of the row
  tableRow.innerHTML = rowContent;

  // Select the delete button within the current table row
  const deleteBtn = tableRow.querySelector("button");
  // Add a click event listener to the delete button
  deleteBtn.addEventListener("click", async () => {
    // Retrieve the unique ID associated with the client from the button's id attribute
    const idClient = deleteBtn.id;
    console.log("Click: ", idClient);

    try {
      // Call the deleteClient service to remove the client on the server
      const response = await clientServices.deleteClient(idClient);
      console.log(response);

      // Check if the deletion was successful
      if (response.status === 200) {
        console.log("Client deleted successfully.");
        // Remove the row from the table after successful deletion
        tableRow.remove();
      } else {
        console.log("Client deletion failed.");
        // Handle the case where deletion was not successful
        throw new Error();
      }
    } catch (error) {
      alert("An error occurred: ", error);
    }
  });

  // Return the created row
  return tableRow;
};

// Get the reference to the table in the HTML document
const clientTable = document.querySelector("[data-table]");

// Function to fetch profiles from the server using async/await
const fetchProfiles = async () => {
  try {
    const profilesDataOfMyPromise = await clientServices.clientList();

    if (!profilesDataOfMyPromise || profilesDataOfMyPromise.length === 0) {
      throw new Error("No profiles found.");
    } else {
      // If the promise is fulfilled, iterate through profiles and add new rows to the table
      profilesDataOfMyPromise.forEach(({ name, email, id }) => {
        const newTableRow = createNewRow(name, email, id);
        clientTable.appendChild(newTableRow);
      });
    }
  } catch (error) {
    alert("An error occurred: " + error);
  }
};

// Call the fetchProfiles function
fetchProfiles();
