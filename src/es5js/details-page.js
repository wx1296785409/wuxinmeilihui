"use strict";

$(function () {
  $('.theNav').each(function (a, b) {
    var sse = 255 + 81 * a;
    $(b).mouseenter(function () {
      $(this).next().css('left', sse + 'px').show();
    });
    $(b).mouseleave(function () {
      $(this).next().hide();
    });
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() >= $(".header_container").height()) {
      $(".nav_container").css({
        'position': "fixed",
        'top': '0px'
      });
    } else {
      $(".nav_container").css({
        'position': "",
        'top': ''
      });
    }
  }); //点击按钮图片运动

  var i = 1;
  $('.bigimg_prev').click(function () {
    $('.bigimg_next').css('display', 'block');
    i++;
    var bbs = -640 * i; //console.log(bbs)

    if (bbs <= -1920) {
      //console.log(1)
      $('.bigimg_prev').css('display', 'none');
    }

    $('.slide-item').css('top', bbs + 'px');
  }); //console.log(i)

  $('.bigimg_next').click(function () {
    //console.log(i)
    $('.bigimg_prev').css('display', 'block');
    i--;
    var bbs = -640 * i + 1; //console.log(bbs)

    if (bbs >= 0) {
      //console.log(1)
      $('.bigimg_next').css('display', 'none');
    }

    $('.slide-item').css('top', bbs + 'px');
  });

  if (i == 0) {
    $('.bigimg_next').css('display', 'none');
  } //点击那个图片切换到那个
  //console.log($('.thumbs').children())


  $('.thumbs').children().each(function (index, value) {
    //console.log($(index), $(value))
    $(value).click(function () {
      var bbs = -640 * index;
      $('.slide-item').css('top', bbs + 'px');
    });
  }); //鼠标划入商品信息信息

  $('.huar').each(function (index, value) {
    //console.log(index, value)
    $(value).mouseenter(function () {
      $(this).next().next().css('display', 'block');
    });
    $(value).mouseleave(function () {
      $(this).next().next().css('display', 'none');
    });
  });
  console.log($('#product_choose_size_ul .huar'));
  $('#product_choose_size_ul a').click(function () {
    console.log($(this).parents('#product_choose_size_ul').children().find('a'));
    $(this).parents('#product_choose_size_ul').children().find('a').removeClass('huar');
    $(this).addClass('huar');
  });
  var bbs = $('#quantity').val();
  $('.number_reduce').click(function () {
    $(this).next().find('#quantity').val(bbs--);

    if ($(this).next().find('#quantity').val() <= 1) {
      $(this).next().find('#quantity').val(1);
    }
  });
  $('.number_increase').click(function () {
    console.log($(this).prev().find('#quantity').val());
    $(this).prev().find('#quantity').val(bbs++);
  }); //倒计时

  function countDown(dateString) {
    var target = new Date(dateString);
    var now = Date.now();
    var Dtime = target - now;
    var tian = parseInt(Dtime / 86400000);
    var hour = parseInt(Dtime % 86400000 / 3600000);
    var minute = parseInt(Dtime % 86400000 % 3600000 / 60000);
    var second = parseInt(Dtime % 86400000 % 3600000 % 60000 / 1000);
    return {
      hour: hour,
      minute: minute,
      second: second,
      tian: tian
    };
  }

  myCountDown();
  setInterval(myCountDown, 1000);

  function myCountDown() {
    var count_down = countDown("2019/8/15");
    $('#countdownDD').html(quling(count_down.tian));
    $('#countdownHH').html(quling(count_down.hour));
    $('#countdownMM').html(quling(count_down.minute));
    $('#countdownSS').html(quling(count_down.second));
  }

  function quling(mum) {
    return mum < 10 ? "0" + mum : mum;
  }

  console.log($('.shopping_quantity')); //cookie数据的储存

  $('.buy_now_btn').click(function () {
    location.href = "./shoppingCart.html";
  });
  $('.join_shopping_bag').click(function () {
    location.href = "./shoppingCart.html";
  });
  $('.buy_now_btn').click(function () {
    //品牌
    var brand = $(this).parents('.product_info').children('.product_title').html(); //商品名称

    var name = $(this).parents('.product_info').children('.product_name').children('h1').html(); //颜色

    var colour = $(this).parents('.product_info').children('.product_choose_color').children('.product_choose_title').children('span').html(); //尺码

    var size = $(this).parents('.product_info').children('.product_choose_size').children('#product_choose_size_ul').children('li').children('.huar').html(); //价格

    var price = $(this).parents('.product_info').children('.product_price_box').children('.product_price').children('#productRMB').html(); //个数

    var number = $(this).parents('.product_info').children('.product_choose').children('.number_choose').children('.quantity_number').children('#quantity').val(); //图片

    var picture = $(this).parents('.product_info').find('img').attr('src');
    console.log(picture);
    console.log(number);
    var Onumber = parseInt(number);
    var cartStr = $.cookie('cart') ? $.cookie('cart') : '';
    var cartObj = convertCartStrToObj(cartStr);
    console.log(cartObj[name]);
    var i = 0;

    if (name in cartObj) {
      cartObj[name].Onumber += 1;
    } else {
      i++;
      $('.shopping_quantity').html(i);
      cartObj[name] = {
        brand: brand,
        colour: colour,
        size: size,
        price: price,
        Onumber: Onumber,
        picture: picture
      };
    }

    cartStr = JSON.stringify(cartObj);
    console.log(cartStr);
    $.cookie('cart', cartStr, {
      expires: 7,
      path: "/"
    });
  });

  function convertCartStrToObj(cartStr) {
    if (!cartStr) {
      return {};
    }

    ;
    console.log(cartStr);
    return JSON.parse(cartStr);
  }

  $('.div1 span').click(function () {
    var index_b = $(this).index();
    var bbs = $(this).parents('.activitiesHeadera').nextUntil().eq(index_b);
    var sse = $(this).parents('.activitiesHeadera').nextUntil();
    $('.div1 span').css({
      'border-bottom': 'none'
    });
    $(this).css({
      'border-bottom': '3px solid #000'
    });
    sse.css({
      'display': 'none'
    });
    bbs.css({
      'display': 'block'
    });
  });
  $('.register').click(function () {
    location.href = "./register.html";
  });
  $('.Signin').click(function () {
    location.href = "./Signin.html";
  });
  console.log($('#shousuo .box_effect_unfold a'));
  $('#shousuo .box_effect_unfold a').click(function () {
    $(this).parents('.box_effect_content').find('#Status_close_list').css('display', 'block');
    console.log($(this).parents('.box_effect_content').find('#Status_close_list'));
  });
  $('.theActivities').each(function (index, value) {
    console.log($(value).children('.theButton'));
    $(value).mouseenter(function () {
      $(value).children('.theButton').css('display', 'block');
      $(value).children('.bbs').css('display', 'block');
      $(value).animate({
        opacity: '0.8'
      });
      $(value).mouseleave(function () {
        $(value).children('.theButton').css('display', 'none');
        $(value).children('.bbs').css('display', 'none');
        $(value).animate({
          opacity: '1'
        });
      });
    });
  });
});