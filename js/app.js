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
var steps = 0;
$(function(){
  initGamePage();
  foo();
});
var nosame = [];
function foo(){
  $('li.card').click(function () { 
    nosame.push($("ul li").index(this));
    $(this).addClass('open show');
    cards.unshift($(this).children().attr('class'));
    if(nosame.length == 2){
      if (nosame[0] == nosame[1]) {
        nosame.pop();
        cards.pop();
      } else {
        steps++;
        $('span.moves').text(steps);
        nosame.splice(0, 2);
        console.log(cards);
        if (cards.length % 2 == 0) {
          checkMatch(cards);
          console.log("我去判断一下");
        } 
      }
    }
  });
}

// 定义匹配函数
function checkMatch(checkArry){
  var class1 = checkArry[0];
  var class2 = checkArry[1];
  var SelectClass1 = '.' + class1.slice(3); //用于之后方便搜索
  var SelectClass2 = '.' + class2.slice(3);
  if (class1 == class2){
    $(SelectClass1).each(function(){
      $(this).parent().toggleClass('match animated rubberBand');
      $(this).parent().unbind();
    });
  }else{
    $('.open').find(SelectClass1).parent().addClass('animated shake nomatch');
    $('.open').find(SelectClass2).parent().addClass('animated shake nomatch');
    setTimeout(function(){
      $('.open').find(SelectClass1).parent().removeClass('animated nomatch shake open show');
      $('.open').find(SelectClass2).parent().removeClass('animated nomatch shake open show');
    },1000);
    checkArry.splice(0,2);
  }
  if (checkArry.length == 16) {
    setTimeout(function () {
      $('#win').toggleClass('hidden animated shake');
    }, 1000);
  }
}

// more easy way for shuffle
function shuffle(array){
  array.sort(function(){
    return Math.random() > 0.5? 1:-1;
  });
  return array;
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
  window.location.reload();
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
