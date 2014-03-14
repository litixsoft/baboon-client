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
            node_modules: ['node_modules'],
            docs: ['build/docs']
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
        },
        changelog: {
            options: {
            }
        },
        bump: {
            options: {
                updateConfigs: ['pkg'],
                commitFiles: ['-a'],
                commitMessage: 'chore: release v%VERSION%',
                push: false
            }
        },
        ngdocs: {
            options: {
                dest: 'build/docs',
                html5Mode: false,
                title: 'Baboon Client',
                //image: 'http://www.litixsoft.de/img/baboon-affe.png',
                scripts: [
                    'angular.js',
                    /*'http://code.angularjs.org/1.2.14/angular.js',
                    'http://code.angularjs.org/1.2.14/angular-route.min.js',
                    'http://code.angularjs.org/1.2.14/angular-animate.min.js',*/
                    'docs/js/sample-not-for-production.js'
                ],
                styles: [
                    /*'http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',*/
                    'docs/css/sample.css'
                ]
            },
            api: {
                src: ['modules/**/*.js', '!modules/**/*.spec.js', '!modules/**/*.tpl.js', 'docs/content/api/*.ngdoc'],
                title: 'API Reference'
            }
        },
        connect: {
            options: {
                keepalive: true
            },
            server: {}
        },
        uglify: {
            options: {
                beautify: false,
                mangle: false
            },
            doc: {
                files: { 'docs/js/sample-not-for-production.js': [
                    'modules/**/*.js',
                    'bower_components/showdown/src/showdown.js',
                    '!modules/**/*.spec.js',
                    '!modules/**/*.tpl.js'
                ]}
            }
        },
        less: {
            doc: {
                options: {
                    combine: true,
                    cleancss: true
                },
                files: {
                    'docs/css/sample.css': 'modules/**/*.less'
                }
            }
        }
    });

    grunt.registerTask('doc', ['uglify:doc', 'less:doc', 'clean:docs', 'ngdocs', 'connect']);

    grunt.registerTask('git:commitHook', 'Install git commit hook', function () {
        grunt.file.copy('validate-commit-msg.js', '.git/hooks/commit-msg');
        require('fs').chmodSync('.git/hooks/commit-msg', '0755');
        grunt.log.ok('Registered git hook: commit-msg');
    });

    grunt.registerTask('lint', [
        'newer:jshint:test'
    ]);

    grunt.registerTask('build', [
        'newer:html2js'
    ]);

    grunt.registerTask('test', [
        'git:commitHook',
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

    grunt.registerTask('release', 'Bump version, update changelog and tag version', function (version) {
        grunt.task.run([
            'bump:' + (version || 'patch') + ':bump-only',
            'build',
            'changelog',
            'bump-commit'
        ]);
    });

    // Default task.
    grunt.registerTask('default', ['test']);
};