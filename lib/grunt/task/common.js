'use strict';

/**
 * Defines common tasks used by all types of builds (node.js/web/...).
 *
 * @function
 * @memberof! GruntCommon
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    grunt.registerTask('cleanup', 'Cleanups', [
        'clean:target'
    ]);

    grunt.registerTask('test', 'Continues integration related tasks.', [
        'lint',
        'coverage-ci'
    ]);

    grunt.registerTask('format', 'Format Code.', [
        'jsbeautifier:full',
        'jsonlint:format'
    ]);

    grunt.registerTask('docs', 'Generate docs.', [
        'concurrent:docs',
        'project-docs'
    ]);

    grunt.registerTask('lint', 'Linting tasks.', [
        'concurrent:lint'
    ]);

    grunt.registerTask('empty', 'Empty Task', []);

    return {
        tasks: {
            concurrent: {
                docs: {
                    target: [
                        'gitdown:readme',
                        'jsdoc2md:api'
                    ]
                }
            }
        }
    };
};