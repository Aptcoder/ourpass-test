### Nav

- Task completed
- How to setup
- Deployment and documentation
- File structure

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

### File structure

This project tries to utilize the code architecture by uncle bob to attain a serparation of concerns, testablility and maintainability.

Some import structures of the project:

- src/user-cases: Business logic utilized by controller
- src/services: Services used in the use-cases, such as the database service which is the data lawyer
- src/controllers: API controllers
- src/core: Contains the earliest and most independent parts of the project such as the entities, dtos, abstractions and interfaces.
- tests/: Contains some feature and unit tests
