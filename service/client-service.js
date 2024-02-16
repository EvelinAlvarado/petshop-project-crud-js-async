// CRUD: Create(POST), Read(GET), Update(PUT/PATCH) & Delete(DELETE)
// console.log("CLIENT-SERVICE");

/* ------------------------------ */
//!PROMISE

// Function to fetch client profiles from the server
// const clientList = () => {
//   // Create a new Promise to handle asynchronous operations
//   const myPromise = new Promise((resolve, reject) => {
//     // Create an instance of XMLHttpRequest
//     /* Create an XMLHttpRequest object, which is a browser feature that allows making HTTP requests from the client */
//     const xhr = new XMLHttpRequest();

//     // Open an HTTP connection with the GET method to the URL "http://localhost:3000/profile"
//     // open(method, url)
//     xhr.open("GET", "http://localhost:3000/profile");

//     // Send the request to the server. Initiates communication with the server to retrieve profile information.
//     xhr.send();

//     // Set up an event handler that triggers when the request is successfully completed
//     xhr.onload = () => {
//       // When the request is complete, the code within this function is executed

//       // Get the server response in JSON format
//       const profilesDataResponse = JSON.parse(xhr.response);
//       console.log(profilesDataResponse);

//       // Check the status code of the response
//       if (xhr.status >= 400) {
//         // If the status code indicates an error, reject the promise with the response data
//         reject(profilesDataResponse);
//       } else {
//         // If the status code is okay, resolve the promise with the response data
//         resolve(profilesDataResponse);
//       }
//     };
//   });

//   // Return the promise for further chaining
//   return myPromise;
// };

/* ------------------------------ */

//!FETCH API
// Note: Fetch API is used for making HTTP requests. The fetch() function returns a Promise
// that resolves to the Response object representing the completion or failure of the request.
// It simplifies the process of handling asynchronous operations compared to using a raw Promise
// or XMLHttpRequest, offering a more modern and concise interface for fetching resources.

// Function to fetch client profiles from the server using Fetch API
// Use the Fetch API to make a GET request to the server
/* const clientList = () =>
  fetch("http://localhost:3000/profile").then((response) => {
    // The response.json() method returns a promise that resolves to the parsed JSON data
    return response.json();
  }); */

// Function to fetch profiles from the server using async/await
const clientList = async () => {
  try {
    const response = await fetch("http://localhost:3000/profile");
    return response.json();
  } catch (error) {
    throw new Error("Error fetching profiles: ", error.message);
  }
};

// console.log(clientList());

// Function to register a new client on the server using Fetch API
/* const registerNewClient = (name, email) => {
  return fetch("http://localhost:3000/profile", {
    method: "POST", // Specify the HTTP method as POST
    headers: {
      "Content-Type": "application/json", // Set the content type of the request body
    },
    body: JSON.stringify({ name, email, id: uuid.v4() }), // Convert data to JSON format
  });
}; */

// Function to register a new client on the server using async/await
const registerNewClient = async (name, email) => {
  try {
    const response = await fetch("http://localhost:3000/profile", {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json", // Set the content type of the request body
      },
      body: JSON.stringify({ name, email, id: uuid.v4() }), // Convert data to JSON format
    });
    return response;
  } catch (error) {
    throw new Error("Error registering new client: ", error.message);
  }
};

// Function to delete a client from the server using Fetch API
/* const deleteClient = (id) => {
  console.log("Delete to:", id);
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: "DELETE",
  });
}; */

// Function to delete a client from the server using async/await
const deleteClient = async (id) => {
  try {
    console.log("Delete to: ", id);
    const response = await fetch(`http://localhost:3000/profile/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw new Error("Error deleting client: ", error.message);
  }
};

// Function to fetch client information for editing from the server using Fetch API
/* const editClient = (id) => {
  // Use the Fetch API to make a GET request to retrieve client data based on the provided ID
  return fetch(`http://localhost:3000/profile/${id}`).then(
    (response) => response.json() // Parse the JSON data from the response
  );
}; */

// Function to fetch client information for editing from the server using async/await
const editClient = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/profile/${id}`);
    return response.json();
  } catch (error) {
    throw new Error(
      "Error fetching client information for editing: ",
      error.message
    );
  }
};

// Function to update client information on the server using Fetch API
/* const updateClient = (name, email, id) => {
  // Use the Fetch API to make a PUT request to update client data based on the provided ID
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: "PUT", // Specify the HTTP method as PUT
    headers: {
      "Content-Type": "application/json", // Set the content type of the request body
    },
    body: JSON.stringify({ name, email }), // Convert data to JSON format
  })
    .then((response) => response)
    .catch((err) => console.log(err));
}; */

const updateClient = async (name, email, id) => {
  try {
    const response = await fetch(`http://localhost:3000/profile/${id}`, {
      method: "PUT", // Specify the HTTP method as PUT
      headers: {
        "Content-Type": "application/json", // Set the content type of the request body
      },
      body: JSON.stringify({ name, email }), // Convert data to JSON format
    });
    return response;
  } catch (error) {
    throw new Error("Error updating client information:", error, massage);
  }
};

// Exported object containing client-related services
export const clientServices = {
  clientList: clientList, // Expose the clientList function
  registerNewClient, // Shorthand for registerNewClient: registerNewClient
  deleteClient, // Expose the deleteClient function
  editClient, // Expose the editClient function
  updateClient, // Expose the updateClient function
};
