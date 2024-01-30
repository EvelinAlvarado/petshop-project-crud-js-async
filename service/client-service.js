// Function to create a new row in the table with profile data
const createNewRow = (name, email) => {
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
            href="../screens/edit_client.html"
            class="simple-button simple-button--edit"
          >
            Edit
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Delete
          </button>
        </li>
      </ul>
    </td>
  `;

  // Set the HTML content of the row
  tableRow.innerHTML = rowContent;

  // Return the created row
  return tableRow;
};

// Get the reference to the table in the HTML document
const clientTable = document.querySelector("[data-table]");

// CRUD: Create(POST), Read(GET), Update(PUT/PATCH) & Delete(DELETE)
// console.log("CLIENT-SERVICE");

// Function to fetch client profiles from the server
const clientList = () => {
  // Create a new Promise to handle asynchronous operations
  const myPromise = new Promise((resolve, reject) => {
    // Create an instance of XMLHttpRequest
    /* Create an XMLHttpRequest object, which is a browser feature that allows making HTTP requests from the client */
    const xhr = new XMLHttpRequest();

    // Open an HTTP connection with the GET method to the URL "http://localhost:3000/profile"
    // open(method, url)
    xhr.open("GET", "http://localhost:3000/profile");

    // Send the request to the server. Initiates communication with the server to retrieve profile information.
    xhr.send();

    // Set up an event handler that triggers when the request is successfully completed
    xhr.onload = () => {
      // When the request is complete, the code within this function is executed

      // Get the server response in JSON format
      const profilesDataResponse = JSON.parse(xhr.response);
      console.log(profilesDataResponse);

      // Check the status code of the response
      if (xhr.status >= 400) {
        // If the status code indicates an error, reject the promise with the response data
        reject(profilesDataResponse);
      } else {
        // If the status code is okay, resolve the promise with the response data
        resolve(profilesDataResponse);
      }
    };
  });

  // Return the promise for further chaining
  return myPromise;
};

// console.log(clientList());

// Call the clientList function to fetch profiles from the server
clientList()
  .then((profilesDataOfMyPromise) => {
    // If the promise is fulfilled, iterate through profiles and add new rows to the table
    profilesDataOfMyPromise.forEach((profile) => {
      const newTableRow = createNewRow(profile.name, profile.email);
      clientTable.appendChild(newTableRow);
    });
  })
  .catch((error) => alert("An error occurred: " + error));
