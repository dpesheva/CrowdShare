/// <reference path="menu.js" />
define(['jquery', 'users', 'menu'], function ($, users, menu) {
    function attachEventHandlers() {
        var wrapper = $('#main-content');
        var header = $('#main-header');

        wrapper.on('click', '#login-form #btn-login', function () {
            var username = $('#tb-login-username').val();
            var password = $('#tb-login-password').val();
            var user = {
                username: username,
                password: password
            };

            users.login(user, function () {
                $('#login-form').find('p.error').remove();
                menu.loggedUser();
            }, function (message) {
                var errorTag = $('<p>').addClass('error').text(message);
                $('#login-form').append(errorTag);
            });

            return false;
        });

        wrapper.on('click', '#register-form #btn-register', function () {
            var username = $('#tb-reg-username').val();
            var password = $('#tb-reg-password').val();
            var user = {
                username: username,
                password: password
            };

            users.register(user, function () {
                $('#register-form').find('p.error').remove();
            }, function (message) {
                var errorTag = $('<p>').addClass('error').text(message);
                $('#register-form').append(errorTag);
            });
            return false;
        });

        header.on('click', '#nav-btn-logout', function () {
            users.logout(function () {
                $('#main-content').find('p.error').remove();
                menu.initialize();
            }, function (message) {
                var errorTag = $('<p>').addClass('error').text(message);
                $('#main-content').append(errorTag);
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