/// <reference path="require.js" />
/// <reference path="jquery-2.0.3.js" />
/// <reference path="rsvp.min.js" />

define(["jquery", "rsvp"], function ($) {
    $.ajaxSetup({
        beforeSend: function () {
            $("#loading").show();
        },
        complete: function () {
            $("#loading").hide();
        },
        cache: false
    });

    function getJSON(serviceUrl) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: serviceUrl,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function postJSON(serviceUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: serviceUrl,
                dataType: "json",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function putJSON(serviceUrl, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: serviceUrl,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }
    return {
        getJSON: getJSON,
        postJSON: postJSON,
        putJSON: putJSON
    }
});