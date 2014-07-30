/// <reference path="libs/require.js" />
/// <reference path="libs/sammy-0.7.4.js" />
/// <reference path="libs/jquery-2.0.3.js" />

(function () {

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.3.min',
            'mustache': 'libs/mustache',
            'sammy': 'libs/sammy-0.7.4',
            'rsvp': 'libs/rsvp.min',
            'sha1': 'libs/sha1',
            'underscore': 'libs/underscore-min',
            'http-requester': 'libs/http-requester',
            'users': 'AppScripts/users',
            'events': 'AppScripts/eventHandlers',
            'messages': 'AppScripts/messages',
        }
    })

    require(['jquery', 'sammy', 'http-requester', 'users', 'events', 'messages'],
                     function ($, sammy, request, users, events, messages) {

                         var rootUrl = 'http://jsapps.bgcoder.com/';

                         events.attachEventHandlers();

                         var app = sammy('#main-content', function () {
                             this.get('#/', function () {
                                 $('#main-content').html('');
                             });

                             this.get('#/user', function () {
                                 //if the user is logged -> logout and how Login screen
                                 if (users.isUserLoggedIn()) {
                                     users.logout(rootUrl,
                                         function () {
                                             $('#profile').find('p.error').remove();
                                         }, function (message) {
                                             $('<p>').addClass('error').text(message);
                                         });
                                     this.partial('PartialHTMLs/login.html');
                                 } else {
                                     this.partial('PartialHTMLs/register.html');
                                 }

                             });

                             this.get('#/auth', function () {
                                 this.partial('PartialHTMLs/login.html');
                                 var username = $('#tb-login-username').val();
                                 var password = $('#tb-login-password').val();
                                 var user = {
                                     username: username,
                                     password: password
                                 };

                                 users.login(user, rootUrl, function () {
                                     //TODO show Logout button
                                     $('#login-form').find('p.error').remove();
                                 }, function (message) {
                                     $('<p>').addClass('error').text(message);
                                 });
                             });

                             this.get('#/post', function () {
                                 this.partial('PartialHTMLs/messages.html');
                                 messages.loadMessages(rootUrl);

                                 //POST reg to create a new post
                                 //or
                                 //Get to get all/filltered posts from the server
                             });
                         });

                         app.run('#/');

                     });
}());