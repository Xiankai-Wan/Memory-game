/*
 * Create a list that holds all of your cards
 */
var cards = [
  "fa-diamond", "fa-diamond",
  "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor",
  "fa-bolt", "fa-bolt",
  "fa-cube", "fa-cube",
  "fa-leaf", "fa-leaf",
  "fa-bicycle", "fa-bicycle",
  "fa-bomb", "fa-bomb"
];
var steps = 0;
var nosame = [];
var onestar = 14;
var twostar = 22;
var threestar = 33;
$(function () {
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
        switch (steps) {
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
function checkMatch(checkArry) {
  var class1 = checkArry[0];
  var class2 = checkArry[1];
  var SelectClass1 = '.' + class1.slice(3); //用于之后方便搜索
  var SelectClass2 = '.' + class2.slice(3);
  if (class1 == class2) {
    $(SelectClass1).each(function () {
      $(this).parent().toggleClass('match animated rubberBand');
      $(this).parent().unbind();
    });
  } else {
    $('.open').find(SelectClass1).parent().addClass('animated shake nomatch');
    $('.open').find(SelectClass2).parent().addClass('animated shake nomatch');
    setTimeout(function () {
      $('.open').find(SelectClass1).parent().removeClass('animated nomatch shake open show');
      $('.open').find(SelectClass2).parent().removeClass('animated nomatch shake open show');
    }, 1000);
    checkArry.splice(0, 2);
  }
  if (checkArry.length == 16) {
    isWin();
  }
}
// more easy way for shuffle
function shuffle(array) {
  array.sort(function () {
    return Math.random() > 0.5 ? 1 : -1;
  });
  return array;
}
//ready the initial page info 
function initGamePage() {
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
function isWin() {
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
  setTimeout(function () {
    $('#win').toggleClass('hidden');
    window.location.reload();
  }, 700);
});

// jquery timer 插件代码
jQuery.fn.extend({ everyTime: function (c, a, d, b) { return this.each(function () { jQuery.timer.add(this, c, a, d, b) }) }, oneTime: function (c, a, d) { return this.each(function () { jQuery.timer.add(this, c, a, d, 1) }) }, stopTime: function (c, a) { return this.each(function () { jQuery.timer.remove(this, c, a) }) } });
jQuery.extend({
  timer: {
    global: [], guid: 1, dataKey: "jQuery.timer", regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/, powers: { ms: 1, cs: 10, ds: 100, s: 1E3, das: 1E4, hs: 1E5, ks: 1E6 }, timeParse: function (c) { if (c == undefined || c == null) return null; var a = this.regex.exec(jQuery.trim(c.toString())); return a[2] ? parseFloat(a[1]) * (this.powers[a[2]] || 1) : c }, add: function (c, a, d, b, e) {
      var g = 0; if (jQuery.isFunction(d)) { e || (e = b); b = d; d = a } a = jQuery.timer.timeParse(a); if (!(typeof a != "number" || isNaN(a) || a < 0)) {
        if (typeof e != "number" || isNaN(e) || e < 0) e =
          0; e = e || 0; var f = jQuery.data(c, this.dataKey) || jQuery.data(c, this.dataKey, {}); f[d] || (f[d] = {}); b.timerID = b.timerID || this.guid++; var h = function () { if (++g > e && e !== 0 || b.call(c, g) === false) jQuery.timer.remove(c, d, b) }; h.timerID = b.timerID; f[d][b.timerID] || (f[d][b.timerID] = window.setInterval(h, a)); this.global.push(c)
      }
    }, remove: function (c, a, d) {
      var b = jQuery.data(c, this.dataKey), e; if (b) {
        if (a) {
          if (b[a]) {
            if (d) { if (d.timerID) { window.clearInterval(b[a][d.timerID]); delete b[a][d.timerID] } } else for (d in b[a]) {
              window.clearInterval(b[a][d]);
              delete b[a][d]
            } for (e in b[a]) break; if (!e) { e = null; delete b[a] }
          }
        } else for (a in b) this.remove(c, a, d); for (e in b) break; e || jQuery.removeData(c, this.dataKey)
      }
    }
  }
}); jQuery(window).bind("unload", function () { jQuery.each(jQuery.timer.global, function (c, a) { jQuery.timer.remove(a) }) });
