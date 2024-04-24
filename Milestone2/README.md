# Gameshelf
## Group Q: Milestone 2
> [Milestone 2 Description](https://github.ncsu.edu/engr-csc342/2024Spring-Course/blob/main/Project/Milestone2.md)

### Completed Components
For Milestone 2 we began adding more data (user, game, review data) to our pages, adding user login authentication and token middleware, and began connecting the frontend to the backend since we added changes with the addition of the database. We also made significant improvements to the frontend visuals. 

### In Progress
For the remainder of the project we will plan on completing the frontend visuals, finalizing the connection between frontend and backend, and working on data return.

Pages | Status | Wireframe
:----:|:------:|:---------:
Login | 80%    | [Login WF](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/Proposal/Wireframes/Log%20In.png)
Home  | 80%    | [Search WF in Home](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/Proposal/Wireframes/Search.png)
Profile | 80%  |
Game | 80% | [Game Rating WF](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/Proposal/Wireframes/Leave%20Review.png)

### Authentication/Authorization Process
> Questions to answer: Where and how are you storing data? How are you doing authentication? How are you making sure users only access what they are allowed to?
  
We are using a database to store data for users, games, and reviews. Token Middleware is being used to authenticate user login when the user makes the login request with their credentials.

### API Endpoints

Method | Route                 | Description
------ | --------------------- | ---------
`POST` | `/login`              | Receives an email and its password
`POST` | `/logout`              | Logs user out
`GET` | `/gamelist`           | Retrieves all games
`GET` | `/games/:gameId`           | Retrieves a game by its Id
`GET`  | `/users`              | Retrieves users 
`GET`  | `/users/current`              | Retrieves current active user 
`GET`  | `/users/:userId`      | Retrieves a user by its Id
`GET`  | `/users/:userId/reviews`      | Retrieves a post from a specific user by user Id
`GET`  | `/search/:gameTitle`      | Retrieves a game by the game's title (for search bar)
`GET`  | `/reviewlist`      | Gets all game reviews


### ER Diagram of Database Schema
![erdiagram](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/Milestone2/erdiagram.drawio.png?raw=true)

### Team Member Contributions

#### Zemirah Bridges (zbridge)

* SQL files for Game and Review
* Updated api folder with middleware, model classes, data access objects, and changes to api routes

#### Chris Lee (cdlee3)

* Updated frontend visuals
* Added logic in js files for home, profile, login, game

#### Hanna Reese (hmreese2)

* Skeleton for Milestone2, documentation, ER diagram
* js for login, small modifications to some css/html
* making sql file for user

#### Milestone Effort Contribution

Zemirah Bridges | Chris Lee | Hanna Reese
------------- | ------------- | --------------
X%            | Y%            | Z%
