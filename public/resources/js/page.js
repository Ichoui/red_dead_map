$(document).ready(function () {
    // REMOVE ZONE
    $('a[href="http://leafletjs.com"]').closest('.leaflet-bottom').remove(); // Remove ads
    $('.leaflet-control-layers-toggle').remove(); //  image layer dont on n'a pas besoin

    // GESTION DE LA CONTROL BAR
    const controlBar = $('.leaflet-control-container');
    const zoom = $('.leaflet-left');
    controlBar.addClass('leaflet-control-layers-expanded');
    // Déplace la div avec les groupes vers le menu de gauche
    // PUIS re-déplace une sous partie de ce groupe (le Zoom) vers la Map
    $('#menu-panel').append(controlBar);
    $('#map').append(zoom);


    const label = $('.leaflet-control-layers-overlays label');
    label.addClass('disabled');
});