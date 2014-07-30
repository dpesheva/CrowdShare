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
            'url': 'AppScripts/url'
        }
    })

    require(['jquery', 'sammy', 'http-requester', 'users', 'events', 'messages', 'url'],
                     function ($, sammy, request, users, events, messages, rootUrl) {

                         events.attachEventHandlers();

                         var app = sammy('#main-content', function () {
                             this.get('#/', function () {
                                 $('#main-content').html('');
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