'use strict';

var helper = require('../helper');
var sources = helper.getProjectSources(global.build.options.buildConfig, {
    includeLib: true,
    includeBuild: true,
    includeTest: true
});
sources = sources.concat(helper.getHTMLSources());
sources = sources.concat(helper.getCSSSources());

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
            src: sources
        }
    }
};
