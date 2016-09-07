'use strict';

var helper = require('./helper');

/**
 * JSHint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntJSHint
 * @private
 */
module.exports.tasks = {
    jshint: {
        full: {
            files: {
                src: helper.getProjectSources(global.build.options.buildConfig, true)
            }
        },
        options: {
            jshintrc: true
        }
    }
};
