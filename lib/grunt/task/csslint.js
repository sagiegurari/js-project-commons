'use strict';

var path = require('path');
var helper = require('../helper');

/*jslint nomen: true*/
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/
var currentDirectory = __dirname;
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
