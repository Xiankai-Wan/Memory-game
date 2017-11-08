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
var steps = 0;
var nosame = [];
var onestar = 14;
var twostar = 22;
var threestar = 33;
$(function(){
  initGamePage();
  $('li.card').click(function () {
    nosame.push($("ul li").index(this));
    $(this).addClass('open show');
    cards.unshift($(this).children().attr('class'));
    if (nosame.length == 2) {
      // 防止两次点击的是同一个卡牌
      if (nosame[0] == nosame[1]) {
        nosame.pop();
        cards.pop();
      } else {
        steps++;
        $('span.moves').text(steps);
        nosame.splice(0, 2);
        // 进行匹配判断
        if (cards.length % 2 == 0) {
          checkMatch(cards);
        }
        // remove the start
       switch(steps){
         case onestar:
           $('ul.stars').find('i').eq(0).addClass('animated bounceOutUp');
           break;
         case twostar:
           $('ul.stars').find('i').eq(1).addClass('animated bounceOutUp');
           break;
         case threestar:
           $('ul.stars').find('i').eq(2).addClass('animated bounceOutUp');
           break;
       }
    }
    }
  });
});

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
    isWin();
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
    // $(this).parent().removeClass(); //这里这么做是帮助restart节省代码，不然要额外清除open show等class
    // $(this).parent().addClass('card');
    // $(this).removeClass();
    // $(this).addClass('fa');
    $(this).addClass(initArry.pop());
  });
}
// initial time function
var time = 0;
function clock() {
  $('body').everyTime('1s', 'A', function () {
    time++;
    $("span.second").text(time);
  });
}
function stopclock() {
  $('body').stopTime('A');
}
$('ul.deck').one('click', function () {
  clock();
});

// isWin function
function isWin(){
  stopclock();
  setTimeout(function () {
    $('#win').toggleClass('hidden animated bounceInDown');
  }, 700);
  $('#win h1').append('<p class="insert"> With ' + steps + ' moves and ' + time + ' seconds </p>');
  if (steps < onestar) {
    setTimeout(function () {
      $('ul.winShow').find('i').each(function () {
        $(this).toggleClass('hidden animated bounceInDown');
      });
    }, 1500);
    console.log("打印三颗星，步数是" + steps);
  } else if (onestar <= steps && steps < twostar) {
    setTimeout(function () {
      $('ul.winShow').find('i').eq(0).toggleClass('hidden animated bounceInDown');
      $('ul.winShow').find('i').eq(1).toggleClass('hidden animated bounceInDown');
    }, 1500);
  } else if (twostar <= steps && steps < threestar) {
    setTimeout(function () {
      $('ul.winShow').find('i').eq(0).toggleClass('hidden animated bounceInDown');
    }, 1500);
  }
}

// restart the game
$('.restart').click(function () {
  window.location.reload();
});
// play again function
$('#winAgain').click(function () {
  $('#win').toggleClass('bounceInDown bounceOutUp');
  setTimeout(function(){
    $('#win').toggleClass('hidden');
    window.location.reload();
  },700);
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
