;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "axqIt1nKAC"							}), success: c, error: e});						}, cb  = function(section, $) {;var cb  = function($) {
    function loadGoogleMaps() {
        if(section.settings.map_api != ''){
            if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
                var mapScript = document.createElement('script');
                mapScript.src = "https://maps.googleapis.com/maps/api/js?key=" + section.settings.map_api;
                document.head.appendChild(mapScript);
            }
        }
    }

    loadGoogleMaps();

    function initMap() {
          var myLatLng = {
            lat: parseFloat(section.settings.map_lat),
            lng: parseFloat(section.settings.map_lng)
          };

          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: parseInt(section.settings.map_zoom),
            center: myLatLng,
          });

          var infoString = '<div class="lh-infowindow">'+ section.settings.map_info_box +'</div>';

          var infowindow = new google.maps.InfoWindow({
            content: infoString
          });

          var iconMarker = 'https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/Pe4MB6IC1TF5cpOQ/contact/assets/images/mapker.svg';
          if(section.settings.map_marker != ''){
            iconMarker = section.settings.map_marker;
          }

          var markerArgs = {
            position: myLatLng,
            map: map,
            icon: iconMarker,
            visible: true
          };

          if(section.settings.map_show_marker == 'no'){
            markerArgs.visible = false;
          }

          var marker = new google.maps.Marker(markerArgs);

          if(section.settings.map_style == 'style_2'){
            var customStyled = [{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#e9fefd"},{"saturation":-35},{"lightness":10},{"weight":1.5}]}];
            map.set('styles', customStyled);
          }
          if(section.settings.map_style == 'style_3'){
            var customStyled = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6e6e6e"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f4f4f4"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#d2ef9d"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#94dfed"},{"visibility":"on"}]}];
            map.set('styles', customStyled);
          }

          if(section.settings.map_show_marker == 'yes'){
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
          }

          if(section.settings.map_show_infobox == 'yes' || (section.settings.map_show_marker == 'no' && section.settings.map_show_infobox == 'yes')){
              google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
                infowindow.open(map, marker);
              });
          }

          if(section.settings.map_show_marker == 'no' && section.settings.map_show_infobox == 'yes'){
              google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
                  $('.lh-google-map-section').addClass('lh-hide-close-infobox');
              });
          }

          return map;
    }

    var timerLoadMap = setInterval(funcCheckLoadMap, 50);

    function funcCheckLoadMap(){
        if (typeof google === 'object' && typeof google.maps === 'object') {
            initMap();
            clearInterval(timerLoadMap);
        }
    }
 };						cb.bind($('section[data-section-id="axqIt1nKAC"]').get(0))(jQuery);};					cb.bind($('section[data-section-id="axqIt1nKAC"]').get(0))({						url: "https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/Pe4MB6IC1TF5cpOQ/contact/",						settings: {"map_api":"AIzaSyAwTCrwwb9tWoCs80-9I0nclABQR7_ayDE","map_lat":"41.0006933","map_lng":"29.0470746","map_zoom":"17","map_info_box":"<p><strong>Hasanpaşa Mahallesi  </strong></p><p><strong>Lavanta Sokak Etap İş Merkezi</strong><p><strong>C Blok Kat:3 Daire:10</strong></p><p><strong>info@vitacoral.com</strong></p><p><strong>Kadıköy/İstanbul</strong></p><!--lh-live-editor-->","map_marker":"https://cdn.shopify.com/s/files/1/0512/9414/2657/t/8/assets/32x32faviconvitacoral.png?v=1611833612","map_show_marker":"yes","map_style":"style_3","map_show_infobox":"yes"}					}, jQuery);})(jQuery);;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "cz2AbPnj4g"							}), success: c, error: e});						}, cb  = function(section, $) {};					cb.bind($('section[data-section-id="cz2AbPnj4g"]').get(0))({						url: "https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/Pe4MB6IC1TF5cpOQ/services/",						settings: {}					}, jQuery);})(jQuery);;console.log('This page layout has been built by https://www.layouthub.com');