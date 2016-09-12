'use strict';

var helper = require('../helper');

/**
 * JSCS task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntJSCS
 * @private
 */
module.exports.tasks = {
    jscs: {
        full: {
            options: {
                config: '.jscs.json'
            },
            files: {
                src: helper.getProjectSources(global.build.options.buildConfig, {
                    includeLib: true,
                    includeBuild: true
                })
            }
        }
    }
};
