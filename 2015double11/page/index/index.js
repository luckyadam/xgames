'use strict';

/**
 * @author liyixin5
 * @date 2015-11-3
 * @desc 双十一推广
 */

PP.define('2015double11/page/index', function (require, exports, module) {
	var AudioPlayer = require('gb/widget/audio_player'), 
		$win = $(window), 
		$menu = $('.menu'), 
		$enter = $('.enter'), 
		$cont = $('.mod_container'), 
		$allPage = $('.page'), 
		$subPage = $('.sub_page'), 

		$mainPage = $('.page_main'), 

		$wrapArr = $('.wrap'), 
		titleArr = ['aunt'], 
		title, 
		
		$select = $('.select'), 
		$back = $('.back'), 

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

		options;	

	var setSize = function (){
		winWidth = $win.width();
		winHeight = $win.height();
		pageHeight = winHeight - 65;
		
		var	width = winWidth>640?640:winWidth, 
			height = winHeight;

		$cont.width(width);
		$allPage.width(width);
		$cont.height(height);
		$allPage.height(height);

		$subPage.height(height - 65);

		pscroll();
	}

	var allReset = function(){
		curPage = 0;
		direction = 'stay';

		$menu.removeClass('menu_fold').css({'display': 'block', 'opacity': '1'});

		$pageArr.removeClass('on').removeClass('next').addClass('out');
		$pages.css({'-webkit-transform': 'translateY('+winHeight+'px)'});
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
		console.log(curPage);
	}

	var onMove = function (e, p){
		var $p = $(p);

		event.preventDefault();
		endPos = e.pageY;
		console.log(curPage);

		if(!isHeadOrTail()){
			if(endPos >= startPos){
				dragPage($p, 'backward');
			}else if(endPos < startPos){
				dragPage($p, 'forward');
			}
		}
	}

	var onEnd = function (e, p){
		var $p = $(p);

		event.preventDefault();
		endPos = e.pageY;
		console.log(curPage);

		if(!isHeadOrTail()){
			$p.removeClass('drag');

			if(Math.abs(endPos-startPos)<=50 && endPos >= startPos){
				animatePage($p, curPage, 'keep-backward');
			}else if(Math.abs(endPos-startPos)<=50 && endPos < startPos){
				animatePage($p, curPage, 'keep-forward');
			}else if(Math.abs(endPos-startPos)>50 && endPos >= startPos){
				animatePage($p, curPage-1, 'backward');
			}else if(Math.abs(endPos-startPos)>50 && endPos < startPos){
				animatePage($p, curPage+1, 'forward');
			}
		}
	}

	var dragPage = function ($p, action){
		var temp = offset + endPos - startPos;

		$p.css('-webkit-transform', 'translateY('+temp+'px)');
	}

	var isHeadOrTail = function (){
		if((endPos >= startPos && curPage === 0) ||
			(endPos <= startPos && curPage === pageCount-1)){
			return true;
		}
		return false;
	}

	var animatePage = function ($p, newPage, action){
		var newOffset, 
			$tempArr = $p.children('.page');
		curPage = newPage;
		console.log(curPage);

		newOffset = curPage * (-pageHeight);

		$p.css({'-webkit-transform': 'translateY('+newOffset+'px)'});
		$('#'+title+'_'+curPage).removeClass('out').removeClass('next').addClass('on');
		if(curPage<($pageArr.length-2) && action==='forward'){
			$('#' + title + '_' + (curPage+1)).addClass('next');
		}
	}

	$enter.on('touchstart', function(){
		var cls = $(this).attr('data-class');

		$menu.addClass('menu_fold');
		setTimeout(function(){$menu.css('display', 'none');}, 200);
		$('#'+cls).css('display', 'block');
	});

	$select.on('touchstart', function(){
		var chosed = $(this).attr('data-selection'),
			h = $pageArr.height();
		title = $(this).attr('data-class');

		if(chosed === '2'){
			$pageArr.eq(0).css({'-webkit-transform': 'translateY('+h+'px)'}).attr('id', title+'_1');
			$pageArr.eq(1).css({'-webkit-transform': 'translateY(-'+h+'px)'}).attr('id', title+'_0');
		}else{
			$pageArr.eq(0).css({'-webkit-transform': 'translateY(0px)'}).attr('id', title+'_0');
			$pageArr.eq(1).css({'-webkit-transform': 'translateY(0px)'}).attr('id', title+'_1');
		}

		$mainPage.css({'-webkit-transform': 'translateY(-'+$win.height()+'px)'});
		$('#' + title + ' .section').css({'-webkit-transform': 'translateY(0px)'});
		$('#' + title + '_' + curPage).removeClass('out').addClass('on');
		$('#' + title + '_' + (curPage+1)).addClass('next');
	});

	$back.on('touchend', function(){
		allReset();
	});

	setSize();
	// var player = new AudioPlayer({
	// 	src: null
	// });

});
