'use strict';

/**
 * The commons library.
 *
 * @author Sagie Gur-Ari
 * @namespace Commons
 * @public
 */
const commons = {
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
         * @alias Commons.lint.htmllint
         * @memberof! Commons
         * @public
         */
        htmllint: require('./lint/htmllint/htmllintrc'),
        /**
         * Holds the htmlhint rules.
         *
         * @member {Object}
         * @alias Commons.lint.htmlhint
         * @memberof! Commons
         * @public
         */
        htmlhint: require('./lint/htmlhint/htmlhintrc'),
        /**
         * Holds the csslint rules.
         *
         * @member {Object}
         * @alias Commons.lint.csslint
         * @memberof! Commons
         * @public
         */
        csslint: require('./lint/csslint/csslintrc'),
        /**
         * Holds the stylelint rules.
         *
         * @member {Object}
         * @alias Commons.lint.stylelint
         * @memberof! Commons
         * @public
         */
        stylelint: require('./lint/stylelint/stylelint'),
        /**
         * Holds the markdown lint rules.
         *
         * @member {Object}
         * @alias Commons.lint.markdownlint
         * @memberof! Commons
         * @public
         */
        markdownlint: require('./lint/markdownlint/markdownlintrc')
    },
    /**
     * Holds various tools and configs.
     *
     * @member {Object}
     * @alias Commons.tools
     * @memberof! Commons
     * @public
     */
    tools: {
        /**
         * Holds the karma base config.
         *
         * @member {Object}
         * @alias Commons.test.karma
         * @memberof! Commons
         * @public
         */
        karma: require('./tools/karma/karma-conf-common.js')
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
 * @param {String} property - The property name to be defined on the commons.grunt object.
 * @param {String} [file=property] - The file name to be used for require statement
 */
const defineTask = function (property, file) {
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
        get() {
            return require('./grunt/task/' + file);
        }
    });
};

defineTask('clean');
defineTask('coveralls');
defineTask('csslint');
defineTask('docs');
defineTask('env');
defineTask('eslint');
defineTask('filenames');
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
defineTask('release');
defineTask('remark');
defineTask('security');
defineTask('topLevel', 'top-level');
defineTask('versionCheck', 'version-check');
defineTask('yaml_validator', 'yaml-validator');

module.exports = commons;
