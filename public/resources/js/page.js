$(document).ready(function () {
    // REMOVE ZONE
    $('a[href="http://leafletjs.com"]').closest('.leaflet-bottom').remove(); // Remove ads
    $('.leaflet-control-layers-toggle').remove(); //  image layer dont on n'a pas besoin

    /*
    * CONTROL BAR (ZOOM/ FULLSCREEN/ MOVING DIV FROM MAP CONTAINER TO MENU CONTAINER
    * AND THEN FROM MENU CONTAINER TO MAP CONTAINER AGAIN
    */
    const controlBar = $('.leaflet-control-container');
    const zoom = $('.leaflet-left');
    const menu = $('#menu-panel');
    controlBar.addClass('leaflet-control-layers-expanded');
    // Déplace la div avec les groupes vers le menu de gauche
    // PUIS re-déplace une sous partie de ce groupe (le Zoom) vers la Map
    menu.append(controlBar);
    $('#map').append(zoom);
    menu.append($('.copyrights')); // replace copyright div in last position

    // Disabled elements left menu
    const label = $('.leaflet-control-layers-overlays span.state');
    label.addClass('disabled');
    $(label).on('click', function () {
        console.log($(this));
        $(this).toggleClass('disabled');
    });

    // Connexion
    $('.login').on('click', function () {
       $('.popup.connexion').show();
    });
    $('.register').on('click', function () {
        $('.popup.enregistrer').show();
    });
    $('.close-popin').hide();
});