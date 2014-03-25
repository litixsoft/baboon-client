$rootScope.$on('$routeChangeStart', function () {
    $bbcSession.setActivity(function(error) {
        if (error) {
            $log('ERROR:');
            $log.error(error);
        }
    });
});