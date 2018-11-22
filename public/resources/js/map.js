$(document).ready(function () {

    // #####################  MAP DECLARATION  #####################
    // Map object declaration
    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer('/resources/img/map/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 6,
        noWrap: true,
        crs: L.CRS.simple,

    }).addTo(map);
    map.addControl(new L.Control.Fullscreen());

    // Borders (in px) of our map
    let mapSW = [0, 16128],
        mapNE = [16128, 0];
    map.setMaxBounds(new L.LatLngBounds(
        map.unproject(mapSW, map.getMaxZoom()),
        map.unproject(mapNE, map.getMaxZoom())
    ));

    // #####################  ICONS  #####################
    window.icons = {};
    let icons = window.icons;

    // icons users
    icons.iconPetit = L.icon({iconUrl: '/resources/img/markers/morgan-marker.png', iconSize: [24, 24]});
    icons.iconToto = L.icon({iconUrl: '/resources/img/markers/thomas-marker.png', iconSize: [24, 24]});
    icons.iconGG = L.icon({iconUrl: '/resources/img/markers/gaetan-marker.png', iconSize: [24, 24]});
    // icons
    icons.iconTest = L.icon({iconUrl: '/resources/img/markers/marker-icon.png', iconSize: [24, 24]});

    // #####################  USERS MOVABLE MARKERS  #####################
    //// 8192 8192 = perfect map middle (in pixel)
    let markerMorgan = L.marker(map.unproject([8192, 8192], map.getMaxZoom()), {icon: icons.iconPetit, draggable: true}).addTo(map).bindPopup('Marqueur Morgan');
    $(markerMorgan).on('dragend', function (e) {
        console.log(markerMorgan.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerMorgan.getLatLng(), map.getMaxZoom().toString()))
    });

    let markerGaetan = L.marker(map.unproject([5000, 5000], map.getMaxZoom()), {icon: icons.iconGG, draggable: true}).addTo(map).bindPopup('Marqueur Gaetan');
    $(markerGaetan).on('dragend', function (e) {
        console.log(markerGaetan.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerGaetan.getLatLng(), map.getMaxZoom().toString()))
    });

    let markerThomas = L.marker(map.unproject([6000, 6000], map.getMaxZoom()), {icon: icons.iconToto, draggable: true}).addTo(map).bindPopup('Marqueur Thomas');
    $(markerThomas).on('dragend', function (e) {
        console.log(markerThomas.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerThomas.getLatLng(), map.getMaxZoom().toString()))
    });

    // #####################  MARKERS FUNCTION  #####################
    function customMarker(x, y, icon, group, message) {
        L.marker(map.unproject([x, y], map.getMaxZoom()), {icon: icon}).addTo(group).bindPopup(message);
    }


    // #####################
    // HERE IS THE MAIN PART TO UPDATE
    // WITH CUSTOMS X - Y AXES / ICON / GROUP / MESSAGE
    // #####################

    // #####################  COLLECTIBLE GROUPS #####################
    let os = L.layerGroup([]);
    let sculptures = L.layerGroup([]);

    // #####################  MARKERS COLLECTIBLES  #####################
    /**
     * customMarker @args
     * @arg1 : Axe X
     * @arg2 : Axe Y
     * @arg3 : Icon
     * @arg4 : Collectible group
     * @arg15: Message to show in popup
     */

    // GROUP : DINOSAURES
    customMarker(11225, 12245, icons.iconTest, os, "aaaaaa");

    // GROUP : SCULPTURES
    customMarker(11225, 8500, icons.iconTest, sculptures, "aaaaaa");


    // #####################  ADD GROUPS TO THE MAP OBJECT  #####################
    const overlays = {
        "<span class='iconic icon-bone'></span>Os de dinosaures": os,
        "<span class='iconic icon-statue'></span>Sculptures": sculptures
    };
    L.control.layers(null, overlays).addTo(map);

});