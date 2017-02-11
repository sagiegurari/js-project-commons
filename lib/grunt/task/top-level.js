'use strict';

var testTask = 'karma:full';

/*istanbul ignore else*/
if (global.build.options.buildConfig.nodeProject) {
    testTask = 'mocha_istanbul:coverage';
}

/**
 * Defines top level tasks exposed via npm.
 *
 * @function
 * @memberof! GruntTopLevel
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    grunt.registerTask('cleanup', 'Cleanups', [
        'clean:target'
    ]);

    grunt.registerTask('format', 'Format Code.', [
        'jsbeautifier:full',
        'jsonlint:format'
    ]);

    grunt.registerTask('dependenciesValidations', 'Runs validations for project dependencies.', [
        'versioncheck'
    ]);

    /*istanbul ignore next*/
    grunt.registerTask('verify-env', function runTask() {
        if (!process.env.GHTOKEN) {
            grunt.log.error('Missing env var: GHTOKEN not defined.');

            return false;
        }
    });

    grunt.registerTask('empty', 'Empty Task', []);

    grunt.registerTask('coverage-prepare', 'Pre test tasks', [
        'cleanup'
    ]);

    grunt.registerTask('jstest', 'Run tests.', [
        'coverage-prepare',
        testTask,
        'integration-test'
    ]);

    grunt.registerTask('coverage-ci', 'Test for continues integration.', [
        'jstest',
        'coveralls:full'
    ]);

    grunt.registerTask('test', 'Continues integration related tasks.', [
        'securityCheck',
        'lint',
        'coverage-ci'
    ]);

    grunt.registerTask('build', 'Run all build steps.', [
        'verify-env',
        'format',
        'dependenciesValidations',
        'securityCheck',
        'docs',
        'lint',
        'jstest'
    ]);

    return {};
};
