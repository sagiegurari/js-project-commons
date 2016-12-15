'use strict';

/*global describe: false, it: false*/

var chai = require('chai');
var assert = chai.assert;
var config = require('../../../../lib/grunt/config/grunt-node');

describe('Grunt Node Tests', function () {
    it('no project config', function () {
        var counter = 0;
        var gruntMock = {
            registerTask: function () {
                counter++;
            },
            registerMultiTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            loadNpmTasks: function () {
                return undefined;
            }
        };

        var output = config(gruntMock, {
            buildConfig: {
                test: true,
                value: 1000
            }
        });

        assert.isDefined(output);
        assert.deepEqual(output.buildConfig, {
            test: true,
            value: 1000
        });
        assert.equal(counter, 19);

        assert.isDefined(output.clean);
        assert.isDefined(output.coveralls);
        assert.isDefined(output.eslint);
        assert.isDefined(output.gitdown);
        assert.isDefined(output.jsbeautifier);
        assert.isDefined(output.jscs);
        assert.isDefined(output.jsdoc2md);
        assert.isDefined(output.jshint);
        assert.isDefined(output.jslint);
        assert.isDefined(output.markdownlint);
        assert.isDefined(output.versioncheck);
        assert.isDefined(output.shell);
        assert.isDefined(output.shell.docker);
        assert.isDefined(output.mocha_istanbul);
        assert.isDefined(output.retire);
    });

    it('with project config', function () {
        var counter = 0;
        var gruntMock = {
            registerTask: function () {
                counter++;
            },
            registerMultiTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            loadNpmTasks: function () {
                return undefined;
            }
        };

        var output = config(gruntMock, {
            buildConfig: {
                test: true,
                value: 1000
            }
        }, {
            tasks: {
                myProj: true
            }
        });

        assert.isDefined(output);
        assert.deepEqual(output.buildConfig, {
            test: true,
            value: 1000
        });
        assert.equal(counter, 19);

        assert.isDefined(output.clean);
        assert.isDefined(output.coveralls);
        assert.isDefined(output.eslint);
        assert.isDefined(output.gitdown);
        assert.isDefined(output.jsbeautifier);
        assert.isDefined(output.jscs);
        assert.isDefined(output.jsdoc2md);
        assert.isDefined(output.jshint);
        assert.isDefined(output.jslint);
        assert.isDefined(output.markdownlint);
        assert.isDefined(output.versioncheck);
        assert.isDefined(output.shell);
        assert.isDefined(output.shell.docker);
        assert.isDefined(output.mocha_istanbul);
        assert.isDefined(output.retire);
        assert.isDefined(output.myProj);
    });
});
