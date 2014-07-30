define(['jquery', 'mustache', 'http-requester'], function ($, mustache, request) {
    function loadMessages(/*elementId,*/url, number) {
        var partialData = [];

        request.getJSON(url + 'post')
            .then(function (data) {
                if (number) {
                    partialData = data.slice(number).reverse();
                } else {
                    partialData = data.slice(0);
                }

                var messageList = $('<ul />').addClass('message-list');
                var templateString = $('#msg-template').html();
                var template = mustache.compile(templateString);
                for (var i in partialData) {
                    var message = partialData[i];
                    var templatedMessage = template(message);
                    var messageItem =
                        $('<li />')
                            .addClass('message-item')
                                .html(templatedMessage);
                    messageList.append(messageItem);
                }
                // $(elementId).html(messageList);
                $('#main-content').html(messageList);
            }
            , function (err) {
                $('#main-content').html(err);
            })
    }

    return {
        loadMessages: loadMessages
    };
});