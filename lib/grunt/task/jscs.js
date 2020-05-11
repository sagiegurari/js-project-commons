'use strict';

const helper = require('../helper');

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
        },
        test: {
            options: {
                config: helper.getJSCSTestConfigFile()
            },
            files: {
                src: helper.getProjectSources(global.build.options.buildConfig, {
                    includeLib: false,
                    includeTest: true
                })
            }
        }
    }
};
