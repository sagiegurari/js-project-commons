'use strict';

/*global describe: false, it: false */

var path = require('path');
var chai = require('chai');
var assert = chai.assert;

describe('Commons Tests', function () {
    global.build = {
        options: {
            buildConfig: {
                projectRoot: path.join(__dirname, '../..'),
                nodeProject: true,
                packageJSON: require('../../package'),
                nodeMajorVersion: 6,
                es6Support: true
            }
        }
    };

    var commons = require('../../');

    describe('lint', function () {
        describe('markdownlint', function () {
            it('defined', function () {
                assert.isDefined(commons.lint.markdownlint);
                assert.isTrue(Object.keys(commons.lint.markdownlint).length > 0);
            });
        });

        describe('csslint', function () {
            it('defined', function () {
                assert.isDefined(commons.lint.csslint);
                assert.isTrue(Object.keys(commons.lint.csslint).length > 0);
            });
        });

        describe('stylelint', function () {
            it('defined', function () {
                assert.isDefined(commons.lint.stylelint);
                assert.isTrue(Object.keys(commons.lint.stylelint).length > 0);
            });
        });

        describe('jshint', function () {
            it('defined', function () {
                assert.isDefined(commons.lint.jshint);
                assert.isTrue(Object.keys(commons.lint.jshint).length > 0);
            });
        });

        describe('jscs', function () {
            it('defined', function () {
                assert.isDefined(commons.lint.jscs);
                assert.isTrue(Object.keys(commons.lint.jscs).length > 0);
            });
        });

        describe('eslint', function () {
            it('node', function () {
                var config = commons.lint.eslint.node;

                assert.isDefined(config);
                assert.isTrue(Object.keys(config.rules).length > 0);
                assert.deepEqual(config.rules.strict, [
                    2,
                    'global'
                ]);
                assert.isTrue(config.env.node);
                assert.isUndefined(config.env.browser);
                assert.isUndefined(config.env.mocha);
            });

            it('browser', function () {
                var config = commons.lint.eslint.web;

                assert.isDefined(config);
                assert.isTrue(Object.keys(config.rules).length > 0);
                assert.deepEqual(config.rules.strict, [
                    2,
                    'function'
                ]);
                assert.isTrue(config.env.browser);
                assert.isUndefined(config.env.node);
                assert.isUndefined(config.env.mocha);
            });

            it('mocha', function () {
                var config = commons.lint.eslint.mocha;

                assert.isDefined(config);
                assert.isTrue(Object.keys(config.rules).length > 0);
                assert.deepEqual(config.rules.strict, [
                    2,
                    'global'
                ]);
                assert.isTrue(config.env.node);
                assert.isUndefined(config.env.browser);
                assert.isTrue(config.env.mocha);
            });

            it('karma', function () {
                var config = commons.lint.eslint.karma;

                assert.isDefined(config);
                assert.isTrue(Object.keys(config.rules).length > 0);
                assert.deepEqual(config.rules.strict, [
                    2,
                    'function'
                ]);
                assert.isTrue(config.env.browser);
                assert.isUndefined(config.env.node);
                assert.isTrue(config.env.mocha);
            });
        });
    });

    describe('tools', function () {
        it('karma', function () {
            assert.isFunction(commons.tools.karma);
        });
    });

    describe('grunt', function () {
        describe('config', function () {
            it('initConfig', function () {
                assert.isFunction(commons.grunt.config.initConfig);
            });

            it('node', function () {
                assert.isFunction(commons.grunt.config.node);
            });

            it('web', function () {
                assert.isFunction(commons.grunt.config.web);
            });
        });

        describe('task', function () {
            it('integrationTest', function () {
                var counter = 0;
                var gruntMock = {
                    registerTask: function () {
                        counter++;
                    }
                };

                var output = commons.grunt.task.integrationTest(gruntMock);
                assert.isDefined(output);
                assert.equal(counter, 2);
            });

            it('jslint', function () {
                var gruntMock = {
                    file: {
                        readJSON: function () {
                            return 'test';
                        }
                    }
                };

                var output = commons.grunt.task.jslint(gruntMock);
                assert.isDefined(output);
            });

            it('lint', function () {
                var counter = 0;
                var gruntMock = {
                    registerTask: function () {
                        counter++;
                    }
                };

                var output = commons.grunt.task.lint(gruntMock);
                assert.isDefined(output);
                assert.equal(counter, 1);
            });

            it('markdownlint', function () {
                var gruntMock = {
                    file: {
                        readJSON: function () {
                            return 'test';
                        }
                    }
                };

                var output = commons.grunt.task.markdownlint(gruntMock);
                assert.isDefined(output);
            });

            it('topLevel', function () {
                var counter = 0;
                var gruntMock = {
                    registerTask: function () {
                        counter++;
                    }
                };

                var output = commons.grunt.task.topLevel(gruntMock);
                assert.isDefined(output);
                assert.equal(counter, 11);
            });
        });
    });
});
