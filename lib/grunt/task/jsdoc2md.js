'use strict';

const path = require('path');
const helper = require('../helper');

/*jslint nomen: true*/
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/
const currentDirectory = __dirname;
/*eslint-enable no-underscore-dangle*/
//jscs:enable disallowDanglingUnderscores
/*jslint nomen: false*/

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
                'no-cache': true,
                configure: path.join(currentDirectory, '../config/jsdoc-config.json')
            },
            src: helper.getAPISources(global.build.options.buildConfig),
            dest: 'docs/api.md'
        }
    }
};
