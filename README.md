<div align="center">

  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>Streaming App</h1>

<!-- About the Project -->

<br />

## :star2: About the Project

<!-- Screenshots -->

<!-- ### :camera: Screenshots -->

<!-- <div align="center">
  <img src="screenshots/1.jpg" alt="screenshot" />
  <img src="screenshots/2.png" alt="screenshot" />
  <img src="screenshots/3.png" alt="screenshot" />
  <img src="screenshots/4.png" alt="screenshot" />
  <img src="screenshots/5.png" alt="screenshot" />
</div> -->

<!-- TechStack -->

### :space_invader: Tech Stack

<!-- <details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
  </ul>
</details> -->

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">PostgreSQL</a></li>
  </ul>
</details>
<br/>
### :fire: Features

<ul>

<li> CRUD operations on users </li>
<li> CRUD operations on movies </li>
<li> Rating movies </li>
<li> Uploading a custom poster for a movie and performing auto resize on the input image </li>
<li> Displaying most popular movies </li>

</ul>

<br />

<!-- Getting Started -->

## :package: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses npm as package manager

You have to install NodeJs on your pc in order to run this code

<!-- Run Locally -->

### :running: Run Locally

Go to the project directory

```bash
  cd project-name
```

Install dependencies for client

```bash
  cd client
  npm install
```

Install dependencies for server

```bash
  cd server
  npm install
```

Start app

```bash
  npm start
```

Run tests on dev environment

```bash
  npm run test
```

<br />

#### **Setup database in PSQL terminal (WSL2 or VS code terminal)**

Create user

```bash
CREATE USER <username> WITH PASSWORD <password>;
```

Create dev database

```bash
CREATE DATABASE streaming_db;
```

Create testing database

```bash
CREATE DATABASE streaming_db_test;
```

Run database migrations

```bash
db-migrate --env <test | dev> up
```

Reset database migrations

```bash
db-migrate reset -e <test | dev>
```

Grant all privileges to user on both databases

```bash
GRANT ALL PRIVILEGES ON DATABASE streaming_db TO dev_admin;
GRANT ALL PRIVILEGES ON DATABASE streaming_db_test TO dev_admin;
```

Run database migrations

```bash
psql -u <username> -p <port> -D streaming_db
```

<br />

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

<!-- Usage -->

## :eyes: Usage

This streaming app API allows for performing CRUD operations on movies/users/movie ratings
<br />
<br /><br />

<!-- Usage -->

## :twisted_rightwards_arrows: Endpoints

<br />

#### **The base url should be "localhost:(port-number)" **

<br />
#### **Users Route**

**GET** /api/users to get all users (token required)
<br /> <br />
**GET** /api/users/profile to get the current user profile (token required)
<br /> <br />
**POST** /api/users to create a new user (check data shapes for request body info)
<br /> <br />
**DELETE** /api/users to delete the current user (token required)
<br /> <br />
**PATCH** /api/users to update the current user (token required) (check data shapes for request body info)
<br /> <br />
**POST** /api/users/auth to login a user by entering username and password
<br /> <br />
**POST** /api/users/movies to add a movie to users list of movies (token required) (check data shapes for request body info)
<br />
<br />

#### **Movies Route**

### `Important Note`

> In movies route, In order to create or update a movie, you have to attach a poster image to create or update a movie.
> You can do so in Postman and similar tools by entering form-data and choosing a file to attach for the "image" key instead of entering raw text or raw JSON.

<br /> **GET** /api/movies?page=(page-number)&limit=(movie-count-in-page) to get all movies (uses pagination)
<br /> <br /> **GET** /api/movies/:id to get a specific movie using the id
<br /> <br /> **POST** /api/movies to create a new movie (check data shapes for request body info)
<br /> <br /> **DELETE** /api/movies/:id to delete the movie with the specified id
<br /><br />

#### **Ratings Route**

<br /> **GET** /api/ratings/movies/:id to get ratings of a the specified movie id
<br /><br /> **POST** /api/ratings to create a rating (check data shapes for request body info)
<br />
<br />

## :card_index: Data Shapes

<br />
    
##### **All data shapes have an auto-generated id which we don't need to provide unless it's required in the url parameters. However, in all cases we don't need it in a request body.**

<br />

#### **User**

    id: number (auto-generated)
    email: string
    password: string
    created_at: date (auto-generated)
    updated_at: date (auto-generated)

#### **Movie**

    id: number (auto-generated)
    name: string
    poster_image: string (poster_image is a string, however, you should enter it with a key called "image" as a 	file and not a string)
    rating: number
    created_at: date (auto-generated)
    updated_at: date (auto-generated)
    count: number (auto-generated)
    full_count: number (auto-generated)

#### **Rating**

    id: number (auto-generated)
    user_id: number
    movie_id: number
    rating: number,
    comment: string
