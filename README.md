# To-Do-List-Application

This application allows users to manage their tasks with user authentication functionality. Below are instructions on how to use the application and a brief explanation of the code structure and key decisions made.

## Getting Started

### Prerequisites

* Node.js installed (https://nodejs.org/)
* MongoDB installed and running locally (https://docs.mongodb.com/manual/installation/)

### Installation

1. Clone the repository:

```
git clone git@github.com:JustVraj04/To-Do-List-Application.git
```

2. Navigate to the project directory:
```
cd To-Do-List-Application.git
```

3. Install dependencies:

```
npm install
```

4.Create a .env file in the root directory and set the following environment variables:
```
PORT=4444
MONGODB_URI=mongodb://localhost:27017/todo_list
JWT_SECRET=your_secret_key
```
Replace "your_secret_key" with a secure random string for JWT token signing.

5. Start the application:
```
npm start
```
Open your browser and visit http://localhost:4444 to access the To-Do List application.

## Usage

### Register a User

* Endpoint: POST /users/register
* Request Body: JSON with username and password
* Example:
  ```
  {
    "username": "john_doe",
    "password": "secure_password"
  }
  ```

### Login

* Endpoint: POST /users/login
* Request Body: JSON with username and password
* Example:
  ```
  {
    "username": "john_doe",
    "password": "secure_password"
  }
  ```
* It sets a userId as cookie in the form of jwt token

### Logout
* Endpoint: POST /users/login
* Request Body: Empty
* Removes cookie containing the token

### Create, View, Update, and Delete Tasks
* All task-related endpoints are protected and require the JWT token obtained during login for authentication.
* Include the JWT token in the cookie of your requests:
* Create a Task
  * Endpoint: POST /tasks
  * Request Body: JSON with title and optional description
  * Example:
    ```
    {
      "title": "Complete Project",
      "description": "Finish the coding assignment."
    } 
    ```
* Get All Tasks
  * Endpoint: GET /tasks
* Mark Task as Completed
  * Endpoint: PATCH /tasks/:id/complete
  * Example: PATCH /tasks/12345/complete
* Edit Task Details
  * Endpoint: PUT /tasks/:id
  * Request Body: JSON with title and optional description
  * Example:
    ```
    {
      "title": "Updated Task Title",
      "description": "Updated task description."
    }
    ```
* Delete a Task
  * Endpoint: DELETE /tasks/:id
  * Example: DELETE /tasks/12345
