'use strict';

/**
 * @author liyixin5
 * @date 2015-11-3
 * @desc 双十一推广
 */

PP.define('2015double11/page/index', function (require, exports, module) {
	var AudioPlayer = require('gb/widget/audio_player'), 
		$win = $(window), 
		$loading = $('.loading'), 
		$percent = $('#chrymnum'), 
		$menu = $('.menu'), 
		$enter = $('.enter'), 
		$cont = $('.mod_container'), 
		$allPage = $('.page'), 
		$subPage = $('.sub_page'), 
		$music = $('.music'), 

		$mainPage = $('.page_main'), 

		$wrapArr = $('.wrap'), 
		titleArr = ['aunt'], 
		title, 
		
		$select = $('.select'), 
		$back = $('.back_btn'), 

		$pages = $('.section'), 
		$pageArr = $('.section .page'), 

		startPos, 
		endPos, 
		offset, 
		direction, 

		curPage, 
		pageCount = 4, 
		winWidth, 
		winHeight, 
		pageHeight, 

		options, 

		perArr = [],
		imgArr = [__uri('images/music.png'), 

			__uri('images/loading_sp.png'), 
			__uri('images/page_bg.png'), 
			__uri('images/menu_bg.png'), 
			__uri('images/menu_title.png'), 
			__uri('images/menu_words.png'), 
			__uri('images/bowl.png'), 

			__uri('images/aunt_auntie.png'), 
			__uri('images/aunt_page1_bg.png'), 
			__uri('images/aunt_page1_sp.png'), 

			__uri('images/page0_boy.png'), 
			__uri('images/page0_bg.png'), 
			__uri('images/page0_boy_eye.png'), 
			__uri('images/page0_boy_slobber.png'), 
			__uri('images/page0_bubble.png'), 
			__uri('images/page0_heart.png'), 
			__uri('images/page0_lady1.png'), 
			__uri('images/page0_lady2.png'), 
			__uri('images/page0_txt.png'), 
			__uri('images/page0_txther.png'), 

			__uri('images/cat_page0_cat.png'), 
			__uri('images/cat_page0_bg.png'), 
			__uri('images/cat_page0_cat2.png'), 
			__uri('images/cat_page0_food.png'), 
			__uri('images/cat_page0_txt.png'), 

			__uri('images/deliver_girl.png'), 
			__uri('images/deliver_page1_char.png'), 
			__uri('images/deliver_page1_sp.png'), 

			__uri('images/subpage_bg.png'), 
			__uri('images/gb_sp.png'), 
			__uri('images/promote_words.png'), 
			__uri('images/share_man.png')];

	Array.prototype.each = function (cb, onDone){
		var length = this.length, 
			cnt = 0, 
			i, 
			finish = function (){
				if(++cnt === length){
					onDone && onDone.call(this);
				}
			};

		for(i=0; i<length; i++){
			cb.call(this, this[i], i, finish);
		}
	}

	var loadImg = function (srcArr, done, progress){
		var total = srcArr.length, 
			count = 0, 
			imgArr = [], 
			done = done? done: function(){};

		srcArr.each(function (val, idx, finish){
			var img, state = false;
			img = new Image();
			img.src = val;
			if (img.complete){
				imgArr[idx] = img;
				count++;
				progress && progress((count/total*100).toString().split('.')[0]);
				finish();
			} else {
				img.onload = function (){
					imgArr[idx] = img;
					count++;
				progress && progress((count/total*100).toString().split('.')[0]);
				finish();
				}
			}
		}, done.bind(this, imgArr));
	}

	var progress = function(percent){
		var per = parseInt(percent);
		perArr.push(per);
	}

	var done = function(){}

	var perCounter = function(){
		var $bar = $percent, 
			pCount = 0;

		var pc = setInterval(function (){
			if(perArr.length>0){
				var per = perArr[0];
				pCount += Math.ceil((per-pCount)/5)+1;
				if(pCount<=per){
					$bar.text(pCount);
				}else{
					perArr.shift();
				}

				if(pCount>=100){
					clearInterval(pc);
					$bar.text(100);
					setTimeout(loaded, 200);
				}
			}
		});
	}

	var setSize = function (){
		winWidth = $win.width();
		winHeight = $win.height();
		pageHeight = winHeight - 60;

		var	width = winWidth>640?640:winWidth, 
			height = winHeight;

		$cont.width(width);
		$allPage.width(width);
		$cont.height(height);
		$allPage.height(height);

		$subPage.height(height - 60);

		pscroll();
	}

	var allReset = function(){
		curPage = 0;
		direction = 'stay';

		$menu.attr('class', 'page menu').css({'z-index': '11'});
		$wrapArr.css({'display': 'none'});
		$mainPage.removeClass('on').css({'-webkit-transform': 'translateY(0)'});

		$pageArr.removeClass('on').removeClass('next').addClass('out');
		$pages.css({'-webkit-transform': 'translateY('+winHeight+'px)'});
	}

	var loaded = function(){
		$loading.css({'-webkit-transform': 'translateY(-100%)'});
		setTimeout(function(){$loading.css({'display': 'none'});}, 200);
		$menu.css({'-webkit-transform': 'translateY(0)'});
	}

	$win.on('resize', function(){setSize();});
	$('body').on('touchmove', function(e){e.preventDefault();});

	var pscroll = function(){
		allReset();

		$pages.on('touchstart', function (e){onStart(e.changedTouches[0], this);})
				.on('touchmove', function (e){onMove(e.changedTouches[0], this);})
				.on('touchend', function (e){onEnd(e.changedTouches[0], this);});
	}

	var onStart = function (e, p){
		var $p = $(p);

		event.preventDefault();
		offset = - curPage * pageHeight;
		startPos = e.pageY;
	}

	var onMove = function (e, p){
		var $p = $(p);

		event.preventDefault();
		endPos = e.pageY;

		if(!isHeadOrTail()){
			if(endPos >= startPos){
				dragPage($p, 'backward');
			}else if(endPos < startPos){
				dragPage($p, 'forward');
			}
		}
	}

	var onEnd = function (e, p){
		var $p = $(p), abs;

		event.preventDefault();
		endPos = e.pageY;
		console.log(curPage);

		if(!isHeadOrTail()){
			abs = Math.abs(endPos-startPos);
			$p.removeClass('drag');

			if(abs<=50 && abs>0 && endPos > startPos){
				animatePage($p, curPage, 'keep-backward');
			}else if(abs<=50 && abs>0 && endPos < startPos){
				animatePage($p, curPage, 'keep-forward');
			}else if(abs>50 && endPos > startPos){
				animatePage($p, curPage-1, 'backward');
			}else if((abs>50 && endPos < startPos) || abs === 0){
				animatePage($p, curPage+1, 'forward');
			}
		}
	}

	var dragPage = function ($p, action){
		var temp = offset + endPos - startPos;

		$p.css('-webkit-transform', 'translateY('+temp+'px)');
	}

	var isHeadOrTail = function (){
		if((endPos > startPos && curPage === 0) ||
			(endPos <= startPos && curPage === pageCount-1)){
			return true;
		}
		return false;
	}

	var animatePage = function ($p, newPage, action){
		var newOffset, 
			$tempArr = $p.children('.page');
		curPage = newPage;

		newOffset = curPage * (-pageHeight);

		$p.css({'-webkit-transform': 'translateY('+newOffset+'px)'});
		$('#'+title+'_'+newPage).removeClass('out').removeClass('next').addClass('on');
		if(curPage<($pageArr.length-2)){
			$('#' + title + '_' + (newPage+1)).addClass('next');
		}
	}

	$enter.on('touchstart', function(){
		var cls = $(this).attr('data-class');

		allReset();
		$menu.addClass('menu_fold '+cls);
		setTimeout(function(){$menu.css('z-index', '-1');}, 400);
		$('#'+cls).css('display', 'block');
		$('#'+cls+' .page_main').addClass('on');
	});

	$select.on('touchstart', function(){
		title = $(this).attr('data-class');
		var chosed = $(this).attr('data-selection'),
			$pageArr = $('.'+title+' .section .sub_page'), 
			h = $pageArr.height();

		if(chosed === '2'){
			$pageArr.eq(0).css({'-webkit-transform': 'translateY('+h+'px)'}).attr('id', title+'_1');
			$pageArr.eq(1).css({'-webkit-transform': 'translateY(-'+h+'px)'}).attr('id', title+'_0');
		}else{
			$pageArr.eq(0).css({'-webkit-transform': 'translateY(0px)'}).attr('id', title+'_0');
			$pageArr.eq(1).css({'-webkit-transform': 'translateY(0px)'}).attr('id', title+'_1');
		}

		$('#'+title+' .select').removeClass('select_on');
		$(this).addClass('select_on');

		setTimeout(function(){
			$mainPage.css({'-webkit-transform': 'translateY(-'+$win.height()+'px)'});
			$('#' + title + ' .section').css({'-webkit-transform': 'translateY(0px)'});
			$('#' + title + '_' + curPage).removeClass('out').addClass('on');
			$('#' + title + '_' + (curPage+1)).addClass('next');
		}, 200);
	});

	$back.on('touchend', function(){
		allReset();
	});

	setSize();
	perCounter();
	loadImg(imgArr, done, progress);

	var player = new AudioPlayer({
		src: __uri('images/bgm.mp3'), 
		autoplay: false
	});

	$music.on('touchstart', function(){
		player.togglePlay();
		$music.toggleClass('music_off');
	});

});
