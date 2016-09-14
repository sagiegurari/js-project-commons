'use strict';

/*global describe: false, it: false*/

var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var initConfig = require('../../../../lib/grunt/config/init-config');

describe('Grunt initConfig Tests', function () {
    it('no project root', function () {
        var errorFound = false;
        try {
            initConfig({}, {
                buildConfig: {
                    nodeProject: true
                }
            });
        } catch (error) {
            errorFound = true;
            assert.equal(error.message, 'Property: options.buildConfig.projectRoot missing');
        }

        assert.isTrue(errorFound);
    });

    it('no node/web project defined', function () {
        var errorFound = false;
        try {
            initConfig({}, {
                buildConfig: {
                    projectRoot: path.join(__dirname, '../../../..')
                }
            });
        } catch (error) {
            errorFound = true;
            assert.equal(error.message, 'Property: options.buildConfig.nodeProject missing');
        }

        assert.isTrue(errorFound);
    });

    it('node, no project config', function () {
        var validated = false;
        var gruntMock = {
            registerTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            initConfig: function (config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.mocha_istanbul);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: true
            },
            testConfig: {
                test: true,
                value: 1000
            }
        });

        assert.isTrue(validated);
    });

    it('node, with project config', function () {
        var validated = false;
        var gruntMock = {
            registerTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            initConfig: function (config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.mocha_istanbul);
                assert.isDefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: true
            },
            testConfig: {
                test: true,
                value: 1000
            }
        }, {
            tasks: {
                myProj: true
            }
        });

        assert.isTrue(validated);
    });

    it('web, no project config', function () {
        var validated = false;
        var gruntMock = {
            registerTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            initConfig: function (config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.karma);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: false
            },
            testConfig: {
                test: true,
                value: 1000
            }
        });

        assert.isTrue(validated);
    });

    it('web, with project config', function () {
        var validated = false;
        var gruntMock = {
            registerTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            initConfig: function (config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.karma);
                assert.isDefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: false
            },
            testConfig: {
                test: true,
                value: 1000
            }
        }, {
            tasks: {
                myProj: true
            }
        });

        assert.isTrue(validated);
    });

    it('web, with bower.json', function () {
        var validated = false;
        var gruntMock = {
            registerTask: function () {
                return undefined;
            },
            file: {
                readJSON: function () {
                    return {};
                }
            },
            initConfig: function (config) {
                assert.isDefined(config);
                assert.deepEqual(config.buildConfig.packageJSON, {
                    test: true
                });
                assert.deepEqual(config.buildConfig.bowerJSON, {
                    main: 'main.js'
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.karma);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../helper'),
                nodeProject: false
            }
        });

        assert.isTrue(validated);
    });
});
