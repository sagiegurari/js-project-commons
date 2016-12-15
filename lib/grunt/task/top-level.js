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

    grunt.registerTask('build', 'Run all build steps.', [
        'format',
        'dependenciesValidations',
        'securityCheck',
        'docs',
        'lint',
        'jstest'
    ]);

    return {};
};
