/*
 * Create a list that holds all of your cards
 */
var cards = [
              "fa-diamond","fa-diamond",
              "fa-paper-plane-o","fa-paper-plane-o",
              "fa-anchor","fa-anchor",
              "fa-bolt","fa-bolt",
              "fa-cube","fa-cube",
              "fa-leaf","fa-leaf",
              "fa-bicycle","fa-bicycle",
              "fa-bomb","fa-bomb"
            ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// }

$(function(){
  initGamePage();
  $('ul.deck').on('click', 'li', function () {
    $(this).addClass('open show');
  });
});

// more easy way for shuffle
function shuffle(array){
  copyArr = array.slice(); //复制数组，这样不会影响到原数组
  copyArr.sort(function(){
    return Math.random() > 0.5? 1:-1;
  });
  return copyArr;
}

//ready the initial page info 
function initGamePage(){
  var initArry = shuffle(cards);
  $('.card i').each(function () {
    $(this).parent().removeClass(); //这里这么做是帮助restart节省代码，不然要额外清除open show等class
    $(this).parent().addClass('card');
    $(this).removeClass();
    $(this).addClass('fa');
    $(this).addClass(initArry.pop());
  });
}

// restart the game
$('.restart').click(function () {
  initGamePage();  //这里只做到了重新初始化所有卡牌
});

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
