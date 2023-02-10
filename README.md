### Navigation of readme

- [Task completed](#tasks-completed)
- [How to setup](#how-to-setup)
- [Deployment and documentation](#deployment-and-documentation)
- [File structure](#file-structure)

### Tasks completed

The following features are worked on this repo

- Signup a user (signup)
- Create a post '/api/v1/posts'
- Update user profile
- Update a post
- Delete a post
- Get all user's posts
- Get all users
- Signin a user (login)

### How to setup

The project can be setup by cloning the repo with
`git clone <repo-url>`

then, installing dependencies
`npm install`

run migrations. edit the config in src/config with your db credentials
`npm run migration:run`

run seeders.
`npm run seed`

start development server
`npm run start:server`

### Deployment and documentation

The project is deployed live at https://ourpass-test.onrender.com/api/v1/users

I have also provided a postman documentation of the API here

https://documenter.getpostman.com/view/11384363/2s935snMhm#intro

### Alternate API Documentation

#### Users API

- GET api/v1/users

  Requires Authentication

- POST api/v1/users/signup

  Requires a user body of format

  Requires auth

```
{
  "firstName": string
  "lastName": string,
  "email": string,
  "password": string
}
```

- POST api/v1/users/signin

  Requires a request body of format

  Requires auth

```
{
  "email": string,
  "password": string
}

```

- PUT api/v1/users/

  Summary: Updates user profile

  Requires a request body of format

  Requires auth

```
{
  "firstName": string
  "lastName": string,
}

```

#### Posts API

- GET /api/v1/posts

  Summary: Get all of a users posts

  Requires auth

- POST /api/v1/posts
  Summary: Create a new post

  Requires auth

  Requires a request body of format:

  ```
  {
  "title": string,
  "body": string
  }
  ```

- DELETE /api/v1/posts/:postId

  Summary: Deletes new post

  Requires auth

- PUT /api/v1/posts/:postId

  Summary: Update existing post

  Requires auth

  Requires a request body of format:

  ```

  {
  "title": string,
  "body": string
  }

  ```

### File structure

This project tries to utilize the code architecture by uncle bob to attain a serparation of concerns, testablility and maintainability.

Some import structures of the project:

- src/user-cases: Business logic utilized by controller
- src/services: Services used in the use-cases, such as the database service which is the data lawyer
- src/controllers: API controllers
- src/core: Contains the earliest and most independent parts of the project such as the entities, dtos, abstractions and interfaces.
- tests/: Contains some feature and unit tests

```

```
