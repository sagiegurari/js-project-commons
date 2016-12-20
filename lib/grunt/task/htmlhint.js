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
 * HTML Hint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntHTMLHint
 * @private
 */
module.exports.tasks = {
    htmlhint: {
        full: {
            options: {
                htmlhintrc: path.join(currentDirectory, '../../lint/htmlhint/htmlhintrc.json')
            },
            src: helper.getHTMLSources()
        }
    }
};
