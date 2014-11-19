
/*
	proscom.ru
	Илья Шикарный
	Простые Коммуникации
*/

$(document).ready(function() {

	// Всплывающая подсказка
	function tooltip(){
		$(".js-tooltip-item").hover(
			function(){
				$(this).find(".js-tooltip-hits").stop().fadeIn(300)
			}, 
			function(){
				$(this).find(".js-tooltip-hits").stop().fadeOut(300)
			}
		);	
	}
	tooltip();


	//	СЛАЙДЕРЫ ЗНАЧЕНИЙ
	// =================================================
	// Возраст
	$(".range-age input").ionRangeSlider({
		type: "double",
		min: "1",
		max: "100",
		from: 44,
		to: 56,
		step: "1",
		postfix: "",
		hideMinMax: true,
	});

	// Рост
	$(".range-growth input").ionRangeSlider({
		type: "double",
		min: "30",
		max: "320",
		from: 160,
		to: 180,
		step: "1",
		postfix: "",
		hideMinMax: true,
	});

	// Дата
	$(".range-date input").ionRangeSlider({
		type: "double",
		values: [
				"Январь", "Февраль",
				"Март", "Апрель",
				"Май", "Июнь",
				"Июль", "Август",
				"Сентябрь", "Октябрь",
				"Ноябрь", "Декабрь"
			],
		step: "1",
		postfix: "",
		hideMinMax: true,
	});


	//	ИНТЕРАКТИВ
	//=================================================
	$(".instruction-block .item .welcome").click(function (e) {
		e.preventDefault();
		var thisis = $(this);
		var item = thisis.closest(".item");
		var allItems = thisis.closest(".instruction-block").find(".item");
		var target = $(e.target).closest(".item")

		if (!target.hasClass("active")) {
			allItems.removeClass("active");
			allItems.find(".hidden-text").slideUp();
		}

		if(item.hasClass("active")) {
			item.removeClass("active");
			item.find(".hidden-text").slideUp();
		} else {
			item.addClass("active");
			item.find(".hidden-text").slideDown();
		}
	});
	


	//	СЛАЙДЕРЫ
	// =================================================
	var sliderReviews = $(".about-box .block-reviews .slider").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navText: false,
		dots: false,
		smartSpeed: 800,
		margin:20,
		touchDrag: true,
		autoHeight: false,
	});



	//	ВЫПАДАШКИ
	// =================================================
	$(".ask-pop").on("click", function(e){
		e.preventDefault()
		$(this).toggleClass("active")
		$(this).parent().parent().find(".ask-pop-text").slideToggle()
	});

	$(".more a.big").on("click", function(e){
		e.preventDefault()
		$(".menu-big").stop().fadeOut()
		$(".more a.big").removeClass("active")

		if(!$(this).closest(".js-show-info").find(".menu-big:visible").length) {
			$(this).addClass("active")
		}
		$(this).closest(".js-show-info").find(".menu-big").stop().fadeToggle(300)
	});



	// КАСТОМНЫЙ СЕЛЕКТ
	// ==================================================		
	// Открытие/закрытие
	$('.select-wrap .select').click(function() {
		var select_wrap = $(this).closest('.select-wrap');
		var option_list = select_wrap.find('.option-list');
		$(".select-wrap .select").removeClass("active")

		if (option_list.is(':visible')){
			option_list.slideUp('fast');
			$(this).removeClass('active');
		} else {
			if ($('.select-wrap .option-list:visible').length){
				$('.select-wrap .option-list:visible').hide();
			}
			option_list.slideDown('fast');
			$(this).addClass('active');
		}
	});

	// Выбор элемента
	$('.select-wrap .option-list li').click(function() {
		var title = $(this).closest('.select-wrap').find('.select .title');
		var option = $(this).html();
		$(this).closest('.select-wrap').find('input[type=hidden]').val($(this).attr('data-value'));
		$(this).closest('.select-wrap').find("li").removeClass("active")
		$(this).addClass("active")
		title.empty();
		title.html(option);
		$(this).closest('.option-list').slideUp(300);
		$(this).closest('.select-wrap').find('.select').removeClass('active');
	});

	// Закрытие по клику в любой части экрана
	$(document).click(function(e){
		if ($('.select-wrap .option-list:visible').length && !$(e.target).closest('.select-wrap').length){
			$('.select-wrap .option-list').slideUp(300);
			$('.select-wrap .select').removeClass('active');
		}
		// Info
		if ($('.menu-big:visible').length && !$(e.target).closest('.js-show-info').length){
			$(".menu-big").fadeOut(300)
			$(".js-show-info a.big").removeClass("active")
		}
	});

	// Закрытие по клавише Esc 
	$(document).keyup(function(e){
		if (e.keyCode == 27) {
			$('.select-wrap .option-list').slideUp(300);
			// Info
			$(".menu-big").fadeOut(300)
			$(".more a.big").removeClass("active")
			// Ask for photo
			$(".ask-pop-text").fadeOut(300)
		}
	});


	// Запускаем карту
	// map.js
	// ==================================================	
	initializeMap();



	// ФИКСИРОВАННАЯ ШАПКА
	// ==================================================			
	function checkFixed(){
		var headerHeight = $("header").outerHeight();
		var searchHeight = $(".topfilter").outerHeight();
		if ($(".topfilter")[0]) {
			var search_elem_offset = $(".topfilter").offset().top;
		}

		// If windows size is not enought
		if ($(window).height() <= 750 || $(window).width() < 1360) {

			$('header').removeClass("header-fixed")
			$('main').css({paddingTop:0});
			
			if ($(".topfilter")[0]) {
				var search_elem_offset = $(".topfilter").offset().top;
				$(".topfilter").removeClass("topfilter-fixed").css({top:0})
			}
		} else {
			// If windows size is good size
			$('header').addClass("header-fixed")
			
			$('main').css({
				paddingTop:headerHeight
			});

			if ($(".topfilter")[0]) {
				if($(window).scrollTop()+headerHeight >= search_elem_offset) {
					$(".topfilter").addClass("topfilter-fixed").css({top:headerHeight});
					$('main').css({
						paddingTop:headerHeight+searchHeight
					});
				}
			}

			$(window).scroll(function () {
				var scrollPadding = $(window).scrollTop()+headerHeight;

				// Scroll get search position
				if (search_elem_offset <= scrollPadding) {
					// Header fixed
					if ($('header').css('position') == 'fixed') {
						$(".topfilter").addClass("topfilter-fixed").css({top:headerHeight})
						$('main').css({paddingTop:headerHeight+searchHeight});
					}
				} else {
					if ($('header').css('position') == 'fixed') {
						$(".topfilter").removeClass("topfilter-fixed").css({top:0})
						$('main').css({paddingTop:headerHeight});
					}
				}
			});
		}
	};
	// Run checkFixed
	checkFixed();
	$(window).on('resize', checkFixed);
});

