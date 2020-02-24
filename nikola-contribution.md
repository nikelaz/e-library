## Nikola's Contribution

This sprint my responsibility were two of the four user stories to be implemented. More specifically:

 - "As a  user, I want to see a “welcome page” when I visit the web application’s home"  
 - "As an anonymous user, I want to be able to register in the e-Library system"  

Because my stories were the first two, I had to create the general project structure. Our team decided to go with a MERN (MongoDB, Express, React, Node) stack and I created the project repo with an express server and a single-page react application as the view. We use Mongoose as an ORM to interact with the MongoDB database.

### Story 1: As a  user, I want to see a “welcome page” when I visit the web application’s home

The view itself is easy, containing only a single headline. What I had to do is create a new home route which renders the welcome message. In addition to that, as this was the first page, I created the shared header and navigation which will be used later. I used bootstrap for the UI components (navigation, forms, grid etc.)
As the react view is a single page application (SPA), it has only a single index.html file to be server on all routes and the routing is handled by react-router on the client. Because of this, I added a viewController module which catches all GET routes and returns the index.html. The other controllers have a more specific api/<controllerName> route and they override this catch-all controller.

`<viewController>`  

### Story 2: As an anonymous user, I want to be able to register in the e-Library system

The first part that had to be created was the user model. As we are using the mongoose ORM, this is straightforward. First of all the schema is defined as a JavaScript Object, where the data type and validation rules are defined.

`schema and validators`  

The validator functions in the model are the server-side validation, which in most cases should not be reached, because of the HTML5 client-side validation. Client-side validation, however, can always be bypassed by malicious users. Client-side validation is also valuable however, for user experience, because it works instantly and the user does not have to wait for a server response.

The next part of the registration is to create a POST endpoint of the users controller under the /api/users route, which would allow the react view layer to create a user using an AJAX HTTP request. The controller code deals primarily with routing the request body to the model and sending back the result.

`userController POST request`

The HTTP protocol is utilized for error handling, by sending a 500 (internal server error) status code and an error message to the client in case of a database, server or validation error. In the view this is handled elegantly using the JavaScript Fetch API:

`register fetch code error handling`
