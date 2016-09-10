'use strict';

var helper = require('../helper');

/**
 * JSBeautifyer task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntJSBeautifyer
 * @private
 */
module.exports.tasks = {
    jsbeautifier: {
        full: {
            options: {
                config: '.jsbeautifyrc'
            },
            src: helper.getProjectSources(global.build.options.buildConfig)
        }
    }
};
