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
        describe('markdown', function () {
            it('defined', function () {
                assert.isDefined(commons.lint.markdown);
                assert.isTrue(Object.keys(commons.lint.markdown).length > 0);
            });
        });

        describe('eslint', function () {
            it('node', function () {
                assert.isDefined(commons.lint.eslint.node);
                assert.isTrue(Object.keys(commons.lint.eslint.node.rules).length > 0);
                assert.deepEqual(commons.lint.eslint.node.rules.strict, [
                    2,
                    'global'
                ]);
                assert.isTrue(commons.lint.eslint.node.env.node);
                assert.isUndefined(commons.lint.eslint.node.env.browser);
            });

            it('browser', function () {
                assert.isDefined(commons.lint.eslint.web);
                assert.isTrue(Object.keys(commons.lint.eslint.web.rules).length > 0);
                assert.deepEqual(commons.lint.eslint.web.rules.strict, [
                    2,
                    'function'
                ]);
                assert.isTrue(commons.lint.eslint.web.env.browser);
                assert.isUndefined(commons.lint.eslint.web.env.node);
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
                it('common', function () {
                    var counter = 0;
                    var gruntMock = {
                        registerTask: function () {
                            counter++;
                        }
                    };

                    var output = commons.grunt.task.common(gruntMock);
                    assert.isDefined(output);
                    assert.equal(counter, 6);
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

                it('project', function () {
                    var counter = 0;
                    var gruntMock = {
                        registerTask: function () {
                            counter++;
                        }
                    };

                    var output = commons.grunt.task.project(gruntMock);
                    assert.isDefined(output);
                    assert.equal(counter, 2);
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
                    assert.equal(counter, 4);
                });
            });
        });
    });
});
