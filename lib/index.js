'use strict';

/**
 * The commons library.
 *
 * @author Sagie Gur-Ari
 * @namespace Commons
 * @public
 */
var commons = {
    lint: {
        eslint: {
            /**
             * Holds the node.js eslint config.
             *
             * @member {Object}
             * @alias Commons.lint.eslint.node
             * @memberof! Commons.lint.eslint
             * @public
             */
            node: require('./lint/eslint/eslintrc-node'),
            /**
             * Holds the web eslint config.
             *
             * @member {Object}
             * @alias Commons.lint.eslint.web
             * @memberof! Commons.lint.eslint
             * @public
             */
            web: require('./lint/eslint/eslintrc-web')
        },
        /**
         * Holds the markdown lint rules.
         *
         * @member {Object}
         * @alias Commons.lint.markdown
         * @memberof! Commons.lint
         * @public
         */
        markdown: require('./lint/markdown/markdownlintrc')
    },
    /**
     * Holds various grunt build configurations.
     *
     * @member {Object}
     * @alias Commons.grunt
     * @memberof! Commons
     * @public
     */
    grunt: {
        config: {
            /**
             * Initializes the grunt config.
             *
             * @member {function}
             * @alias Commons.grunt.config.initConfig
             * @memberof! Commons.grunt.config
             * @public
             */
            initConfig: require('./grunt/config/init-config'),
            /**
             * node.js grunt build config.
             *
             * @member {function}
             * @alias Commons.grunt.config.node
             * @memberof! Commons.grunt.config
             * @private
             */
            node: require('./grunt/config/grunt-node'),
            /**
             * web grunt build config.
             *
             * @member {function}
             * @alias Commons.grunt.config.web
             * @memberof! Commons.grunt.config
             * @private
             */
            web: require('./grunt/config/grunt-web')
        },
        /**
         * Holds various grunt task definitions.
         *
         * @member {Object}
         * @alias Commons.grunt.task
         * @memberof! Commons.grunt
         * @public
         */
        task: {}
    }
};

/**
 * Adds a grunt task property.
 *
 * @function
 * @memberof! Commons
 * @private
 * @param {string} property - The property name to be defined on the commons.grunt object.
 * @param {string} [file=property] - The file name to be used for require statement
 */
var defineTask = function (property, file) {
    file = file || property;

    Object.defineProperty(commons.grunt.task, property, {
        /**
         * Defines the grunt task.
         *
         * @function
         * @memberof! Commons.grunt.task
         * @private
         * @returns {Object} Returns the grunt task definition
         */
        get: function () {
            return require('./grunt/task/' + file);
        }
    });
};

defineTask('clean');
defineTask('common');
defineTask('coveralls');
defineTask('eslint');
defineTask('gitdown');
defineTask('jsbeautifier');
defineTask('jscs');
defineTask('jsdoc2md');
defineTask('jshint');
defineTask('jslint');
defineTask('jsonlint');
defineTask('karma');
defineTask('lint');
defineTask('markdownlint');
defineTask('mocha');
defineTask('project');
defineTask('topLevel', 'top-level');

module.exports = commons;
