import api from './APIClient.js';

//const recentReviews = document.querySelector('#game-reviews');

let reviewList = [];

async function getReviews() {
    await api.getReviews().then(r => {
        reviewList = r;
    });

    console.log(reviewList);
    for (let i = 0; i < reviewList.length || i < 3; i++) {
        let uid = String(reviewList[i].user_id);
        const entry = document.createElement('div');
        entry.classList.add("post");

        const profileLink = document.createElement('a');
        profileLink.classList.add("profile-link");
        profileLink.href = '/profile?id=' + uid;

        const postInfo = document.createElement('div');
        postInfo.classList.add("post-info");
        const postHeader = document.createElement('div');
        postInfo.classList.add("post-header");
        const opName = document.createElement('h5');
        opName.classList.add("op-name");
        const posttime = document.createElement('p');
        posttime.classList.add("post-time");
        const content = document.createElement('p');
        content.classList.add("post-content");
        const profilePic = document.createElement('img');
        profilePic.classList.add("post-profile-pic");
        profilePic.classList.add("rounded-circle");
        profilePic.classList.add("border");
        const hours = document.createElement('p');
        hours.classList.add("hours-played");
        const score = document.createElement('p');
        score.classList.add("post-score");

        await api.getUserById(uid).then(user => {
            opName.innerHTML = user.username;
            profilePic.src = user.avatar;
            console.log(user);
        })

        posttime.innerHTML = reviewList[i].date;
        content.innerHTML = reviewList[i].content;
        score.innerHTML = "Rating: " + reviewList[i].score + "/10";
        hours.innerHTML = "Hours Played: " + reviewList[i].hoursPlayed;

        profileLink.appendChild(profilePic);
        postHeader.appendChild(opName);
        postHeader.appendChild(posttime);
        profileLink.appendChild(postHeader);
        postInfo.appendChild(score);
        postInfo.appendChild(hours);

        entry.appendChild(profileLink);
        entry.appendChild(postInfo);
        entry.appendChild(content);

        document.getElementById("review-feed").appendChild(entry);
    }
}

async function loadGames() {
    let gameList = [];
    
    await api.getGames().then(r => {
        gameList = r;
    });

    console.log(gameList);
    for (let i = 0; i < gameList.length || i < 3; i++) {
        const entry = document.createElement('div');
        entry.classList.add("game");

        const gameLink = document.createElement('a');
        gameLink.classList.add("game-link");
        gameLink.href = '/game?id=' + gameList[i].game_id;

        const coverPic = document.createElement('img');
        coverPic.classList.add("game-cover-pic");
        coverPic.classList.add("border");

        const gameName = document.createElement('h4');
        gameName.classList.add("game-name");

        coverPic.src = "../images/gamecovers/" + gameList[i].cover_art;
        gameName.innerHTML = gameList[i].game_name + " (" + gameList[i].year_released + ")";
        
        gameLink.appendChild(coverPic);
        gameLink.appendChild(gameName);

        entry.appendChild(gameLink);

        document.getElementById("game-feed").appendChild(entry);
    }
    
}

getReviews();
loadGames();