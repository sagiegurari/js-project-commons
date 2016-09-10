'use strict';

var helper = require('../helper');

/**
 * ESLint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntESLint
 * @private
 */
module.exports.tasks = {
    eslint: {
        full: {
            options: {
                config: '.eslintrc.js'
            },
            src: helper.getProjectSources(global.build.options.buildConfig, true)
        }
    }
};
