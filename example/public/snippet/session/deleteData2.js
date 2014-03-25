$bbcSession.deleteData(function (error, result) {
    if(error) {
        $log.error('ERROR:');
        $log.error(error);
    }
    else {
        $log.info('RESPONSE:');
        $log.info(result);
    }
});
