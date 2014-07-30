define(['jquery'], function ($) {
    function initialize() {
        $('#nav-btn-login').show();
        $('#nav-btn-logout').hide();
        $('#nav-btn-register').show();
    }

    function loggedUser() {
        $('#nav-btn-login').hide();
        $('#nav-btn-logout').show();
        $('#nav-btn-register').hide();
    }

    return {
        initialize: initialize,
        loggedUser: loggedUser
    }
})