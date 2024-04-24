import api from './APIClient.js';

const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

async function getGame() {
    let reviewList = [];
    await api.getGameById(parseInt(id)).then(r => {
        console.log(r);
        document.getElementById("game-name").innerHTML = r.game_name + " (" + r.year_released + ")"
        document.getElementById("game-cover").src = "../images/gamecovers/" + r.cover_art;
        document.getElementById("game-description").innerHTML = r.description;
    })
    await api.getGameReviews(id).then(r => {
        console.log(r);
        reviewList = r;
    })

    console.log(reviewList);
    for (let i = 0; i < reviewList.length; i++) {
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

getGame();

async function postReview() {
    let hoursInput = document.getElementById('hours-input');
    let scoreInput = document.getElementById('score-input');
    let contentInput = document.getElementById('post-text-area');

    let hours = parseInt(hoursInput.value);
    let score = parseInt(scoreInput.value);
    let content = contentInput.value;
    let currentDate = new Date().toISOString();
    let gid = parseInt(id);
    let uid;

    if (!scoreInput.value || scoreInput.value === "") {
        scoreInput.focus();
        return;
    }
    if (!hoursInput.value || hoursInput.value === "") {
        hoursInput.focus();
        return;
    }
    if (!contentInput.value || contentInput.value === "") {
        contentInput.focus();
        return;
    }

    if (score > 10) {
        score = 10;
    }

    console.log("hours: " + hours);
    console.log("score: " + score);
    console.log("content: " + content);
    console.log("date: " + currentDate);
    console.log("id: " + gid);

    await api.getCurrentUser().then(r => {
        console.log(r);
        uid = r.id;
    })

    console.log("uid: " + uid)

    api.createReview(gid, score, hours, currentDate, content, uid).then(res => {
        console.log(res);
        location.reload();
    }).catch(err => {
        console.log(err);
    });
}

document.getElementById("post-button").addEventListener("click", postReview);