define(['jquery', 'sha1', 'url', 'http-requester'], function ($, sha1, rootUrl, httpRequester) {

    var username = localStorage.getItem('username');
    var sessionKey = localStorage.getItem('sessionKey');

    function saveUserData(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('sessionKey', data.sessionKey);
        username = data.username;
        sessionKey = data.sessionKey;
    }

    function removeUserData() {
        localStorage.removeItem('username');
        localStorage.removeItem('sessionKey');
        username = null;
        sessionKey = null;
    }

    function isUserLoggedIn() {
        var n = username !== '' && username !== null && username !== undefined;
        var sk = sessionKey !== '' && sessionKey !== null && sessionKey !== undefined;
        return (n && sk) === true;
    }

    function register(user, success, error) {
        var url = rootUrl + 'user';
        var userData = {
            username: user.username,
            authCode: CryptoJS.SHA1(user.username + user.password).toString()
        };

        httpRequester.postJSON(url, userData)
            .then(function (data) {
                saveUserData(data);
                console.log('register result' + data);  //REMOVE
                success()
            }, function (err) {
                error(err.responseJSON.Message);
            });
    }

    function login(user, success, error) {
        var url = rootUrl + 'auth';
        var userData = {
            username: user.username,
            authCode: CryptoJS.SHA1(user.username + user.password).toString()
        };

        httpRequester.postJSON(url, userData)
            .then(function (data) {
                saveUserData(data);
                console.log('login result' + data);  //REMOVE
                success()
            }, function (err) {
                error(err.responseJSON.Message);
            });
    }

    function logout(success, error) {
        var url = rootUrl + 'user';
        var headers = {
            "X-sessionKey": sessionKey
        };

        httpRequester.putJSON(url, headers)
            .then(function () {
                removeUserData();
                success();
            }, function (err) {
                error(err.responseJSON.Message);
            });
    }

    return {
        isUserLoggedIn: isUserLoggedIn,
        register: register,
        login: login,
        logout: logout
    }
})