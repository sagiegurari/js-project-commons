'use strict';

/**
 * Defines documentation tasks.
 *
 * @function
 * @memberof! GruntDocs
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    /*istanbul ignore next*/
    grunt.registerTask('project-docs', function runTask() {
        if (global.gruntConfig.apidoc2readme.readme) {
            grunt.task.run('apidoc2readme:readme');
        }
    });

    grunt.registerTask('docs', 'Generate docs.', [
        'concurrent:docs',
        'project-docs'
    ]);

    /*istanbul ignore next*/
    grunt.registerMultiTask('apidoc2readme', function runTask() {
        const apidoc2readme = require('../apidoc2readme');

        /*eslint-disable no-invalid-this*/
        apidoc2readme.call(this, grunt);
        /*eslint-enable no-invalid-this*/
    });

    return {
        tasks: {
            apidoc2readme: {},
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
