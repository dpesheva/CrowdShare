define(['jquery', 'users'], function ($, users) {
    function attachEventHandlers() {
        var wrapper = $('#main-content');

        wrapper.on('click', '#login-form #btn-login', function () {
            var username = $('#tb-login-username').val();
            var password = $('#tb-login-password').val();
            var user = {
                username: username,
                password: password
            };

            users.login(user, function () {
                $('#login-form').find('p.error').remove();
                $('#nav-btn-login').hide();
                $('#nav-btn-logout').show();
            }, function (message) {
                $('<p>').addClass('error').text(message);
            });

            return false;
        });

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

        wrapper.on('click', '#nav-btn-logout', function () {
            users.logout(function () {
                $('#profile').find('p.error').remove();
                $('#nav-btn-login').show();
                $('#nav-btn-logout').hide();
            }, function (message) {
                $('<p>').addClass('error').text(message);
            });

            return false;
        });

        wrapper.on('click', '#btn-filter', function () {
            var url = window.location.href;
            //var url = document.location.search;
            var username = $('#user-id').val();
            var pattern = $('#patern').val();

            if (username) {
                document.location.search = '?user=' + username.toLowerCase();
            }

            if (pattern) {
                document.location.search = '?pattern=' + pattern.toLowerCase();
            }

            //window.location.href = url;
            //document.location.search = url;

        })
    }

    return {
        attachEventHandlers: attachEventHandlers
    }
})