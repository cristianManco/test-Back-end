<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
1. Clone the repository:

git clone https://github.com/cristianManco/test-Back-end
```

2. Install the dependencies:

```bash
cd your-repository
npm install
```

$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Torneos Van Rossum

Torneos Van Rossum is a platform dedicated to managing esports tournaments in Colombia. This repository contains the API for managing tournaments, players, and match results.

## Features

- Register, update, and query players
- Create, update, delete, and query tournaments
- Add participants to a tournament and query the tournament with its participants
- Randomly assign competition in a tournament among registered players
- Register the results of the competition with winner and loser data and the score obtained by each competitor
- Query player results per tournament with at least one score filter (>=), sorting by scores, and pagination

## Tech Stack

- Node.js
- NestJS
- TypeORM
- PostgreSQL or MySQL

## Getting Started


## Project Structure
```
src/
|-- global/
|   |--config.ts              # Configuration file for database and other settings
|   |--Guard/                 # guard configuration for sales
|
|-- player/
|   |-- entities/             # Author entity definition
|   |-- dto/                  # DTOs (Data Transfer Objects) for author operations
|   |-- controller/           # Controller for author operations
|   |-- module/               # Module for author-related functionalities
|   |--  service              # Service for author operations
|
|-- result/
|   |-- dto/                  # DTOs for book operations
|   |-- entities/             # Book entity definition
|   |-- controller/           # Controller for book operations
|   |-- module/               # Module for book-related functionalities
|   |-- service               # Service for book operations
|
|-- tournament/
|   |-- dto/                  # DTOs for sales operations
|   |-- entities/             # Sale entity definition
|   |-- controller/           # Controller for sales operations
|   |-- module/               # Module for sale-related functionalities
|   |--  service              # Service for sale operations
|
|-- app.module.ts             # Main application module
|-- main.ts                   # Application entry point
|-- ...                       # Other files and folders
```

## Contribution
To contribute to this project, follow these steps:
1. Fork this repository.
2. Create a new branch with the prefix `feature/`or  `feat/` followed by your feature name.
3. Make your changes and tests.
4. Make a pull request to the `develop` branch of this repository.



## License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

For any questions or issues, Cristian Manco at camilomanco2005@gmail.com Thank you for using our API!


3. Set up your database and add the connection details to a `.env` file in the root of your project:

```env
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=yourusername
DATABASE_PASSWORD=yourpassword
DATABASE_DB=yourdatabase
```

4. Run the migrations:

```bash
npm run migration:run
```

5. Start the application:

```bash
npm run start
```

The application will be running at `http://localhost:3000`.

## API Documentation

The API is documented using Swagger and is available at `http://localhost:3000/api`.

## Gitflow

We use Gitflow for branch management and versioning. Please ensure that your commits are descriptive and that your branches follow the Gitflow convention.



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Cristian Manco](https://github.com/cristianManco)


## License

Nest is [MIT licensed](LICENSE).
