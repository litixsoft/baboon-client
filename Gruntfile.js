'use strict';

module.exports = function (grunt) {
    var path = require('path');

    function getCoverageReport (folder) {
        var reports = grunt.file.expand(folder + '*/index.html');

        if (reports && reports.length > 0) {
            return reports[0];
        }

        return '';
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint_files_to_test: ['Gruntfile.js', 'common/**/*.js', 'optional/**/*.js'],
        banner: '/*!\n' +
            ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
            ' */\n\n',
        // Before generating any new files, remove any previously-created files.
        clean: {
            karma: ['build/reports/tests'],
            lint: ['build/reports/lint'],
            coverage: ['build/reports/coverage']
        },
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                regexp: true,
                undef: true,
                unused: true,
                indent: 4,
                quotmark: 'single',
                browser: true,
                node: true,
                globals: {
                }
            },
            test: '<%= jshint_files_to_test %>',
            jslint: {
                options: {
                    reporter: 'jslint',
                    reporterOutput: 'build/reports/lint/jshint.xml'
                },
                files: {
                    src: '<%= jshint_files_to_test %>'
                }
            },
            checkstyle: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'build/reports/lint/jshint_checkstyle.xml'
                },
                files: {
                    src: '<%= jshint_files_to_test %>'
                }
            }
        },
        open: {
            coverage: {
                path: path.join(__dirname, getCoverageReport('build/reports/coverage/'))
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            },
            ci: {
                configFile: 'test/karma.conf.js',
                reporters: ['progress', 'junit'],
                junitReporter: {
                    outputFile: 'build/reports/tests/baboon-client.xml',
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
                configFile: 'test/karma.coverage.conf.js'
            },
            cobertura: {
                configFile: 'test/karma.coverage.conf.js',
                coverageReporter: {
                    type: 'cobertura',
                    dir: 'build/reports/coverage'
                }
            }
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-karma');

    // Register tasks.
    grunt.registerTask('lint', ['jshint:test']);
    grunt.registerTask('debug', ['karma:debug']);
    grunt.registerTask('test', ['jshint:test', 'karma:unit']);
    grunt.registerTask('cover', ['clean:coverage', 'jshint:test', 'karma:coverage', 'open:coverage']);
    grunt.registerTask('ci', ['clean', 'jshint:jslint', 'jshint:checkstyle', 'karma:unit', 'karma:coverage', 'karma:cobertura']);

    // Default task.
    grunt.registerTask('default', ['test']);
};