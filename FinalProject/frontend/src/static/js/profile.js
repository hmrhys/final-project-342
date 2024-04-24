import api from './APIClient.js';


const query = window.location.search;
let param = new URLSearchParams(query);
let id = param.get(`id`);

async function getReviews() {
    let reviewList = [];
    await api.getUserById(parseInt(id)).then(r => {
        console.log(r);
        let profPic = document.getElementById('prof-pic');
        let username = document.getElementById('user-name');

        profPic.src = r.avatar;
        username.innerHTML = r.username;
    })
    await api.getUserReviews(parseInt(id)).then(r => {
        console.log(r);
        reviewList = r;
    })

    console.log(reviewList);
    for (let i = 0; i < reviewList.length; i++) {
        let uid = String(reviewList[i].uid);
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

getReviews();