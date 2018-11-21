$(document).ready(function () {
    // declare Map object
    let map = L.map('map').setView([0, 0],3);
    L.tileLayer('/resources/img/map/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 6,
        zoomSnap: 0.2,
        noWrap: true,

    }).addTo(map);

});