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
             * @memberof! Commons
             * @public
             */
            node: require('./lint/eslint/eslintrc-node'),
            /**
             * Holds the web eslint config.
             *
             * @member {Object}
             * @alias Commons.lint.eslint.web
             * @memberof! Commons
             * @public
             */
            web: require('./lint/eslint/eslintrc-web'),
            /**
             * Holds the mocha eslint config.
             *
             * @member {Object}
             * @alias Commons.lint.eslint.mocha
             * @memberof! Commons
             * @public
             */
            mocha: require('./lint/eslint/eslintrc-mocha'),
            /**
             * Holds the karma eslint config.
             *
             * @member {Object}
             * @alias Commons.lint.eslint.karma
             * @memberof! Commons
             * @public
             */
            karma: require('./lint/eslint/eslintrc-karma')
        },
        jshint: {
            /**
             * Holds the mocha jshint config.
             *
             * @member {Object}
             * @alias Commons.lint.jshint.mocha
             * @memberof! Commons
             * @public
             */
            mocha: require('./lint/jshint/jshint-mocha'),
            /**
             * Holds the karma jshint config.
             *
             * @member {Object}
             * @alias Commons.lint.jshint.karma
             * @memberof! Commons
             * @public
             */
            karma: require('./lint/jshint/jshint-karma')
        },
        jscs: {
            /**
             * Holds the test jscs config.
             *
             * @member {Object}
             * @alias Commons.lint.jscs.test
             * @memberof! Commons
             * @public
             */
            test: require('./lint/jscs/jscs-test')
        },
        /**
         * Holds the html lint rules.
         *
         * @member {Object}
         * @alias Commons.lint.html
         * @memberof! Commons
         * @public
         */
        html: require('./lint/htmllint/htmllintrc'),
        /**
         * Holds the css lint rules.
         *
         * @member {Object}
         * @alias Commons.lint.css
         * @memberof! Commons
         * @public
         */
        css: require('./lint/csslint/csslintrc'),
        /**
         * Holds the markdown lint rules.
         *
         * @member {Object}
         * @alias Commons.lint.markdown
         * @memberof! Commons
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
             * @memberof! Commons
             * @public
             */
            initConfig: require('./grunt/config/init-config'),
            /**
             * node.js grunt build config.
             *
             * @member {function}
             * @alias Commons.grunt.config.node
             * @memberof! Commons
             * @private
             */
            node: require('./grunt/config/grunt-node'),
            /**
             * web grunt build config.
             *
             * @member {function}
             * @alias Commons.grunt.config.web
             * @memberof! Commons
             * @private
             */
            web: require('./grunt/config/grunt-web')
        },
        /**
         * Holds various grunt task definitions.
         *
         * @member {Object}
         * @alias Commons.grunt.task
         * @memberof! Commons
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
         * @memberof! Commons
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
defineTask('csslint');
defineTask('docs');
defineTask('eslint');
defineTask('gitdown');
defineTask('htmllint');
defineTask('integrationTest', 'integration-test');
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
