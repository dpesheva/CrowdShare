define(['jquery', 'sha1', 'url', 'http-requester'], function ($, sha1, rootUrl, httpRequester) {

    var nickname = localStorage.getItem('nickname');
    var sessionKey = localStorage.getItem('sessionKey');

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

    function register(user, success, error) {
        var url = rootUrl + 'user';
        var userData = {
            username: user.username,
            nickname: user.nickname,
            authCode: CryptoJS.SHA1(user.username + user.password).toString()
        };

        httpRequester.postJSON(url, userData, function (data) {
            saveUserData(data);
            console.log('register result'+ data);  //REMOVE
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

        httpRequester.postJSON(url, userData, function (data) {
            saveUserData(data);
            console.log('login result' + data);  //REMOVE
            success()
        }, function (err) {
            error(err.responseJSON.Message);
        });
    }

    function logout(success, error) {
        var url = rootUrl + 'user';
        httpRequester.putJSON(url, function () {
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