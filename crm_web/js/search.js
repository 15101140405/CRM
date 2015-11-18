$(function () {
    //模拟历史数据
    $.cookie('searchVal', '%7B%22data%22%3A%5B%22iPhone6%22%5D%7D', 's20');
    search();
	$('#search_input').val('');
	
})

function search() {

    var defaultKwd = $('#default_kwd').attr('value'),
        cookie_searchVal = $.cookie('searchVal');

    //初始化
    $('#search_input').on('focus', function () {
        if ($('#search_input').val() == '') {
            $('.search_module').addClass('fixed_search');
            $(this).attr('placeholder', '');
            $('.cancle,.search_show,.hot_keywords').css('display', 'block');
			$('#idx_viewpoint').css('display','none');

            history();

        } else {} //继续输入
    })

    //历史搜索
    function history() {
        if (cookie_searchVal) {
            var jsonstr = decodeURIComponent(cookie_searchVal),
                rs = JSON.parse(jsonstr),
                arr = rs.data,
                history_str = '';

            for (var i = 0; i < arr.length && i < 4; i++) {
                history_str += '<a href="category.html?from=1&scat=4&key_word=' + decodeURIComponent(decodeURIComponent(arr[i])) + '">' + '<li class="keyword" data-icon="&#xe806">' + decodeURIComponent(decodeURIComponent(arr[i])) + '</li>' + '</a>';
            }

            $('.history .u_list').html(history_str);
            $('.history').css('display', 'block');
        } else {}
    }

    //取消还原
    $('.cancle').on('click', function () {
		
        $('.search_module').removeClass('fixed_search');
        $('#search_input').val('').attr('placeholder', defaultKwd);
        $('.cancle,.search_clear,.search_show,.hot_keywords,history,.search_sug').css('display', 'none');
    })

    //清除搜索内容
    $('.search_clear').on('click', function () {
        $('#search_input').val('').focus();
        $(this).css('display', 'none');

        $('.search_sug').css('display', 'none');
    })

    //清空搜索历史
    $('.clear_btn').on('click', function () {
        $('.history .u_list').html('');
        $('.history').css('display', 'none');
        $.cookie('searchVal', null);
    })

    //搜索提示
    $('#search_input').on('input propertychange', function () {
        var keystr = $(this).val(),
            timestamp = Date.parse(new Date());
        if ($('#search_input').val() == '') {
            $('.search_clear').css('display', 'none');
			$('.search_sug').css('display', 'none');
			return;
        } else {
            $('.search_clear').css('display', 'block');
        }
        $('.hot_keywords,.history').css('display', 'none');
        $('.search_sug').css('display', 'block');

        $.ajax({
            type: "get",
            url: "index.php?ctl=index&act=keywordsPromptNew&keystr=" + keystr + "&dotime=" + timestamp,
            dataType: 'text',
            success: function (msg) {
                $('.search_sug .u_list').html(msg);
            }
        });

        //复制文字到输入框
        $('.keyword .import').on('click', function () {
            var keyword = $(this).prev('a').text();
            $('#search_input').val(keyword).focus();;
			reduction();
			
        })

    })

    //搜索
    $('.search_btn').on('click', function () {
        var keystr = $('#search_input').val(),
            search_flag = 2; //搜索标识: 1 默认搜索, 2 用户搜索

        if ($('.search_module').hasClass('fixed_search')) {//搜索页的搜索

            if (keystr == '') {
                alert('请输入有效的关键字');
            } else {
				window.location.href = 'category.html?from=1&scat=' + search_flag + '&key_word=' + encodeURIComponent(encodeURIComponent(keystr));
				
            }

        } else { //默认搜索

            if (defaultKwd == '') {
                alert('请输入有效的关键字');
            } else {
                search_flag = 1;
				window.location.href = 'category.html?from=1&scat=' + search_flag + '&key_word=' + encodeURIComponent(encodeURIComponent(defaultKwd));
				
            }
        }
    })

//勾选操作
$('.select_ulist_item').on('click',function(){
        $('.select_ulist_item').removeClass('select_selected');
        $(this).addClass('select_selected'); 
    })

}