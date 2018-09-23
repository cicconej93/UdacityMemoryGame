/*
 * Create a list that holds all of your cards
 */
let cardList = document.querySelectorAll(".card");
let moveCount = document.querySelector(".moves");
let winLoseScreen = document.querySelector(".winLoseScreen");
let plyBtn = document.querySelector(".plyBtn");
let timer = document.querySelector('.timer');
let gameLives = document.querySelector('.stars');
const restart = document.querySelector(".restart");
let gameTime = new gameTimer();

console.log(gameLives.children[0]);



let openCardList = [];
let matchedCardList = [];
let count = 0;
let disableClick = false;
let gameStarted = false;
let lifeCount = 0;




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;


    }




    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 restart.addEventListener("click", function(){

    cardList.forEach(card => {
        card.classList.remove("match", "show", "open");


    });

    matchedCardList.length = 0;
    openCardList.length = 0;
    count = 0;
    moveCount.innerText = count;
    cardList = shuffle(cardList);
 });

 plyBtn.addEventListener("click", function(){
     winLoseScreen.classList.remove("open");
     playAgain();
 });


 cardList.forEach(card => {
     card.addEventListener("click", function(e){
         if(disableClick){
             return;
         }
         if(!gameStarted){
             gameTime.startTimer();
             gameStarted = true;
         }

         console.log(e.currentTarget.innerHTML);
         if (!(matchedCardList.includes(e.currentTarget) || openCardList.includes(e.currentTarget))){
            displaySymbol(e.currentTarget);
            openListAdd(e.currentTarget);
            
         }
         else {
             return;
         }


     });
 });

/*  cardList.forEach(card => {
     card.addEventListener("animationEnd", function(){
         card.classList.toggle("show");
     });
 }); */

 function displaySymbol(clickedCard) {
     clickedCard.classList.toggle("show");
     clickedCard.classList.toggle("open");
     
 };

 function openListAdd(clickedCard) {

    if(!openCardList.includes(clickedCard)){
        openCardList.push(clickedCard);
    }

    
    if(openCardList.length > 1){
        addMove();
        if (openCardList[0].innerHTML == openCardList[1].innerHTML){
            addMatch(openCardList[0], openCardList[1]);
        }
        else {

            disableClick = true;
            setTimeout(function() {addWrong(openCardList[0], openCardList[1])}, 200);
            setTimeout(function() {removeCards(openCardList[0], openCardList[1])}, 900);
            
            

        }
    }
 };

 function addMatch(matchedCardOne, matchedCardTwo){
    matchedCardOne.classList.remove("open");
    matchedCardOne.classList.add("match");
    matchedCardTwo.classList.remove("open");
    matchedCardTwo.classList.add("match");

    //push the two matched cards to the list of matched cards
    matchedCardList.push(matchedCardOne, matchedCardTwo);

    //check if all cards are matched, if so display you win message.
    if(matchedCardList.length === cardList.length){
        gameTime.stopTimer();
        gameWon();

    }

    disableClick = false;

    //clear the open card list for new selections
    openCardList.length = 0;
 };

 function addWrong(wrongCardOne, wrongCardTwo){
    if (lifeCount < 3){
        removeStar();
        wrongCardOne.classList.add("wrong");
        wrongCardTwo.classList.add("wrong");
    }
    else{
        gameTime.stopTimer();
        gameLose();
    }

 };

 function removeCards(noMatchCardOne, noMatchCardTwo){
     noMatchCardOne.classList.remove("open", "show", "wrong");
     noMatchCardTwo.classList.remove("open", "show", "wrong");
     openCardList.length = 0;

     disableClick = false;
 };

 function removeStar(){
    gameLives.children[lifeCount].style.visibility = "hidden";
    lifeCount++;
    
 };

 function addMove(){
     count += 1;
     
     moveCount.innerText = count;
 };

 function gameWon(){
    let winNotify = document.querySelector(".winLoseNotification");
    let winningTime = document.querySelector(".winTime");
    winNotify.textContent = "You Win!";
    winningTime.textContent = "Your time to complete was " + timer.textContent;
    winLoseScreen.classList.add("open");
 };

 function gameLose(){
     let loseNotify = document.querySelector(".winLoseNotification");
     loseNotify.textContent = "Sorry, you lose this time!";
     winLoseScreen.classList.add("open");
 }

 function playAgain(){
    //gameLives.childNodes.style.visibility = "visible";
    for(let i = 0; i < 3; i++){
        gameLives.children[i].style.visibility = "visible";
    }
    lifeCount = 0;
    gameTime.resetTimer();
    gameStarted = false;
    matchedCardList.forEach(card => {
        card.classList.remove("match", "show");


    });

    matchedCardList.length = 0;
    openCardList.length = 0;
    count = 0;
    moveCount.innerText = count;
    shuffle(cardList);
 }



 //Game timer constructor
 function gameTimer() {
     this.seconds = 0,
     this.minutes = 0,
     this.hours = 0,
     this.t;

    // method that is called during each interval.
    //should add 1 to seconds each interval
     this.timeTick = function(){
         console.log(timer);
         this.seconds++;
         if(this.seconds >= 60) {
             this.seconds = 0;
             this.minutes++;
             if (this.minutes >= 60) {
                 this.minutes = 0;
                 this.hours++;
             }
         }
         timer.textContent = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
         this.startTimer();
     };

     //starts the timer and declares the time interval
     this.startTimer = function() {
        this.t = setTimeout(this.timeTick.bind(this), 1000);
     };;

    //clears timer and stops it
     this.stopTimer = function () {
         clearTimeout(this.t);
     };

     this.resetTimer = function () {
        timer.textContent = "00:00:00";
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
     };
 }