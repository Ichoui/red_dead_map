$(document).ready(function () {
    // Remove ads
    $('a[href="http://leafletjs.com"]').closest('.leaflet-bottom').remove();

    const controlBar = $('.leaflet-control-container');
    const zoom = $('.leaflet-left');
    controlBar.addClass('leaflet-control-layers-expanded');

    // Déplace la div avec les groupes vers le menu de gauche
    // PUIS re-déplace une sous partie de ce groupe (le Zoom) vers la Map
    $('#menu-panel').append(controlBar);
    $('#map').append(zoom)


    $('.leaflet-control-layers-toggle').remove(); // layer image toogle

});