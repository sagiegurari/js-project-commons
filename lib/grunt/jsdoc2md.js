'use strict';

var helper = require('./helper');

/**
 * JSDoc2MD task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntJSDoc2MD
 * @private
 */
module.exports.tasks = {
    jsdoc2md: {
        api: {
            options: {
                index: true,
                private: false
            },
            src: helper.getAPISources(global.build.options.buildConfig),
            dest: 'docs/api.md'
        }
    }
};
