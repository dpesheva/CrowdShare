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
            'users': 'AppScripts/Control/users',
            'events': 'AppScripts/Control/eventHandlers',
            'menu': 'AppScripts/UI/menu',
            'messages': 'AppScripts/AccessRestAPI/messages',
            'http-requester': 'AppScripts/AccessRestAPI/http-requester',
            'url': 'AppScripts/AccessRestAPI/url'
        }
    })

    require(['jquery', 'sammy', 'users', 'events', 'messages', 'url', 'menu'],
                     function ($, sammy, users, events, messages, rootUrl, menu) {

                         events.attachEventHandlers();
                         menu.initialize();

                         var app = sammy('#main-content', function () {
                             this.get('#/', function () {
                                 $('#main-content').html('');
                             });

                             this.get('#/user/logout', function () {
                                 this.redirect('#/user');
                             });

                             this.get('#/user', function () {
                                 //if the user is logged -> logout and show Login screen
                                 if (users.isUserLoggedIn()) {
                                     this.partial('PartialHTMLs/login.html');
                                 } else {
                                     this.partial('PartialHTMLs/register.html');
                                 }

                             });

                             this.get('#/auth', function () {
                                 this.partial('PartialHTMLs/login.html');

                             });

                             this.get('#/post', function () {
                                 this.partial('PartialHTMLs/messages.html');
                                 messages.loadMessages();

                                 //POST req to create a new post
                                 //or
                                 //Get to get all/filltered posts from the server
                             });
                         });

                         app.run('#/');

                     });
}());