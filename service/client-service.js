// CRUD: Create(POST), Read(GET), Update(PUT/PATCH) & Delete(DELETE)
// console.log("CLIENT-SERVICE");

// Create an instance of XMLHttpRequest
/* Create an XMLHttpRequest object, which is a browser feature that allows making HTTP requests from the client */
const http = new XMLHttpRequest();

// Open an HTTP connection with the GET method to the URL "http://localhost:3000/profile"
// open(method, url)
http.open("GET", "http://localhost:3000/profile");

// Send the request to the server. Initiates communication with the server to retrieve profile information.
http.send();

// Set up an event handler that triggers when the request is successfully completed
http.onload = () => {
  // When the request is complete, the code within this function is executed

  // Get the server response in text format (the response can be JSON or another format)
  const data = http.response;

  console.log(data);
};
