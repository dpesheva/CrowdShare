define(['jquery', 'mustache', 'http-requester', 'url'], function ($, mustache, request, rootUrl) {
    function loadMessages(number) {
        var partialData = [];

        request.getJSON(rootUrl + 'post')
            .then(function (data) {
                if (number) {
                    partialData = data.slice(number).reverse();
                } else {
                    partialData = data.slice(0);
                }

                var templateString = $('#msg-template').html();
                var template = mustache.compile(templateString);
                var templatedMessage = template({ posts: partialData });
               
                //var messageList = $('<ul />').addClass('message-list');
                //var templateString = $('#msg-template').html();
                //var template = mustache.compile(templateString);
                //for (var i in partialData) {
                //    var message = partialData[i];
                //    var templatedMessage = template(message);
                //    var messageItem =
                //        $('<li />')
                //            .addClass('message-item')
                //                .html(templatedMessage);
                //    messageList.append(messageItem);
                //}
                $('#msg-container').html(templatedMessage);
                console.log(templatedMessage);
            }
            , function (err) {
                $('#msg-container').html(err);
            })
    }

    function getFixedNumerOfMessages() {

    }

    function getMessagesByUser() {

    }

    return {
        loadMessages: loadMessages,
        getFixedNumerOfMessages: getFixedNumerOfMessages,
        getMessagesByUser: getMessagesByUser
    };
});