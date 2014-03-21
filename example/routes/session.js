'use strict';

module.exports = function () {
    var pub = {};

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
            // send ok
            res.json(200,{});
        });
    };

    // get last activity
    pub.getLastActivity = function (req, res) {

        if (!req.session.hasOwnProperty('activity')) {
            pub.checkSession(req, res, function() {
                res.json(200, {activity:req.session.activity});
            });
        }
        else {
            res.json(200, {activity:req.session.activity});
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
                res.json(400, key + ' not found in session');
                return;
            } else {
                obj[key] = req.session.data[key];
            }
        }

        res.json(200, obj);
    };

    // set session data
    pub.setData = function (req, res) {

        if (!req.session.data) {
            req.session.data = {};
        }

        // save key value in session
        req.session.data[req.body.key] = req.body.value;

        res.json(200, req.body.key + ' is saved in session');
    };

    // delete session data
    pub.deleteData = function (req, res) {
        if (!req.session.data) {
            req.session.data = {};
        }

        var key = req.body.key;

        if (typeof key === 'undefined') {
            req.session.data = {};
            res.json(200, 'container session.data deleted');
            return;
        }

        // check own key
        if (!req.session.data.hasOwnProperty(key)) {
            res.json(400, key + ' not found in session');
        }
        else {
            // delete key value in session
            delete req.session.data[key];
            res.json(200, key + ' is deleted in session');
        }
    };

    return pub;
};

