'use strict';

const chai = require('chai');
const assert = chai.assert;
const path = require('path');
const helper = require('../../../lib/grunt/helper');

describe('Helper Tests', function () {
    describe('getRepoName', function () {
        it('valid', function () {
            const output = helper.getRepoName({
                projectRoot: path.join(__dirname, '../../../')
            });

            assert.strictEqual(output, 'sagiegurari/js-project-commons');
        });
    });

    describe('getRepoUserName', function () {
        it('valid', function () {
            const output = helper.getRepoUserName({
                projectRoot: path.join(__dirname, '../../../')
            });

            assert.strictEqual(output, 'sagiegurari');
        });
    });

    describe('isESlintSupported', function () {
        it('es6 supported', function () {
            const supported = helper.isESlintSupported({
                es6Support: true
            });

            assert.isTrue(supported);
        });

        it('es6 not supported', function () {
            const supported = helper.isESlintSupported({
                es6Support: false
            });

            assert.isFalse(supported);
        });
    });

    describe('getESlintTestConfigFile', function () {
        it('node', function () {
            const file = helper.getESlintTestConfigFile({
                nodeProject: true
            });

            assert.isTrue(file.indexOf('mocha') !== -1);
            assert.isTrue(file.indexOf('karma') === -1);
        });

        it('web', function () {
            const file = helper.getESlintTestConfigFile({
                nodeProject: false
            });

            assert.isTrue(file.indexOf('karma') !== -1);
            assert.isTrue(file.indexOf('mocha') === -1);
        });
    });

    describe('getJSHintTestConfigFile', function () {
        it('node', function () {
            const file = helper.getJSHintTestConfigFile({
                nodeProject: true
            });

            assert.isTrue(file.indexOf('mocha') !== -1);
            assert.isTrue(file.indexOf('karma') === -1);
        });

        it('web', function () {
            const file = helper.getJSHintTestConfigFile({
                nodeProject: false
            });

            assert.isTrue(file.indexOf('karma') !== -1);
            assert.isTrue(file.indexOf('mocha') === -1);
        });
    });

    describe('getJSCSTestConfigFile', function () {
        it('test', function () {
            const file = helper.getJSCSTestConfigFile();

            assert.isTrue(file.indexOf('test') !== -1);
        });
    });

    describe('getJSLintTestConfig', function () {
        it('node, null', function () {
            const config = helper.getJSLintTestConfig({
                nodeProject: true
            }, null);

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') === -1);
        });

        it('node, undefined', function () {
            const config = helper.getJSLintTestConfig({
                nodeProject: true
            });

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') === -1);
        });

        it('node, empty', function () {
            const config = helper.getJSLintTestConfig({
                nodeProject: true
            }, {});

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') === -1);
        });

        it('node, extend', function () {
            const base = {
                test: true
            };
            const config = helper.getJSLintTestConfig({
                nodeProject: true
            }, base);

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') === -1);
            assert.isTrue(config.test);
            assert.isTrue(base.test);
            assert.isUndefined(base.predef);
        });

        it('web, null', function () {
            const config = helper.getJSLintTestConfig({
                nodeProject: false
            }, null);

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') !== -1);
        });

        it('web, undefined', function () {
            const config = helper.getJSLintTestConfig({
                nodeProject: false
            });

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') !== -1);
        });

        it('web, empty', function () {
            const config = helper.getJSLintTestConfig({
                nodeProject: false
            }, {});

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') !== -1);
        });

        it('web, extend', function () {
            const base = {
                test: true
            };
            const config = helper.getJSLintTestConfig({
                nodeProject: false
            }, base);

            assert.isTrue(config.predef.indexOf('it') !== -1);
            assert.isTrue(config.predef.indexOf('angular') !== -1);
            assert.isTrue(config.test);
            assert.isTrue(base.test);
            assert.isUndefined(base.predef);
        });
    });

    describe('getProjectSources', function () {
        it('node all', function () {
            const src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: true,
                includeBuild: true,
                includeTest: true
            });

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js',
                'project/**/*.js',
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('node defaults', function () {
            const src = helper.getProjectSources({
                nodeProject: true
            });

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        });

        it('node only lib', function () {
            const src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: true
            });

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        });

        it('node only build', function () {
            const src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: false,
                includeBuild: true
            });

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('node only test', function () {
            const src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: false,
                includeTest: true
            });

            assert.deepEqual(src, [
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web all', function () {
            const src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: true,
                includeBuild: true,
                includeTest: true
            });

            assert.deepEqual(src, [
                'project/**/*.js',
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web defaults', function () {
            const src = helper.getProjectSources({
                nodeProject: false
            });

            assert.deepEqual(src, []);
        });

        it('web only lib', function () {
            const src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: true
            });

            assert.deepEqual(src, []);
        });

        it('web only build', function () {
            const src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: false,
                includeBuild: true
            });

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('web only test', function () {
            const src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: false,
                includeTest: true
            });

            assert.deepEqual(src, [
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web all, with main', function () {
            const src = helper.getProjectSources({
                nodeProject: false,
                packageJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: true,
                includeBuild: true,
                includeTest: true
            });

            assert.deepEqual(src, [
                'test.js',
                'project/**/*.js',
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web defaults, with main', function () {
            const src = helper.getProjectSources({
                nodeProject: false,
                packageJSON: {
                    main: 'test.js'
                }
            });

            assert.deepEqual(src, [
                'test.js'
            ]);
        });

        it('web only lib, with main', function () {
            const src = helper.getProjectSources({
                nodeProject: false,
                packageJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: true
            });

            assert.deepEqual(src, [
                'test.js'
            ]);
        });

        it('web only build, with main', function () {
            const src = helper.getProjectSources({
                nodeProject: false,
                packageJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: false,
                includeBuild: true
            });

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('web only test, with main', function () {
            const src = helper.getProjectSources({
                nodeProject: false,
                packageJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: false,
                includeTest: true
            });

            assert.deepEqual(src, [
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });
    });

    describe('getAPISources', function () {
        it('node', function () {
            const src = helper.getAPISources({
                nodeProject: true
            }, false);

            assert.equal(src, '<%=buildConfig.libDirectory%>/**/*.js');
        });

        it('web', function () {
            const src = helper.getAPISources({
                nodeProject: false
            }, false);

            assert.isUndefined(src);
        });

        it('web, with main', function () {
            const src = helper.getAPISources({
                nodeProject: false,
                packageJSON: {
                    main: 'test.js'
                }
            }, false);

            assert.equal(src, 'test.js');
        });
    });

    describe('getHTMLSources', function () {
        it('simple', function () {
            const paths = helper.getHTMLSources();

            assert.deepEqual(paths, [
                '<%=buildConfig.libDirectory%>/**/*.html',
                '<%=buildConfig.docsDirectory%>/**/*.html'
            ]);
        });
    });

    describe('getCSSSources', function () {
        it('simple', function () {
            const paths = helper.getCSSSources();

            assert.deepEqual(paths, [
                '<%=buildConfig.libDirectory%>/**/*.css',
                '<%=buildConfig.docsDirectory%>/**/*.css'
            ]);
        });
    });

    describe('getMDFiles', function () {
        it('simple', function () {
            const paths = helper.getMDFiles();

            assert.deepEqual(paths, [
                '*.md',
                '.github/*.md'
            ]);
        });
    });
});
