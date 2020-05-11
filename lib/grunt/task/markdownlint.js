'use strict';

const path = require('path');
const helper = require('../helper');

/*jslint nomen: true */
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/
const rulesFile = path.join(__dirname, '../../lint/markdownlint/markdownlintrc.json');
/*eslint-enable no-underscore-dangle*/
//jscs:enable disallowDanglingUnderscores
/*jslint nomen: false */

/**
 * Defines markdown lint task.
 *
 * @function
 * @memberof! GruntMarkdownLint
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    return {
        tasks: {
            markdownlint: {
                full: {
                    options: {
                        config: grunt.file.readJSON(rulesFile),
                        resultVersion: 1
                    },
                    src: helper.getMDFiles()
                }
            }
        }
    };
};
