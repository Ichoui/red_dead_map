$(document).ready(function () {
    // Remove ads
    $('a[href="http://leafletjs.com"]').closest('.leaflet-bottom').remove();

    $('.leaflet-control-container').addClass('leaflet-control-layers-expanded');
});