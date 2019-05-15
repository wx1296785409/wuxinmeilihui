$(function(){
    $('.theNav').each(function (a, b) {
        var sse = 255 + (81 * a)
        $(b).mouseenter(function () {
            $(this).next().css('left', sse + 'px').show();
        });
        $(b).mouseleave(function () {
            $(this).next().hide();
        });
    })
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(".header_container").height()) {
            $(".nav_container").css({
                'position': "fixed",
                'top': '0px'
            });
            $('.clickOn').css('display', 'block')
        } else {
            $(".nav_container").css({
                'position': "",
                'top': ''
            });
            $('.clickOn').css('display', 'none')
        }
    });
    $('.clickOn').click(function(){
        $("body,html").animate({
            scrollTop: 0
        }, 0, function() {
            mark = 1;
        });
    })
    console.log($('.DivImg'))
    $('.DivImg').click(function(){
        location.href="./details-page.html"
    })
    $('.header_menu li').click(function(){
        location.href="./paging.html"
    })
    $('.register').click(function(){
        location.href="./register.html"
    })
    $('.Signin').click(function(){
        location.href="./Signin.html"
    })
    $('.DivImg').each(function (index, valeue) {
        $(valeue).mouseenter(function () {
            $(valeue).children('a').css('display', 'block')
            $(valeue).children('img').animate({
                width: "105%",
                height: "105%",
                opacity: '0.5'
            })
        })
        $(valeue).mouseleave(function () {
            $(valeue).children('a').css('display', 'none')
            $(valeue).children('img').animate({
                width: "100%",
                height: "100%",
                opacity: '1'
            })
        })
    })
    $('.div1 span').click(function(){
        var index_b =$(this).index()
        var bbs = $(this).parents('.activitiesHeadera').nextUntil().eq(index_b)
        var sse = $(this).parents('.activitiesHeadera').nextUntil()
        $('.div1 span').css({'border-bottom':'none'})
        $(this).css({'border-bottom':'3px solid #000'})
        sse.css({'display':'none'})
        bbs.css({'display':'block'})
    })
    $('.theActivities').each(function (index, value) {
        console.log($(value).children('.theButton'))
        $(value).mouseenter(function () {
            $(value).children('.theButton').css('display', 'block')
            $(value).children('.bbs').css('display', 'block')
            $(value).animate({
                opacity: '0.8'
            })
            $(value).mouseleave(function () {
                $(value).children('.theButton').css('display', 'none')
                $(value).children('.bbs').css('display', 'none')
                $(value).animate({
                    opacity: '1'
                })
            })
        })
    })
})