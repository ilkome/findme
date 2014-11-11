// Функция инициализации карты
function initializeMap() {
	// проверяем есть ли карта на странице
	if ( $('#map').length) {
		// ресайзим враппер при загрузке и ресайзе окна
		$('.map-wrapper').height( $('body').height() - $('footer').height() - $('header').height() );	
		
		$(window).on('resize', function() {
			$('.map-wrapper').height( $('body').height() - $('footer').height() - $('header').height() );	
		})
		// стилизация карты
		findmeStyle = [
			{
					"featureType": "water",
					"stylers": [
							{
									"color": "#46bcec"
							},
							{
									"visibility": "on"
							}
					]
			},
			{
					"featureType": "landscape",
					"stylers": [
							{
									"color": "#f2f2f2"
							}
					]
			},
			{
					"featureType": "road",
					"stylers": [
							{
									"saturation": -100
							},
							{
									"lightness": 45
							}
					]
			},
			{
					"featureType": "road.highway",
					"stylers": [
							{
									"visibility": "simplified"
							}
					]
			},
			{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
							{
									"visibility": "off"
							}
					]
			},
			{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
							{
									"color": "#444444"
							}
					]
			},
			{
					"featureType": "transit",
					"stylers": [
							{
									"visibility": "off"
							}
					]
			},
			{
					"featureType": "poi",
					"stylers": [
							{
									"visibility": "off"
							}
					]
			}
		];
		// стиль балуна
		var icon = 'img/baloon.png';

		// настройки карты
		// опции включаем по вкусу
		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(55.753584, 37.622453),
			panControl: false,
			zoomControl: true,
			scaleControl: true,
			// scrollwheel: false,
			navigationControlOptions: { style: 'SMALL' },
			disableDefaultUI: true,
			// minZoom: 10,
			// maxZoom: 17,
			styles: findmeStyle
		};

		// создадим карту с нашими настройками
		map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// получаем координаты балуна
		var myLatlng = new google.maps.LatLng(55.753584, 37.622453);

		// добавляем данные в маркер
		var marker = new google.maps.Marker({
			position: myLatlng,
			icon: {
				url: icon,
			},
			animation: google.maps.Animation.DROP,
			title:'Медицинская Академия имени Шмелева',
			adress: 'Ул Кольская, дом 2, корпус 3',
			phone: '8 800 460 30 20',
			website: ['http://www.mosgorzdrav.ru','www.mosgorzdrav.ru'],
			readmore: 'http://www.mosgorzdrav.ru'
		});

		// Добавляем маркер
		marker.setMap(map);

		// Готовим контент для bubble
		infoWindowOptions = '<div class="info-window"><div class="info-window-header"><h2 id="firstHeading">' + marker.title + '</h2></div>'+
		'<div id="bodyContent" class="info-window-body"><p><i class="icon-baloon-small"></i><span>' + marker.adress + 
		'</span></p><p><i class="icon-phone"></i><span>' + marker.phone + '</span></p></div><div class="info-window-footer">' + 
		'<p><i class="icon-web"></i><a href="' + marker.website[0] + '">' + marker.website[1] + '</a>' +
		'<br><br><a class="button" href="' + marker.readmore + '">Подробнее</a></p></div></div></div>';
	 

		// Используем кастомный бабл
		// стилизация
		var infoBubble2 = new InfoBubble({
			map: map,
			content: infoWindowOptions,
			shadowStyle: 0,
			padding: 0,
			backgroundColor: '#fff',
			borderRadius: 7,
			borderWidth: 0,
			borderColor: 'transparent',
			disableAutoPan: false,
			hideCloseButton: true,
			arrowPosition: 50,
			backgroundClassName: 'findme',
			arrowStyle: 0,
			arrowSize: 15,
		});
	 
		// открываем бабл по клику
		google.maps.event.addListener(marker, 'click', function() {
			if (!infoBubble2.isOpen()) {
				infoBubble2.open(map, marker);
			}
		});

		// слушаем открытие bubble и добавляем тень при открытии
		google.maps.event.addListener(infoBubble2, 'domready', function() {
			var l = $('.findme').parent().parent();
			l.css('box-shadow', '0 0 30px 0 rgba(0,0,0,0.2)');
		});
	

	} else {
		// do something here
	}
}