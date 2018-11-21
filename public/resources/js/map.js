$(document).ready(function () {
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

    // icons
    let collectibleTest = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [24, 24]});
    let iconToto = L.icon({iconUrl: '/resources/img/thomas-marker.png', iconSize: [24, 24]});
    let iconPetit = L.icon({iconUrl: '/resources/img/morgan-marker.png', iconSize: [24, 24]});
    let iconGG = L.icon({iconUrl: '/resources/img/gaetan-marker.png', iconSize: [24, 24]});

    // #####################   MARKERS  #####################
    //// 8192 8192 = milieu parfait en pixel
    let markerPixel = L.marker(map.unproject([6500, 8192], map.getMaxZoom()), {icon: collectibleTest, draggable: true}).addTo(map).bindPopup();
    $(markerPixel).on('dragend', function () {
        markerPixel.getPopup().setContent('Marqueur Tutoriel <br>' +
            'Coord : ' + markerPixel.getLatLng().toString() + '<br>' +
            'Pixels : ' + map.project(markerPixel.getLatLng(), map.getMaxZoom().toString())).openOn(map);
        console.log(markerThomas.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerThomas.getLatLng(), map.getMaxZoom().toString()))
    });


    /////////////////////////////////////////////////////////////////
    // marqueurs perso pour placer l'élément ?
    // Un pour chaque dev avec couleurs specs
    let markerMorgan = L.marker(map.unproject([8192, 8192], map.getMaxZoom()), {icon: iconPetit, draggable: true}).addTo(map).bindPopup('Marqueur Morgan');
    $(markerMorgan).on('dragend', function (e) {
        console.log(markerMorgan.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerMorgan.getLatLng(), map.getMaxZoom().toString()))
    });

    let markerGaetan = L.marker(map.unproject([5000, 5000], map.getMaxZoom()), {icon: iconGG, draggable: true}).addTo(map).bindPopup('Marqueur Gaetan');
    $(markerGaetan).on('dragend', function (e) {
        console.log(markerGaetan.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerGaetan.getLatLng(), map.getMaxZoom().toString()))
    });

    let markerThomas = L.marker(map.unproject([6000, 6000], map.getMaxZoom()), {icon: iconToto, draggable: true}).addTo(map).bindPopup('Marqueur Thomas');
    $(markerThomas).on('dragend', function (e) {
        console.log(markerThomas.getLatLng().toString());
        console.log('Pixels : ' + map.project(markerThomas.getLatLng(), map.getMaxZoom().toString()))
    });


    //////////////////////////////////////////////////////////////////////// On sépare, on verra + tard
    window.icons = {};
    window.markers = {};
    let icons = window.icons;
    let markers = window.markers;

    icons.collectibleTest = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [38, 95]});
    icons.collectdouble = L.icon({iconUrl: '/resources/img/marker-icon.png', iconSize: [38, 95]});
    let iconsLength = Object.keys(icons).length; // obtenir length du json array icons


// mapping json to array
    let arr = $.map(icons, function (el) {
        return el
    });

    for (let i = 0; i < iconsLength; i++) {
        // console.log(arr[i].options);
        let x = arr[i].options.iconSize[0];
        let y = arr[i].options.iconSize[1];
        let url = arr[i].options.iconUrl;
        // console.log(L.marker([x, y]).addTo(map));
    }


});