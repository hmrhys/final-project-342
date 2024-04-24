import api from './APIClient.js';


const query = window.location.search;
let param = new URLSearchParams(query);
let userId = param.get(`id`);

async function getReviews() {
    await api.getUserReviews(id).then(r => {
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

getReviews();