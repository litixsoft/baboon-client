'use strict';

module.exports = function () {
    var pub = {};
    var SessionError = require('./errors').SessionError;

    var sender = function(status, result, res) {
        var json = JSON.stringify(result);
        res.set('Content-Type', 'application/json');
        res.send(status, json);
    };

    pub.checkSession = function (req, res, callback) {
        // check if session exists
        if (req.session.hasOwnProperty('activity')) {

            // session not exists, start new guest session
            req.session.activity = new Date();
            req.session.start = new Date();
            req.session.user = {id: -1, name: 'guest'};
            callback();

        } else {
            // session ok, renewal activity time
            req.session.activity = new Date();
            callback();
        }
    };

    // check session and set activity
    pub.setActivity = function (req, res) {
        pub.checkSession(req, res, function () {
            sender(200, true, res);
        });
    };

    // get last activity
    pub.getLastActivity = function (req, res) {

        if (!req.session.hasOwnProperty('activity')) {
            pub.checkSession(req, res, function() {
                sender(200, req.session.activity, res);
            });
        }
        else {
            sender(200, req.session.activity, res);
        }
    };

    // get session data
    pub.getData = function (req, res) {
        if (!req.session.data) {
            req.session.data = {};
        }

        var key = req.body.key,
            obj = {};

        if (typeof key === 'undefined') {
            obj = req.session.data;
        } else {
            // check own key
            if (!req.session.data.hasOwnProperty(key)) {
                return sender(400, new SessionError(key + ' not found in session', 400), res);
            } else {
                obj[key] = req.session.data[key];
            }
        }

        return sender(200, obj, res);
    };

    // set session data
    pub.setData = function (req, res) {

        if (!req.session.data) {
            req.session.data = {};
        }

        // save key value in session
        req.session.data[req.body.key] = req.body.value;

        sender(200, req.body.key + ' is saved in session', res);
    };

    // delete session data
    pub.deleteData = function (req, res) {
        if (!req.session.data) {
            req.session.data = {};
        }

        var key = req.body.key;

        if (typeof key === 'undefined') {
            req.session.data = {};
            return sender(200, 'container session.data deleted', res);
        }

        // check own key
        if (!req.session.data.hasOwnProperty(key)) {
            return sender(400, new SessionError(key + ' not found in session', 400), res);
        }
        else {
            // delete key value in session
            delete req.session.data[key];
            return sender(200, key + ' is deleted in session', res);
        }
    };

    return pub;
};

