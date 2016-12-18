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
 * Stylelint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntStyleLint
 * @private
 */
module.exports.tasks = {
    stylelint: {
        full: {
            options: {
                configFile: path.join(currentDirectory, '../../lint/stylelint/stylelint.json'),
                formatter: 'string',
                allowEmptyInput: true
            },
            src: helper.getCSSSources()
        }
    }
};
