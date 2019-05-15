$(function () {
    $('.signin').click(function () {
        location.href = "http://localhost/wuxinproject/Signin.html";
    })
    $('#mobile').on('blur', account_number);
    //这个是账号的
    function account_number() {
        submitForm()
        var act_error = $('.userAccount').next()
        console.log(act_error)
        var patrn = /^1(3|4|5|7|8)\d{9}$/;
        var account_number_value = $('.userAccount').val()
        console.log(account_number_value);
        if (patrn.exec(account_number_value)) {
            act_error.addClass("Act_sooob");
            act_error.removeClass("Act_error ");
            console.log('成功')
        } else {
            act_error.addClass("Act_error")
            act_error.removeClass("Act_sooob ");
            console.log("失败")
        }
    }
    //验证码的
    var num = "";
    for (var i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10)
    }
    $(".mask").html(num)
    $('.yanzheng').on('blur', verification_code)

    function verification_code() {
        submitForm()
        var bbs = $(".mask").html()
        var bba = $('.yanzheng').val()
        var rdm_imgbox = $('.rdm_imgBox').next()
        console.log(rdm_imgbox)
        if (bbs == bba) {
            rdm_imgbox.addClass("Rdm_sooob");
            rdm_imgbox.removeClass("Rdm_error ");
            console.log("等于")
        } else {
            rdm_imgbox.addClass("Rdm_error")
            rdm_imgbox.removeClass("Rdm_sooob ");
            console.log("不等于")
        }
    }
    //手机验证码
    var smsCode = $('#smsCode')
    var getSMSCode = $('#getSMSCode').next()
    console.log(getSMSCode)
    smsCode.blur(function () {
        submitForm()
        if (smsCode.val() == '') {
            console.log(1)
            getSMSCode.addClass("Pwd_error");
            getSMSCode.removeClass("Pwd_sooob");
        } else {
            console.log("手机验证码不对")
            getSMSCode.addClass("Pwd_sooob");
            getSMSCode.removeClass("Pwd_error ");
        }
    })
    //密码验证
    $(".setPassword").on('keypress', password)
    console.log($('span')[0])
    var $low = $('span')[0]
    var $middle = $('span')[1]
    var $height = $('span')[2]
    console.log($low, $middle, $height)

    function password() {
        submitForm()
        $('.login_safety').css('display', 'block')
        var bbf = $(".setPassword").val()
        var reg = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/
        if (reg.exec(bbf)) {
            $(".setPassword").next().next().next().addClass("Act_sooob");
            $(".setPassword").next().next().next().removeClass("Act_error");
        } else {
            $(".setPassword").next().next().next().addClass("Act_error");
            $(".setPassword").next().next().next().removeClass("Act_sooob");
        }
        var low = /[a-z]/g;
        var ino = /[0-9]/g;
        var strong = /\.[^a-z0-9]/g;
        var aLvTxt = ['', $low, $middle, $height];
        console.log(aLvTxt)
        var lv = 0;
        if (bbf.match(low)) {lv++ }
        if (bbf.match(ino)) {lv++}
        if (bbf.match(strong)) { lv++}
        console.log(aLvTxt[lv]);
        console.log(lv);
        if (lv == 1) {
            $('#low').css('background', 'red')
        }
        if (lv == 2) {
            $('#middle').css('background', '#FFFF33')
            $('#low').css('background', '#d1d0ce')
        }
        if (lv == 3) {
            $('#height').css('background', '#77FF00')
            $('#middle').css('background', '#d1d0ce')
        }
    }
    //阻止默认事件
    $('.disagree').on('click', submitForm)
    console.log($('.disagree'))
    function submitForm(evt) {
        var e = evt || window.event;
        var spans = document.querySelectorAll("#bbs");
        var bbs = document.querySelector(".userAccount").nextSibling.nextSibling;
        var bba = document.querySelector('.setPassword').nextSibling.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling;
        var aaa = document.querySelector(".rdm_imgBox").nextSibling.nextSibling
        var bbb = document.querySelector('#getSMSCode').nextSibling.nextSibling
        var eed = $('.yanzheng').val();
        console.log($('.yanzheng'))
        var ees = $('.userAccount').val();
        console.log($('.userAccount'))
        var sse = $('.setPassword').val();
        console.log($('.setPassword'))
        var nns = $('.yanzhenga').val();
        console.log($('.yanzhenga'))
        if (ees == "") {
            e.preventDefault();
            bbs.className = "Act_error";
            console.log(1)
        } else if (eed == "") {
            aaa.className = "Rdm_error";
        } else if (ees == "") {
            e.preventDefault();
            bbs.className = "Act_error";
        } else if (nns == "") {
            e.preventDefault();
            bbb.className = "Pwd_error"
        } else if (eed == "") {
            e.preventDefault();
            bba.className = "Act_error"
        } else {
            $('.disagree').on('click', submission)
        }
        if (bbs.className == 'Act_sooob') {} else if (bba.className == 'Act_sooob') {} else if (
            aaa.className == 'Rdm_sooob') {} else if (bbb.className == 'Pwd_sooob') {} else {
            $('.disagree').on('click', submission)
        }
    }
    //拿cook存储
    function submission() {
        var bba = $(".userAccount").val()
        var bbf = $(".setPassword").val()
        var cartStr = $.cookie('loginregistration') ? $.cookie('loginregistration') : '';
        var cartObj = convertCartStrToObj(cartStr);
        console.log(cartObj)
        if (bba in cartObj) {
            submitForm()
            location.href = "http://localhost/wuxinproject/Signin.html";
        } else {
            cartObj[bba] = bbf;
        }
        cartStr = JSON.stringify(cartObj);
        console.log(cartStr)
        $.cookie('loginregistration', cartStr, {
            expires: 7,
            path: "/"
        });
    }
    function convertCartStrToObj(cartStr) {
        if (!cartStr) {
            return {}
        };
        
        return JSON.parse(cartStr)
    }

})
