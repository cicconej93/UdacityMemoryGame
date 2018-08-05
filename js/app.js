/*
 * Create a list that holds all of your cards
 */
const cardList = document.querySelectorAll(".card");

let openCardList = [];
let count = 0;




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
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
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

 cardList.forEach(card => {
     card.addEventListener("click", function(e){
         //alert("You clicked a card");
         //let className = e.
         console.log(e.currentTarget.innerHTML);
         displaySymbol(e.currentTarget);
         openListAdd(e.currentTarget);
         addMove();
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
     //let cardClassName = clickedCard.
     //console.log(clickedCard.inner);
    if(!openCardList.includes(clickedCard)){
        openCardList.push(clickedCard);
    }
    //openCardList.push(clickedCard);
    
    if(openCardList.length > 1){
        if (openCardList[0].innerHTML == openCardList[1].innerHTML){
            addMatch(openCardList[0], openCardList[1]);
        }
        else {
           // alert("No match");
/*            openCardList[0].classList.add("wrong");
           openCardLIst[1].classList.add("wrong"); */
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
 };

 function addMove(){
     count += 1;
     let moveCount = document.querySelector(".moves");
     moveCount.innerText = count;
 }