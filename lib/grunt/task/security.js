'use strict';

const helper = require('../helper');

/**
 * Defines security tasks used by all types of builds (node.js/web/...).
 *
 * @function
 * @memberof! GruntSecurity
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    grunt.registerTask('securityCheck', 'Run all security validations.', [
        'concurrent:security'
    ]);

    grunt.registerTask('securityLibraryCheck', 'Run security validations for library code.', [
        'retire:js'
    ]);

    /*istanbul ignore next*/
    grunt.registerTask('securityDependenciesCheck', function runTask() {
        if (global.build.options.buildConfig.nodeProject && (!global.build.options.buildConfig.skipSecurityCheck)) {
            grunt.task.run('concurrent:securityDependenciesCheck');
        }
    });

    /*istanbul ignore next*/
    grunt.registerTask('snykDependenciesCheck', function runTask() {
        if (process.env.SNYK_AUTH_TOKEN) {
            grunt.task.run('snykDependenciesAll');
        }
    });

    grunt.registerTask('snykDependenciesAll', 'Run all snyk validation steps.', [
        'shell:snykAuth',
        'snyk'
    ]);

    return {
        tasks: {
            concurrent: {
                security: {
                    target: [
                        'securityLibraryCheck',
                        'securityDependenciesCheck'
                    ]
                },
                securityDependenciesCheck: {
                    target: [
                        'retire:node',
                        'snykDependenciesCheck'
                    ]
                }
            },
            retire: {
                js: helper.getProjectSources(global.build.options.buildConfig, {
                    includeLib: true,
                    includeBuild: true
                }),
                node: [
                    global.build.options.buildConfig.projectRoot
                ],
                options: {
                    verbose: true,
                    packageOnly: true
                }
            },
            shell: {
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: false,
                    failOnError: true
                },
                snykAuth: {
                    command: 'snyk auth ' + process.env.SNYK_AUTH_TOKEN,
                    execOptions: {
                        encoding: 'utf8',
                        maxBuffer: 1024000000
                    }
                }
            },
            snyk: {}
        }
    };
};
