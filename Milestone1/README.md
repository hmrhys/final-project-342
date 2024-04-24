# Gameshelf
## Group Q: Milestone 1
> [Milestone 1 Description](https://github.ncsu.edu/engr-csc342/2024Spring-Course/tree/main/Project)

### Completed Componenets
For Milestone 1 we created skeletons for our webpages, and made sure the API routes and client were working. We also created jsons with user, game, and review data and we will be using these until we have a database. These jsons will most likely grow as we begin Milestone 2.

### In Progress
Now that the routes and client are working, we are currently added static files to populate our pages below. We have skeletons for our game and profile pages and we are currently working on populating these files with the data from our jsons.

Pages | Status | Wireframe
:----:|:------:|:---------:
Login | 50%    |
Home  | 50%    |
Profile | 50%  |
Game | 50% |

### Api endpoints

Method | Route                 | Description
------ | --------------------- | ---------
`POST` | `/login`              | Receives an email and its password
`GET` | `/game`           | Retrieves games
`GET` | `/game/:gameId`           | Retrieves a game by its Id
`GET`  | `/users`              | Retrieves users 
`GET`  | `/users/:userId`      | Retrieves a user by its Id

### Team Member Contributions

#### Zemirah Bridges (zbridge)

* Created game and user data
* Added client in frontend

#### Chris Lee (cdlee3)

* API routes
* Created review data

#### Hanna Reese (hmreese2)

* Created skeletons for Milestone 1
* Created html and css pages for home and login pages

#### Milestone Effort Contribution

Zemirah Bridges | Chris Lee | Hanna Reese
------------- | ------------- | -------------
33%           | 33%           | 34%
