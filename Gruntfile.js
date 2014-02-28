'use strict';

//var path = require('path');

module.exports = function (grunt) {
    var path = require('path');

    /**
     * Gets the index.html file from the code coverage folder.
     *
     * @param {!string} folder The path to the code coverage folder.
     */
    function getCoverageReport (folder) {
        var reports = grunt.file.expand(folder + '*/index.html');

        if (reports && reports.length > 0) {
            return reports[0];
        }

        return '';
    }

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        src: {
            jshint: {
                files: [
                    'modules/**/*.js',
                    'Gruntfile.js',
                    '!modules/**/*.tpl.js'
                ]
            },
            bowerrc: grunt.file.readJSON('.bowerrc'),
            tmpMod: '.tmp/modules'
        },

        // Empties folders to start fresh
        clean: {
            coverage: '.reports/coverage',
            test: '.reports/test',
            jshint: '.reports/jshint',
            bower: ['<%= src.bowerrc.directory %>'],
            node_modules: ['node_modules']
        },

        open: {
            coverage: {
                path: function () {
                    return path.join(__dirname, getCoverageReport('.reports/coverage/'));
                }
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes

        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            test: {
                src: '<%= src.jshint.files %>'
            },
            jslint: {
                options: {
                    reporter: 'jslint',
                    reporterOutput: '.reports/lint/jshint.xml'
                },
                files: {
                    src: '<%= src.jshint.files %>'
                }
            },
            checkstyle: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: '.reports/lint/jshint_checkstyle.xml'
                },
                files: {
                    src: '<%= src.jshint.files %>'
                }
            }
        },
        html2js: {
            modules: {
                options: {
                    module: null, // no bundle module for all the html2js templates
                    base: 'modules'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'modules/',
                        src: ['**/*.html'],
                        ext: '.tpl.js',
                        dest: 'modules/'
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            },
            chrome: {
                configFile: 'test/karma.conf.js',
                logLevel: 'DEBUG',
                detectBrowsers: {
                    enabled: false
                }
            },
            ci: {
                configFile: 'test/karma.conf.js',
                colors: false,
                reporters: ['mocha', 'junit'],
                junitReporter: {
                    outputFile: '.reports/tests/baboon-client.xml',
                    suite: 'baboon_client'
                }
            },
            debug: {
                configFile: 'test/karma.conf.js',
                detectBrowsers: {
                    enabled: false
                },
                singleRun: false
            },
            coverage: {
                configFile: 'test/karma.coverage.conf.js',
                colors: false
            },
            cobertura: {
                configFile: 'test/karma.coverage.conf.js',
                coverageReporter: {
                    type: 'cobertura',
                    dir: '.reports/coverage'
                },
                colors: false
            }
        }
    });

    grunt.registerTask('lint', [
        'newer:jshint:test'
    ]);

    grunt.registerTask('build', [
        'newer:html2js'
    ]);

    grunt.registerTask('test', [
        'build',
        'lint',
        'karma:unit'
    ]);

    grunt.registerTask('cover', [
        'build',
        'clean:coverage',
        'lint',
        'karma:coverage',
        'open:coverage'
    ]);

    grunt.registerTask('ci', [
        'clean:coverage',
        'clean:test',
        'clean:jshint',
        'html2js',
        'jshint:test',
        'jshint:checkstyle',
        'karma:ci',
        'karma:coverage',
        'karma:cobertura'
    ]);

    // Default task.
    grunt.registerTask('default', ['test']);
};