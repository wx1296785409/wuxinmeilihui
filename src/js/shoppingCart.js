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
    var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
    console.log(cartStr)
    if (!cartStr) {} else {
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr)
        console.log(cartObj);
        var keycount = 0;
        for (var id in cartObj) {
            keycount++;
            var good = cartObj[id]
            $('.shopping_quantity').html(keycount)
            console.log(good)
            // console.log($('.listV3'))
            // //品牌
            // console.log(good.brand)
            // //商品名称
            // console.log(id)
            // //颜色
            // console.log(good.colour)
            // //尺码
            // console.log(good.size)
            // //价格
            // console.log(good.price)
            // //个数
            // console.log(good.Onumber)
            // //图片
            // console.log(good.picture)
            //总价
            var total_price = good.Onumber * good.price;
            console.log(total_price)


            html = `
            <div class="list_content list_content2">
            <div class="packageType clearfix">
                <span class="checkAll"></span>
                <h3>品牌直发</h3>
            </div>
            <div class="blockBox">
                <ul class="list_content_ul clearfix">
                    <li class="cart_chk">
                        <span class="checkAll"></span>
                    </li>
                    <li class="list_content_left">
                        <p class="list_content_img border_color1">
                            <img src="${good.picture}" alt="">
                        </p>
                        <div class="list_content_info">
                            <span class="list_content_name">${good.brand}</span><br>
                            <span class="cName">${id}</span>
                            <div class="list_content_infobox clearfix">
                                <div class="sku_info">
                                    <span class="list_content_color">颜色:<a>${good.colour}</a></span>
                                    <span class="list_content_size">尺寸:<a>${good.size}</a></span>
                                </div>
                                <div class="btn_edit">
                                    <span>修改</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="unit-price price-box">
                        <p class="itemPrice">￥<span>${good.price}</span>.00</p>
                    </li>
                    <li>
                        <div class="number_choose chooseBox">
                            <span class="number_reduce number_reduce_none" id="countReduce">-</span>
                            <span class="quantity_number">
                             <input type="text" value="${good.Onumber}" class="quantity">
                            </span>
                            <span id="countAdd" class="number_increase">+</span>
                        </div>
                        <div class="special2"><a>库存不足</a></div>
                    </li>
                    <li class="unit-price">
                            ￥0.00
                    </li>
                    <li class="amount">
                        ￥<span>${total_price}</span>.00
                    </li>
                    <li class="li_pop">
                        <button class="list_content_delete deleteBox">删除</button>
                    </li>
                </ul>
            </div>
        </div>
            `
            $('.listV3').after(html)
            //console.log($('.gwd_total .list_content_size a').html())
            console.log($('.deleteBox'))
        }
    }
    console.log($('.deleteBox'))
    //删除cookie
    $('.deleteBox').click(function () {
        var id = $(this).parents('.list_content_ul').find('.cName').html();
        console.log(id)
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        delete cartObj[id]
        cartStr = JSON.stringify(cartObj);
        $.cookie('cart', cartStr, {
            expires: 7,
            path: "/"
        })
        console.log(cartStr)
        $(this).parents('.list_content').remove()
    })

    //全部点击
    $('.payPlane .checkAll').on('click', all_elections)

    function all_elections() {
        console.log($(this).parents('#bagContent').find('.list_content').length)
        $(this).parents('.checkAllBox').find('#checkedNum').html($(this).parents('#bagContent').find('.list_content').length)
        console.log($('.list_content_ul .cart_chk span'))
        //这个是判断给他添加小圆孔
        if ($('.list_content_ul .cart_chk span').hasClass('checkAll')) {
            alert("有")
            $(this).parents('.payPlane').siblings().find('.checkAll').addClass('checkAll').toggleClass('checkedItem');
            $(this).addClass('checkAll').toggleClass('checkedItem');

        } else {
            alert("没有")
            $(this).parents('.payPlane').siblings().find('.checkAll').addClass('checkAll').toggleClass('checkedItem');
            $(this).addClass('checkAll').toggleClass('checkedItem');
        }
        //这个是判断他是不是选中状态
        if ($(this).parents('.payPlane').siblings().find('.cart_chk span').hasClass('checkedItem')) {
            $('.gwd_total .list_content_size a').html($(this).parents('.payPlane').siblings().find('.amount span').html())
            console.log($(this).parents('#bagContent').find('#countReduce'))
            $(this).parents('#bagContent').find('#countReduce').on('click', reduce)
            $(this).parents('#bagContent').find('#countAdd').on('click', plus)
        } else {
            console.log(1)
            $(this).parents('.checkAllBox').find('#checkedNum').html(0)
            $('.gwd_total .list_content_size a').html(0)
        }
    };
    //单点
    $('.list_content .blockBox .cart_chk span').click(function () {
        //这个是给他I小购物车加个数的
        $(this).parents('#bagContent').find('#checkedNum').html($(this).parents('#bagContent').find('.list_content2').length)
        //这个是给他添加按钮的
        if ($(this).hasClass('checkAll')) {
            $(this).parents('.list_content').find('.packageType span').addClass('checkedItem').removeClass('checkAll')
            $(this).addClass('checkedItem').toggleClass('checkAll')
        } else {
            $(this).parents('.list_content').find('.packageType span').addClass('checkAll').removeClass('checkedItem')
            $(this).addClass('checkAll').toggleClass('checkedItem')
        }
        console.log($(this).hasClass('checkedItem'))
        if ($(this).hasClass('checkedItem')) {
            var plus_total_price = Number($('.gwd_total .list_content_size a').html())
            alert('选中了')
            console.log($(this).parents('.list_content_ul').find('#countReduce'))
            $(this).parents('.list_content_ul').find('#countReduce').on('click', reduce)
            $(this).parents('.list_content_ul').find('#countAdd').on('click', plus)
            var oTotal_price = Number($(this).parents('.list_content_ul').find('.amount span').html())
            plus_total_price += oTotal_price
            $('.gwd_total .list_content_size a').html(plus_total_price)
        } else {
            alert('没有选中')
            $(this).parents('#bagContent').find('#checkedNum').html(0)
            $('.gwd_total .list_content_size a').html(0)
        }
    })

    //点击加号
    function plus() {
        var id = $(this).parents('.list_content_ul').find('.cName').html();
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        cartObj[id].Onumber++

        if ($(this).parents('.blockBox').find('.cart_chk span').hasClass('checkedItem')) {
            $(this).prev().children('.quantity').val("" + cartObj[id].Onumber);
            var total_price = cartObj[id].Onumber * cartObj[id].price;
            $(this).parents('.list_content_ul').find('.amount').children('span').html(total_price);
            $(this).parents('#bagContent').find('.gwd_total .list_content_size a').html(total_price)
        } else {
            alert("请选中之后再点击")
        }

        $.cookie('cart', JSON.stringify(cartObj), {
            expires: 7,
            path: "/"
        });
    }
    //点击减号
    function reduce() {
        var id = $(this).parents('.list_content_ul').find('.cName').html();
        var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        var cartObj = convertCartStrToObj(cartStr);
        cartObj[id].Onumber--
        if (cartObj[id].Onumber < 1) {
            cartObj[id].Onumber = 1
        }

        console.log($(this).parents('.blockBox').find('.cart_chk span'))

        if ($(this).parents('.blockBox').find('.cart_chk span').hasClass('checkedItem')) {
            $(this).next().children('.quantity').val("" + cartObj[id].Onumber);
            var total_price = cartObj[id].Onumber * cartObj[id].price;
            console.log("有")
            $(this).parents('.list_content_ul').find('.amount').children('span').html(total_price);
            $(this).parents('#bagContent').find('.gwd_total .list_content_size a').html(total_price)
        } else {
            alert("请选中之后再点击")
        }


        $.cookie('cart', JSON.stringify(cartObj), {
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
    $('.register').click(function () {
        location.href = "./register.html"
    })
    $('.Signin').click(function () {
        location.href = "./Signin.html"
    })
})