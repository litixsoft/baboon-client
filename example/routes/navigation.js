'use strict';

var isHome = true;

exports.getTopList = function (req, res) {
    res.send(200, [
        { title: 'Home', route: '/nav-home', app: 'unitTest', level: 0 },
        { title: 'Admin', route: '/nav-admin', app: 'unitTest', level: 1 }
    ]);
};

exports.getSubList = function (req, res) {
    isHome = !isHome;

    if (isHome) {
        res.send(200, [
            { title: 'Products', route: '/', app: 'unitTest', level: 0 },
            { title: 'Customers', route: '/', app: 'unitTest', level: 1 },
            { title: 'Statistics', route: '/', app: 'unitTest', level: 1 }
        ]);
    } else {
        res.send(200, [
            { title: 'Rights', route: '/', app: 'unitTest', level: 0 },
            { title: 'Groups', route: '/', app: 'unitTest', level: 0 },
            { title: 'Users', route: '/', app: 'unitTest', level: 1 }
        ]);
    }
};
