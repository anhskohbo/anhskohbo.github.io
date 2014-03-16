$(function() {

    // Magnific Popup
    var magnific = $('.content a').filter(function() {
        if (typeof $(this).attr('href') === 'undefined') return false;
        return $(this).attr('href').match(/\.(jpg|jpeg|png|gif)/i);
    }).magnificPopup({type: 'image', closeOnContentClick: true });

});
