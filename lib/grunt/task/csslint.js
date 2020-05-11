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
 * CSS lint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntCSSLint
 * @private
 */
module.exports.tasks = {
    csslint: {
        full: {
            options: {
                csslintrc: path.join(currentDirectory, '../../lint/csslint/csslintrc.json'),
                quiet: false
            },
            src: helper.getCSSSources()
        }
    }
};
