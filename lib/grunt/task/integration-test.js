'use strict';

/**
 * Defines integration test task.
 *
 * @function
 * @memberof! GruntIntegrationTest
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    var fs = require('fs');
    var path = require('path');
    var integrationDirectory = path.join(global.build.options.buildConfig.projectRoot, 'project/build/integration');
    var testScript = path.join(integrationDirectory, 'build.sh');

    grunt.registerTask('integration-test', 'Run integration tests', [
        'docker-integration-test'
    ]);

    /*istanbul ignore next*/
    grunt.registerTask('docker-integration-test', function runTask() {
        if (process.env.DOCKER_INTEGRATION_TEST_NODE_VERSION && (String(global.build.options.buildConfig.nodeMajorVersion) === process.env.DOCKER_INTEGRATION_TEST_NODE_VERSION)) {
            /*jslint stupid: true*/
            /*eslint-disable no-sync*/
            if (fs.existsSync(testScript)) {
                grunt.log.writeln('Docker integration test requested.');

                grunt.task.run('shell:docker');
            }
            /*eslint-enable no-sync*/
            /*jslint stupid: false*/
        } else {
            grunt.log.writeln('Docker integration test skipped.');
        }
    });

    return {
        tasks: {
            shell: {
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: false,
                    failOnError: true
                },
                docker: {
                    command: testScript,
                    execOptions: {
                        cwd: integrationDirectory,
                        encoding: 'utf8',
                        maxBuffer: 1024000000
                    }
                }
            }
        }
    };
};
