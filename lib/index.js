'use strict';

/**
 * The commons library.
 *
 * @author Sagie Gur-Ari
 * @namespace Commons
 * @public
 */
module.exports = {
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
            web: require('./lint/eslint/eslintrc-web')
        },
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
     * Holds various grunt task definitions.
     *
     * @member {Object}
     * @alias Commons.grunt
     * @memberof! Commons
     * @public
     */
    grunt: {
        clean: require('./grunt/clean'),
        common: require('./grunt/common'),
        coveralls: require('./grunt/coveralls'),
        eslint: require('./grunt/eslint'),
        gitdown: require('./grunt/gitdown'),
        jsbeautifier: require('./grunt/jsbeautifier'),
        jscs: require('./grunt/jscs'),
        jsdoc2md: require('./grunt/jsdoc2md'),
        jshint: require('./grunt/jshint'),
        jslint: require('./grunt/jslint'),
        jsonlint: require('./grunt/jsonlint'),
        karma: require('./grunt/karma'),
        lint: require('./grunt/lint'),
        markdownlint: require('./grunt/markdownlint'),
        mocha: require('./grunt/mocha'),
        project: require('./grunt/project'),
        topLevel: require('./grunt/top-level')
    }
};
