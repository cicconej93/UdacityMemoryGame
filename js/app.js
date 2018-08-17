/*
 * Create a list that holds all of your cards
 */
let cardList = document.querySelectorAll(".card");
let moveCount = document.querySelector(".moves");
//let timer = timer; 
let winScreen = document.querySelector(".winScreen");
let plyBtn = document.querySelector(".plyBtn");
//console.log(timer);
const restart = document.querySelector(".restart");

let openCardList = [];
let matchedCardList = [];
let count = 0;
let disableClick = false;




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
     winScreen.classList.remove("open");
     playAgain();
 });


 cardList.forEach(card => {
     card.addEventListener("click", function(e){
         //alert("You clicked a card");
         //let className = e.
         if(disableClick){
             return;
         }

         console.log(e.currentTarget.innerHTML);
         if (!(matchedCardList.includes(e.currentTarget) || openCardList.includes(e.currentTarget))){
           // addMove();
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
        gameWon();

    }

    disableClick = false;

    //clear the open card list for new selections
    openCardList.length = 0;
 };

 function addWrong(wrongCardOne, wrongCardTwo){
    wrongCardOne.classList.add("wrong");
    wrongCardTwo.classList.add("wrong");
 };

 function removeCards(noMatchCardOne, noMatchCardTwo){
     noMatchCardOne.classList.remove("open", "show", "wrong");
     noMatchCardTwo.classList.remove("open", "show", "wrong");
     openCardList.length = 0;

     disableClick = false;
 };

 function removeStar(){

    
 };

 function addMove(){
     count += 1;
     
     moveCount.innerText = count;
 };

 function gameWon(){
    //alert("YOU WIN!");
    winScreen.classList.add("open");

 };

 function playAgain(){
    matchedCardList.forEach(card => {
        card.classList.remove("match", "show");


    });

    matchedCardList.length = 0;
    openCardList.length = 0;
    count = 0;
    moveCount.innerText = count;
    shuffle(cardList);
 }