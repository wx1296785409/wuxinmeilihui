"use strict";

$(function () {
  $('.zhuce a').click(function () {
    location.href = "http://localhost/wuxinproject/register.html";
  });
  $('.login_tab li').click(function () {
    var index = $(this).index();
    $(this).addClass('selected').siblings().removeClass('selected');
    console.log($(this).siblings());
    $('.hydl_loginbar').eq(index).removeClass('active').siblings().addClass('active');
  });
  $('.userAccount').blur(function () {
    var patrn = /^1(3|4|5|7|8)\d{9}$/;
    console.log($('.active .userAccount').val());
    console.log($('.active .userAccount').next());

    if (patrn.exec($('.active .userAccount').val())) {
      if ($('.active .userAccount').val() == '') return false;
    } else {
      console.log("失败");
      $('.active .userAccount').next().addClass("Act_error");
      $('.active .userAccount').next().removeClass("error ");
    }
  });
  $('.yanzhenma').blur(function () {
    var reg = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
    console.log($('.active .yanzhenma').val());
    console.log(reg.exec($('.active .yanzhenma').val()));

    if (reg.exec($('.active .yanzhenma').val())) {
      if ($('.active .yanzhenma').val() == '') return false;
      console.log($('.active .yanzhenma').val() == '');
    } else {
      console.log("失败");
      console.log($('.mobileBox .yanzhenma').val() == '');

      if ($('.mobileBox .yanzhenma').val() == '') {
        $('.active .yanzhenma').next().next().addClass("Pwd_error");
        $('.active .yanzhenma').next().next().removeClass("error");
      } else {}
    }
  });
  console.log($('.mobileBox .submitBtn'), $('.account_login .submitBtn'));
  $('.mobileBox .submitBtn').on('click', bee);
  $('.account_login .submitBtn').on('click', see);

  function bee() {
    console.log("我在什么时候执行");
    var account_number = $('.active #mobile').val();
    var cartStr = $.cookie('loginregistration') ? $.cookie('loginregistration') : '';
    var cartObj = convertCartStrToObj(cartStr);

    for (var key in cartObj) {
      console.log(key == account_number);

      if (key == account_number) {
        location.href = "http://localhost/wuxinproject/homepage.html";
        return false;
      } else {
        $('.active #mobile').next().addClass("Act_error");
        $('.active #mobile').next().removeClass("error");
      }
    }
  }

  function see() {
    console.log("你猜我在什么时候执行");
    var account_number = $('.active #mobilea').val();
    var password = $('.active .yanzhenma').val();
    var cartStr = $.cookie('loginregistration') ? $.cookie('loginregistration') : '';
    var cartObj = convertCartStrToObj(cartStr);

    for (var key in cartObj) {
      console.log(key == account_number);

      if (key == account_number) {
        console.log(cartObj[account_number] == password);

        if (cartObj[account_number] == password) {
          location.href = "http://localhost/wuxinproject/homepage.html";
          return false;
        } else {
          alert("密码错误");
          console.log($('.active #mobilea').next());
          $('.active .yanzhenma').next().addClass("Pwd_error");
          $('.active .yanzhenma').next().removeClass("error ");
        }
      } else {
        alert("手机号错误");
        $('.active #mobilea').next().addClass("Act_error");
        $('.active #mobilea').next().removeClass("error");
      }
    }
  }

  function convertCartStrToObj(cartStr) {
    if (!cartStr) {
      return {};
    }

    ;
    console.log(cartStr);
    return JSON.parse(cartStr);
  }
});