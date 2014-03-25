$bbcSession.setData('myKey', 'myValue', function (error, result) {
    if(error) {
        $log.error('ERROR:');
        $log.error(error);
    }
    else {
        $log.info(result);
    }
});
