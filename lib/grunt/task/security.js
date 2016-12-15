'use strict';

var helper = require('../helper');

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
        if (!global.build.options.buildConfig.skipSecurityCheck) {
            grunt.task.run('retire:node');
        }
    });

    return {
        tasks: {
            concurrent: {
                security: {
                    target: [
                        'securityLibraryCheck',
                        'securityDependenciesCheck'
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
            }
        }
    };
};
