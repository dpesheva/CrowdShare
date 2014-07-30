define(['jquery', 'sha1'], function ($, sha1) {

    var nickname = localStorage.getItem('nickname');
    var sessionKey = localStorage.getItem('sessionKey');
   // var rootUrl = 'http://localhost:3000/';

    function saveUserData(data) {
        localStorage.setItem('nickname', data.nickname);
        localStorage.setItem('sessionKey', data.sessionKey);
        nickname = data.nickname;
        sessionKey = data.sessionKey;
    }

    function removeUserData() {
        localStorage.removeItem('nickname');
        localStorage.removeItem('sessionKey');
        nickname = null;
        sessionKey = null;
    }

    function isUserLoggedIn() {
        var n = nickname !== '' && nickname !== null && nickname !== undefined;
        var sk = sessionKey !== '' && sessionKey !== null && sessionKey !== undefined;
        return (n && sk) === true;
    }

    function register(user, rootUrl, success, error) {
        var url = rootUrl + 'user';
        var userData = {
            username: user.username,
            nickname: user.nickname,
            authCode: CryptoJS.SHA1(user.username + user.password).toString()
        };

        httpRequester.post(url, userData, function (data) {
            saveUserData(data);
            success()
        }, function (err) {
            error(err.responseJSON.Message);
        });
    }

    function login(user, rootUrl, success, error) {
        var url = rootUrl + 'auth';
        var userData = {
            username: user.username,
            authCode: CryptoJS.SHA1(user.username + user.password).toString()
        };

        httpRequester.post(url, userData, function (data) {
            saveUserData(data);
            success()
        }, function (err) {
            error(err.responseJSON.Message);
        });
    }

    function logout(rootUrl, success, error) {
        //  var url = this.rootUrl + 'user/' + sessionKey;
        var url = rootUrl + 'user';
        httpRequester.put(url, function () {
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