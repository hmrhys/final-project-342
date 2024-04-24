# Gameshelf
## Group Q: FinalProject
> [FinalProject Description](https://github.ncsu.edu/engr-csc342/2024Spring-Course/blob/main/Project/FinalProject.md)

### Completed Components (what works)
- User can log into application. 
- User can access their profile
- User profile is configured to update dyanmically to show user details
- Home page displays games (game data)
- User can post a reviews for different games
- Reviews associated with different games will appear when that game is selected

### Incomplete Components (what doesn't work)
- Offline functionality is not implemented
- Getting user reviews returns an empty array
- Error creating account

### Navigation and Functionality
Pages | How to Navigate | Offline Functionality
:----:|:----------|:-----------
[Login](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/FinalProject/frontend/src/templates/login.html) | User fills in their credentials and clicks `Log In` (at the end of the form) to log in. If done correctly, the user will then be directed to the home page as a logged in user.    | -
[Create Account](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/FinalProject/frontend/src/templates/createaccount.html) | User fills in their credentials and clicks `Create Account` (at the end of the form) to create their account and login and authenticate into the applciation.    | -
[Home](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/FinalProject/frontend/src/templates/index.html) | User can either browse the top games posted on the home page anonymously, or click `Log In` at the top of the page to log in and continue as a user. Once clicking this button, the user will be directed to the `Login` page. The user can click in the search bar at the top of the screen to search for other games or users.    | -
[Profile](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/FinalProject/frontend/src/templates/profile.html) | Here, a user can see view their profile information (e.g. profile picture, username). They can also see the reviews that they have posted for games. They can click `Logout` to log out of their account and be redirected back to the `Home` page as an anonymous user, or `Home` to return to the home page while still logged in.  | -
[Game](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/FinalProject/frontend/src/templates/game.html) | This page shows information for a specfic game. That includes a picture of the game, the name and description of the game, and a list of posted reviews for that game. The user can click in the search bar at the top of the screen to search for other games or users. | -
[Game Library](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/FinalProject/frontend/src/templates/gamelibrary.html) | From this page, the user can either click `Log In` to navigate to the log in page to log in, the `Profile` page (if logged in) to view their profile, the `Logout` button (if they are logged in) to log out, or the search bar at the top of the screen to search for other games or users. Otherwise, this page shows a list of games that the user can view individualy. If a user clicks on a game posted in the game list, they will be redirected to the `Game` page for that specfic game. | -

### Caching Strategy
**Description**

Unfortunately we did not have time to implement offline functionality for our project. So we do not have any caching strategies to discuss for that aspect of our design and implementation process.

**Why we chose it**

As said above, there is no caching strategy for offline functionality.

### Data Storage

We use sql files to manage the storing and creating of User, Game, and Review data in our database. For instance, our *user.sql* file is responsible for creating user and "inserting" users into our user database table. With the required information (for *User*, it is `user_id`, `first_name`, `last_name`, `username`, `password`, `pwd_salt`, and `avatar`), columns for the respective data is created and stored in the User table for each user. Just like for *User*, the same mwthod is used for *Games* and *Reviews*, where the columns stored for *Games* are `game_id`, `game_name`, `year_released`, `description`, and `cover_art`, and those for *Reviews* are `review_id`, `user_id`, `game_id`, `score`, `hoursPlayed`, `content`, and `date`. We also have some mock data stored in respective JSON files for games, users, and reviews, in order to simulate an application that has already built up a community of active users. The game data, however, is also used to create an existing game library full of games that users can interact with and post their reviews for. 

### Authentication/Authorization Process
> What techniques are we using? What data is being stored where and how? How are we making sure users only access what they are allowed to?

We have a login page where the user can choose to log into an already existing account. The login page will ask for a username and password, and if the processed usernames and passwords, as provided by the user, are incorrect and do not match a user account already existing in the database, an error message will return and alert the user that they have provided the wrong credentials. The user will not be able to proceed from this point until they enter the correct credentials. The passwords, along with all other associated user information (e.g. name, username), are stored in the database and accessed through UserDAO. When logging in, UserDAO.getUserByCredentials() specifically is what is used to check the database to see if a user exists with the credentials requested by the user.

In order to accomplish secure account maintenance and password storing, we used password salts to hash and encode the saved passwords. This ensures a smooth and secure authentication process, making sure that each user only accesses the account pagse that they signed into. When a user signs in, they can view their profile and access information that is only authorized or pertaining to that user, such as their profile information, the games they've commented on, and their posts.

### API Endpoints
**Table**

Method | Route                 | Description
------ | --------------------- | ---------
`POST` | `/login`              | Receives an email and its password
`POST` | `/logout`              | Logs user out
`GET` | `/search/:query`           | Search for a game entered into search query (search bar)
`GET` | `/gamelist`           | Retrieves all games
`GET` | `/games/:guid`           | Retrieves a game by its Id
`GET`  | `/games/:guid/reviews`      | Get reviews for a specific game by game id
`POST`  | `/users`              | Creates a user
`GET`  | `/userlist`              | Retrieves all users 
`GET`  | `/users/current`              | Retrieves current user 
`GET`  | `/users/reviews`      | Get curernt user's reviews
`GET`  | `/users/:id`      | Retrieves a user by its id
`GET`  | `/users/:id/reviews`      | get reviews from a specific user by uesr id
`POST`  | `/reviews`      | create new review
`GET`  | `/reviewlist`      | Gets all game reviews
`GET`  | `/reviews/:ruid`      | Get a review by the review's id

**Changelog**

- Changed mapping name for getting all users from *GET /users* to *GET /userlist*
- Added all new endpoints

### ER Diagram of Database Schema
**Diagram** 

![erdiagram](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupQ/blob/main/Milestone2/erdiagram.drawio.png?raw=true)

**Changelog**

No changes.

### Detailed Individual Contributions
This will be a detailed list of each team member's contribution for each milestone of this project.

#### Overall Detailed Individual Review
<ins>Zemirah Bridges (zbridge)</ins>

- Handled majority of tokenmiddleware
- Worked on and finished implementation for login
- Handled a lot of backend with users and reviews
- Handled game and user database

<ins>Chris Lee (cdlee3)</ins>

- Handled majority styling for frontend
- Handled all art creation (user profiles, game covers)
- Handled a lot of backend, setting up routes and data for games and review
- Handled game and review database

<ins>Hanna Reese (hmreese2)</ins>

- Handled majority of documentation and setting the repos up for each new milestone.
- Worked implementation for login and user creation
- Handled user database

#### Proposal

Chris and Zee came up with the project idea, *Gameshelf*, where you can interact with games like users can with movies in *Letterboxd*. Hanna set up the repository and wrote out the Problem Statement section and worked some on the Features section. Zee worked on the features section as well. Chris created the wireframes. We all figured out work distribution. 

#### Milestone 1

Hanna set up the repository for Milestone 1, adding all necessary files. Zee and Hanna worked on the documentation (written sections, filling out contributions, setting up API table). Chris created data for Review and Zee created data for User and Game. Zee created the client APIs for the frontend, and Chris worked on the API routes in the backend. Hanna worked on frontend, creating the HTML pages and styling them.

#### Milestone 2

Hanna set up the repository for this milestone and worked on the documentation (creating API endpoint table and ER diagram). Zee and Hanna both worked on the other written components of the README for this milestone, such as Completed components, Incomplete Components, and Authentication processes. Hanna created the SQL file for users and Zee created the SQL files for games and reviews. Chris added more to the frontend styling and started working on implementing user profiles and the home page. Zee added middleware for login authentication and updated all related api routes and files to account for the changes. Hanna started implementation on login, and Chris started implementation on game and review, and also added logic for login.

#### Final Project

Hanna set up the repository for this milestone and did the documentation (contributions, written fields, navigation table, endpoint table). Chris added art for user profiles and game covers, and implemented review posting for users. Zee finished implementation for login and fixed implementation for user creation in the database, as well as fixed password salting for user creation. Hanna implemented the frontend and backend aspects for the create user account functionality, and updated all related api endpoints for this functionality, as well as added a duplicate username check in user creation validation. Zee fixed an issue relating to game display in the home page, and Chris implemented the profile functionality for logged in users. Chris also implemented the search bar functionality for finding games and users.

### Team Member Contributions

#### Zemirah Bridges (zbridge)

* Finished up tokenMiddleware
* Implemented password salting for user creation, added generation for user avatars
* Fixed login functionality, fixed homepage content load issue (games)
* Updated user creation in database

#### Chris Lee (cdlee3)

* created cover art, frontend styling, set up game data
* implemented search functionality for games, users
* implemented posting review functionality
* implemented profile functionality for users

#### Hanna Reese (hmreese2)

* Initial skeleton, documentation
* Implemented Create Account functionality
* Implemented check for creating username with duplicate username
* updated all associated routes in backend

#### Project Effort Contribution

Milestone   | Zemirah Bridges | Chris Lee | Hanna Reese
----------- | ------------- | ------------- | --------------
Milestone 1 | 33%            | 33%            | 34%
Milestone 2 | 34%            | 34%            | 32%
Final       | 34%            | 34%            | 32%
----------- | ------------- | ------------- | --------------
TOTAL:      | (33+34+34)%      | (33+34+34)%      | (34+32+32)%
