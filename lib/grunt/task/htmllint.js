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
 * HTML lint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntHTMLLint
 * @private
 */
module.exports.tasks = {
    htmllint: {
        full: {
            options: {
                htmllintrc: path.join(currentDirectory, '../../lint/htmllint/htmllintrc.json')
            },
            src: helper.getHTMLSources()
        }
    }
};
