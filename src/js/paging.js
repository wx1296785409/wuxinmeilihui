$(function () {
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
        } else {
            $(".nav_container").css({
                'position': "",
                'top': ''
            });
        }
    });
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
    $('.DivImg').click(function () {
        location.href = "./details-page.html"
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
    var pageArray = [];
    var bbs = []
    jQuery.getJSON('http://localhost/project/data.json', function (src) {
        for (var key in src) {
            var good = src[key]
            pageArray.push(good)
        }
        var pageNum = Math.ceil(pageArray.length / 9);
        for (var i = 0; i < pageNum; i++) {
            var span = document.createElement("span");
            span.innerHTML = i + 1;
            console.log(i)
            $('.naneeq').prepend(span)
            bbs.unshift(span);
        }
        $(' .naneeq span').click(function () {
            console.log($(this).index())
            $('.nonBeauty_content').remove()
            for (var i = $(this).index() * 9; i < $(this).index() * 9 + 9; i++) {
                if (pageArray.length === i) break;
                item = pageArray[i];
                console.log($(this))
                var html = ''
                html += `
                        <div class="nonBeauty_content">
                        <div class="theEvent theEventTop">
                            <div class="DivImg">
                                <a>${item.activity}</a>
                                <img src="${item.img}"
                                    alt="">
                            </div>
                            <div class="theEventIntroduction">
                                <span class="theEventTitle">${item.name}</span>
                                <span class="bbs">${item.fracture}
                                    <a>折</a>
                                </span>
                            </div>
                        </div>
                        `
                $('.content_container').prepend(html)
            }
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
        })

    })
    $('.div1 span').click(function () {
        var index_b = $(this).index()
        var bbs = $(this).parents('.activitiesHeadera').nextUntil().eq(index_b)
        var sse = $(this).parents('.activitiesHeadera').nextUntil()
        $('.div1 span').css({
            'border-bottom': 'none'
        })
        $(this).css({
            'border-bottom': '3px solid #000'
        })
        sse.css({
            'display': 'none'
        })
        bbs.css({
            'display': 'block'
        })
    })
    $('.register').click(function () {
        location.href = "./register.html"
    })
    $('.Signin').click(function () {
        location.href = "./Signin.html"
    })
})