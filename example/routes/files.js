'use strict';
var fs = require('fs');

module.exports = function () {
    var pub = {};

    pub.getMarkdown = function (req, res) {

        var data = req.body;
        var file = data.file+"."+data.lang+"-"+data.lang+"."+data.type;

        fs.readFile(file, 'utf8', function (err,data) {
            if (err) {
                callback(err);
                res.json(404,'File not found');
            }

            var tmp = {
                title: file,
                markdown: data
            };

            res.send(200,tmp);
        });
    };

    return pub;
};