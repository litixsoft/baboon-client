$bbcSession.getLastActivity(function(error, data) {
    if(error) {
        $log.error('ERROR:');
        $log.error(error);
    }
    else {
        var now = new Date(data.activity);
        $log.info('last activity is ' + now);
    }
});
