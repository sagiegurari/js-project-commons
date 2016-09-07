'use strict';

var path = require('path');

/*jslint nomen: true */
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/
var rulesFile = path.join(__dirname, '../lint/markdown/markdownlintrc.json');
/*eslint-enable no-underscore-dangle*/
//jscs:enable disallowDanglingUnderscores
/*jslint nomen: false */

/**
 * Defines markdown lint task.
 *
 * @function
 * @memberof! GruntJSLint
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
                        config: grunt.file.readJSON(rulesFile)
                    },
                    src: [
                        'README.md',
                        '.github/*.md'
                    ]
                }
            }
        }
    };
};
