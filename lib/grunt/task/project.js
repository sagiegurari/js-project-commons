'use strict';

/**
 * Defines project specific tasks.
 *
 * @function
 * @memberof! GruntProject
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    grunt.registerTask('project-docs', 'Create project docs', [
        'empty'
    ]);

    return {};
};
