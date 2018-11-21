$(document).ready(function () {

    // #####################  MAP DECLARATION  #####################
    // declare Map object
    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer('/resources/img/map/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 6,
        noWrap: true,
        crs: L.CRS.simple

    }).addTo(map);

    // Pour définir les limites max de la map
    let mapSW = [0, 16128],
        mapNE = [16128, 0];
    map.setMaxBounds(new L.LatLngBounds(
        map.unproject(mapSW, map.getMaxZoom()),
        map.unproject(mapNE, map.getMaxZoom())
    ));

    // #####################  ICONS  #####################
    window.icons = {};
    let icons = window.icons;

    icons.collectibleTest = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [24, 24]});
    icons.iconToto = L.icon({iconUrl: '/resources/img/thomas-marker.png', iconSize: [24, 24]});
    icons.iconPetit = L.icon({iconUrl: '/resources/img/morgan-marker.png', iconSize: [24, 24]});
    icons.iconGG = L.icon({iconUrl: '/resources/img/gaetan-marker.png', iconSize: [24, 24]});

    let iconsLength = Object.keys(icons).length; // obtenir length du json array icons

    // #####################  MARQUEURS DEVELOPPEUR  #####################
    //// 8192 8192 = milieu parfait en pixel
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


    // #####################  GROUPES DE COLLECTIBLES #####################
    var os = L.layerGroup([]);
    var sculptures = L.layerGroup([]);


    // #####################  MARKERS COLLECTIBLES  #####################

    function customMarker(x, y, icon, group, message) {
        console.log(icon);
        L.marker(map.unproject([x, y], map.getMaxZoom()), {icon: icon}).addTo(group).bindPopup(message);
    }

    customMarker(11225,12245, icons.iconPetit, os, "aaaaaa");
    customMarker(11225,8500, icons.iconPetit, sculptures, "aaaaaa");

    // L.marker(map.unproject([11225, 7004], map.getMaxZoom()), {icon: icons.collectibleTest}).addTo(sculptures).bindPopup('sculpture');
    // L.marker(map.unproject([10220, 7004], map.getMaxZoom()), {icon: icons.collectibleTest}).addTo(os).bindPopup('Mon os');


    // #####################  AJOUTER LES GROUPES A LA MAP  #####################
    var overlays = {
        "Os de dinosaures": os,
        "Sculptures": sculptures
    };
    L.control.layers(null, overlays).addTo(map);

});