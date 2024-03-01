
let gameBox = document.querySelector(".game-box");

let player1 = document.querySelector("#player-1-id");
let player2 = document.querySelector("#player-2-id");

let duration = document.querySelector("#Duration");
let gameOverDiv = document.querySelector(".game-over-area");
let winner = document.querySelector("#winner");
let playAgain = document.querySelector("#play-again");



let timer = 0;
let intervalHolder;
const timerFunc = () => {

    intervalHolder = setInterval(() => {
        timer++;

        if (timer < 10) {

            duration.textContent = "0" + timer + "s";
        } else {
            duration.textContent = timer + "s";

        }

        if (timer >= 120) {
            gameOver();
            clearInterval(intervalHolder);
        }




    }, 1000)


    return timer;

}



let scoreNumPl1 = document.querySelector("#score-num-for-pl1");
let scoreNumPl2 = document.querySelector("#score-num-for-pl2");


const cardDetailsArr = [];

const fImgURLarr = [
    "https://cdn-icons-png.flaticon.com/128/2273/2273530.png",
    "https://cdn-icons-png.flaticon.com/128/2076/2076299.png",
    "https://cdn-icons-png.flaticon.com/128/5725/5725257.png",
    "https://cdn-icons-png.flaticon.com/128/13481/13481169.png",
    "https://cdn-icons-png.flaticon.com/128/2130/2130260.png",
    "https://cdn-icons-png.flaticon.com/128/10798/10798352.png",
    "https://cdn-icons-png.flaticon.com/128/3401/3401404.png",
    "https://cdn-icons-png.flaticon.com/128/731/731932.png",
    "https://cdn-icons-png.flaticon.com/128/3655/3655769.png",
    "https://cdn-icons-png.flaticon.com/128/9998/9998289.png",
    "https://cdn-icons-png.flaticon.com/128/10490/10490259.png",
    "https://cdn-icons-png.flaticon.com/128/5966/5966725.png",
    "https://cdn-icons-png.flaticon.com/128/2273/2273530.png",
    "https://cdn-icons-png.flaticon.com/128/2076/2076299.png",
    "https://cdn-icons-png.flaticon.com/128/5725/5725257.png",
    "https://cdn-icons-png.flaticon.com/128/13481/13481169.png",
    "https://cdn-icons-png.flaticon.com/128/2130/2130260.png",
    "https://cdn-icons-png.flaticon.com/128/10798/10798352.png",
    "https://cdn-icons-png.flaticon.com/128/3401/3401404.png",
    "https://cdn-icons-png.flaticon.com/128/731/731932.png",
    "https://cdn-icons-png.flaticon.com/128/3655/3655769.png",
    "https://cdn-icons-png.flaticon.com/128/9998/9998289.png",
    "https://cdn-icons-png.flaticon.com/128/10490/10490259.png",
    "https://cdn-icons-png.flaticon.com/128/5966/5966725.png"
]

const createCardIds = () => {

    timerFunc();

    for (let i = 0; i < 12; i++) {
        cardDetailsArr.push(
            {
                id: "card" + i,
                card_img: fImgURLarr[i]
            }
        );
    }

    for (let i = 0; i < 12; i++) {
        cardDetailsArr.push(
            {
                id: "card" + i,
                card_img: fImgURLarr[i]
            }
        );
    }

    return cardDetailsArr;
}


let onWrongMatch = new Audio("Sound_Effects/shooting-sound-fx-159024.mp3");
let onRightMatch = new Audio("Sound_Effects/ping-82822.mp3");
let onCardClick = new Audio("Sound_Effects/mouse-click-153941.mp3");
let onComplete = new Audio("Sound_Effects/cute-level-up-3-189853.mp3");

let scoreX = 0;
let scoreY = 0;



let cardBox;
let cardsIdNewArr = createCardIds();
const createCardFunc = () => {
    for (d of cardsIdNewArr) {

        cardBox = document.createElement("div");
        cardBox.classList.add("col-xl-1", "col-sm-2", "col-3", "py-2");
        cardBox.setAttribute("id", d.id);
        cardBox.innerHTML = `<button class="memo-card position-relative" >
    <div id="front-img">
        <img src='${d.card_img}' alt='404'>
    </div>
    <div id="back-img">
        <img src='https://cdn-icons-png.flaticon.com/128/7806/7806815.png' alt='404'>
    </div>
</button>`;


        cardBox.style.order = `${Math.floor(Math.random() * 25)}`;

        gameBox.appendChild(cardBox);

        cardBox.children[0].addEventListener("click", (e) => {
            onCardClick.play();
            playGame(e);
        })

    }
}

let getCardBoxId = [];
let cardButton = "";
let clicked = false;
const playGame = (elem) => {
    cardButton = elem.target.parentNode.parentNode;
    cardButton.style.transform = "rotateY(0deg)";

    getCardBoxId.push(
        cardButton.parentNode.id
    )

    console.log(getCardBoxId);

    if (clicked === false) {
        clicked = true;

    } else {
        // cardButton.style.transform = "rotateY(0deg)";

        setTimeout(() => {
            ifMatch(cardButton);
        }, 1000)

        clicked = false;
    }



}

let firstPlayer = true;
let winBackScore = 0;
player1.style.borderBottom = "2px solid red";

const ifMatch = () => {
    for (let i = 0; i < getCardBoxId.length; i++) {
        if (getCardBoxId[i] === getCardBoxId[i + 1]) {
            for (mD of cardButton.parentNode.parentNode.children) {
                if (mD.id === getCardBoxId[i] && mD.id === getCardBoxId[i + 1]) {
                    onRightMatch.play();
                    mD.children[i].style.transform = "rotateY(0deg)";
                    mD.children[i].disabled = true;
                    winBackScore++;
                    console.log("Matched");
                }
            }

            if (firstPlayer) {
                player1.style.borderBottom = "none";
                player2.style.borderBottom = "2px solid red";

                scoreX++;
                firstPlayer = false;
            } else {

                player2.style.borderBottom = "none";
                player1.style.borderBottom = "2px solid red";

                scoreY++;
                firstPlayer = true;
            }
            getCardBoxId = [];
        } else {
            cardButton.style.transform = "rotateY(180deg)";
            for (mD of cardButton.parentNode.parentNode.children) {
                if (mD.id === getCardBoxId[i]) {
                    onWrongMatch.play();
                    mD.children[i].style.transform = "rotateY(180deg)";

                    // cardButton.parentNode.children[i + 1].style.transform = "rotateY(180deg)";
                }
            }
            cardButton.disabled = false;

            if (firstPlayer) {
                player1.style.borderBottom = "none";
                player2.style.borderBottom = "2px solid red";

                firstPlayer = false;
            } else {
                player2.style.borderBottom = "none";
                player1.style.borderBottom = "2px solid red";

                firstPlayer = true;
            }

            getCardBoxId = [];
            console.log("Not Matched");
        }
    }


    scoreNumPl1.textContent = scoreX;
    scoreNumPl2.textContent = scoreY;

    if (winBackScore == 24) {
        gameOver();
        clearInterval(intervalHolder);
    }
}


const gameOver = () => {
    if (scoreX > scoreY) {
        onComplete.play();
        displayGameOver();
        winner.textContent = "Player 1 Win the match";
    } else if (scoreY > scoreX) {
        onComplete.play();
        displayGameOver();
        winner.textContent = "Player 2 Win the match";
    } else {
        onComplete.play();
        displayGameOver();
        winner.textContent = "Match Draw";

    }
}


const displayGameOver = () => {
    gameOverDiv.style.opacity = "1";
    gameOverDiv.style.visibility = "visible";
    gameOverDiv.style.zIndex = "9999";
}



playAgain.addEventListener("click", () => {
    // gameOverDiv.style.opacity = "0";
    // gameOverDiv.style.visibility = "hidden";
    // gameOverDiv.style.zIndex = "-1";

    // timer = 0;
    // scoreX = 0;
    // scoreY = 0;
    // winBackScore = 0;
    // scoreNumPl1.textContent = scoreX;
    // scoreNumPl2.textContent = scoreY;

    // timerFunc();

    // for (let i = 1; i < cardBox.parentNode.children.length; i++) {
    //     onRightMatch.play();
    //     gameBox.children[i].children[0].style.transform = "rotateY(180deg) !important";
    //     gameBox.children[i].children[0].disabled = false;
    // }

    // console.log(timer);
    // console.log(scoreX);
    // console.log(scoreY);
    // console.log(winBackScore);

    document.location.reload();

})



