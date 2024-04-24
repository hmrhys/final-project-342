import api from './APIClient.js';

//const recentReviews = document.querySelector('#game-reviews');

let reviewList = [];

async function getReviews() {
    await api.getGameReviews().then(r => {
        reviewList = r;
    });

    console.log(reviewList);
    for (let i = 0; i < reviewList.length || i < 3; i++) {
        let uid = String(reviewList[i].uid);
        const entry = document.createElement('div');
        entry.classList.add("post");

        const profileLink = document.createElement('a');
        profileLink.classList.add("profile-link");
        profileLink.href = '/users?id=' + uid;

        const postInfo = document.createElement('div');
        postInfo.classList.add("post-info");
        const opName = document.createElement('h5');
        opName.classList.add("op-name");
        const posttime = document.createElement('p');
        posttime.classList.add("post-time");
        const content = document.createElement('p');
        content.classList.add("post-content");
        const profilePic = document.createElement('img');
        profilePic.classList.add("post-profile-pic");
        profilePic.classList.add("border");
        const hours = document.createElement('p');
        content.classList.add("hours-played");
        const score = document.createElement('p');
        content.classList.add("post-score");

        await api.getUserById(uid).then(user => {
            opName.innerHTML = user.handle;
            profilePic.src = user.avatar;
        })

        posttime.innerHTML = reviewList[i].datetime;
        content.innerHTML = reviewList[i].content;
        score.innerHTML = reviewList[i].score;
        hours.innerHTML = reviewList[i].hours_played;

        postInfo.appendChild(profilePic);
        postInfo.appendChild(opName);
        postInfo.appendChild(posttime);
        postInfo.appendChild(score);
        postInfo.appendChild(hours);

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
        gameLink.href = '/games?id=' + gameList[i].id;

        const coverPic = document.createElement('img');
        coverPic.classList.add("game-cover-pic");
        coverPic.classList.add("border");

        const gameName = document.createElement('h4');
        gameName.classList.add("game-name");

        coverPic.src = "../images/gamecovers/" + gameList[i].cover_image;
        gameName.innerHTML = gameList[i].title + " (" + gameList[i].year + ")";
        
        gameLink.appendChild(coverPic);
        gameLink.appendChild(gameName);

        entry.appendChild(gameLink);

        document.getElementById("game-feed").appendChild(entry);
    }
    
}

getReviews();
loadGames();