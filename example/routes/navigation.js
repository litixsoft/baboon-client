'use strict';



exports.getTopList = function (req, res) {
    res.send(200, [
        { title: 'Home', route: '/nav-home', app: 'unitTest', level: 0 },
        { title: 'Admin', route: '/nav-admin', app: 'unitTest', level: 1 }
    ]);
};

exports.getSubList = function (req, res) {

    var a = req.headers.referer;

    if (a.indexOf('nav-home') > -1) {
        res.send(200, [
            { title: 'Products', route: '/nav-home/nav-products', app: 'unitTest', level: 0 },
            { title: 'Customers', route: '/nav-home/nav-customers', app: 'unitTest', level: 1 },
            { title: 'Statistics', route: '/nav-home/nav-statistics', app: 'unitTest', level: 1 }
        ]);
    } else {
        res.send(200, [
            { title: 'Rights', route: '/nav-admin/nav-rights', app: 'unitTest', level: 0 },
            { title: 'Groups', route: '/nav-admin/nav-groups', app: 'unitTest', level: 0 },
            { title: 'Users', route: '/nav-admin/nav-users', app: 'unitTest', level: 1 }
        ]);
    }
};
