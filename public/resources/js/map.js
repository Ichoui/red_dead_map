$(document).ready(function () {
    // declare Map object
    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer('/resources/img/map/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 6,
        noWrap: true,

    }).addTo(map);

    var collectibleTest = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [24, 24]});
    var marker = L.marker([0, 0], {icon: collectibleTest}).addTo(map);
    marker.bindPopup();

    marker.on('click', function (e) {
        console.log(marker.getLatLng().toString());
        marker.getPopup().setContent('Coord : ' + marker.getLatLng().toString()).openOn(map);
    });


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