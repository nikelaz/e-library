## Acceptance Tests

### Story 1: As a  user, I want to see a “welcome page” when I visit the web application’s home

#### Tests 1 and 2: When users (anonymous and/or registered) visit the main URL (home page) of the app, they should see the welcome page. The welcome page should contain the following message “Welcome to my e-Library”

<welcome page screenshot>

### Story 2: As an anonymous user, I want to be able to register in the e-Library system

#### Test 1: Non-logged-in users should see a “Register” menu link on all pages, which leads them to the registration page

<nav registration link screenshot>

#### Test 2: The registration process requires the user’s email, password and phone number

<registration page opened showing the four fields (additional repeat password field) screenshot>

#### Test 3: The email should be a valid email address and not exist in the system (two registered users cannot have the same email)

<invalid email screenshot>
<duplicate email screenshot>

#### Test 4: Passwords should be at least 6 characters long and should contain both letters and numbers

<invalid password screenshot>

#### Test 5: Proper validation should be performed by the system, and detailed error messages displayed

<invalid phone number screenshot>
