$(document).ready(function () {
    let mapSW = [0, 16128],
        mapNE = [16128, 0];

    // declare Map object
    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer('/resources/img/map/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 6,
        noWrap: true,
        crs: L.CRS.simple

    }).addTo(map);

    map.setMaxBounds(new L.LatLngBounds(
        map.unproject(mapSW, map.getMaxZoom()),
        map.unproject(mapNE, map.getMaxZoom())
    ));

    // icons
    var collectibleTest = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [24, 24]});

    // markers
    // 0 0 = milieu parfait en latlng
    var marker = L.marker([0, 0], {icon: collectibleTest}).addTo(map);
    marker.bindPopup();
    $(marker).on('dragend', function () {
        marker.getPopup().setContent('Coord : ' + marker.getLatLng().toString()).openOn(map);
    });

    //// 8192 8192 = milieu parfait en pixel
    var markerPixel = L.marker(map.unproject([8192, 8192], map.getMaxZoom()), {icon: collectibleTest, draggable: true}).addTo(map);
    markerPixel.bindPopup();
    $(markerPixel).on('dragend', function () {
        markerPixel.getPopup().setContent('Coord : ' + markerPixel.getLatLng().toString() + '<br>'+
        'Pixels : ' + map.project(markerPixel.getLatLng(), map.getMaxZoom().toString())).openOn(map);
    });



    /////////////////////////////////////////////////////////////////
    // marqueurs perso pour placer l'élément ?
    // Un pour chaque dev avec couleurs specs
    var markerMorgan = L.marker([50, 0], {icon: collectibleTest, draggable: true}).addTo(map);
    markerMorgan.bindPopup('Marqueur Morgan');

    $(markerMorgan).on('dragend', function (e) {
        console.log(markerMorgan.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerMorgan.getLatLng(), map.getMaxZoom().toString()))
    });

    //////////////////////////////////////////////////////////////////////// On sépare, on verra + tard
    window.icons = {};
    window.markers = {};
    var icons = window.icons;
    var markers = window.markers;

    icons.collectibleTest = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [38, 95]});
    icons.collectdouble = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [38, 95]});
    var iconsLength = Object.keys(icons).length; // obtenir length du json array icons


// mapping json to array
    var arr = $.map(icons, function (el) {
        return el
    });

    for (var i = 0; i < iconsLength; i++) {
        // console.log(arr[i].options);
        var x = arr[i].options.iconSize[0];
        var y = arr[i].options.iconSize[1];
        var url = arr[i].options.iconUrl;
        // console.log(L.marker([x, y]).addTo(map));
    }


});