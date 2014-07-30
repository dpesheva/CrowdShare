define(['jquery', 'users'], function ($, users) {
    function attachEventHandlers() {
        var self = this;
        var wrapper = $('main-content');

        //wrapper.on('click', '#login-form #btn-login', function () {
        //    var username = $('#tb-login-username').val();
        //    var password = $('#tb-login-password').val();
        //    var user = {
        //        username: username,
        //        password: password
        //    };

        //    users.login(user, function () {
        //        //TODO show Logout button
        //        $('#login-form').find('p.error').remove();
        //    }, function (message) {
        //        $('<p>').addClass('error').text(message);
        //    });

        //    return false;
        //});

        //wrapper.on('click', '#login-form #btn-register-form', function () {
        //    self.loadRegisterUI();
        //    return false;
        //});

        wrapper.on('click', '#register-form #btn-register', function () {
            var username = $('#tb-reg-username').val();
            var nickname = $('#tb-reg-nickname').val();
            var password = $('#tb-reg-password').val();
            var user = {
                username: username,
                nickname: nickname,
                password: password
            };

            users.register(user, function () {
                $('#register-form').find('p.error').remove();
            }, function (message) {
                $('<p>').addClass('error').text(message);
            });
            return false;
        });

        //wrapper.on('click', '#register-form #btn-login-form', function () {
        //    self.loadLoginUI();
        //    return false;
        //});

        //wrapper.on('click', '#btn-logout', function () {
        //    users.logout(function () {
        //        //TODO show Login form
        //        $('#profile').find('p.error').remove();
        //    }, function (message) {
        //        $('<p>').addClass('error').text(message);
        //    });

        //    return false;
        //});

    }

    return {
        attachEventHandlers: attachEventHandlers
    }
})