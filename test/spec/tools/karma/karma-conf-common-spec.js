'use strict';

/*global describe: false, it: false*/

var chai = require('chai');
var assert = chai.assert;
var karmaConf = require('../../../../lib/tools/karma/karma-conf-common');

describe('KarmaConf Tests', function () {
    var createMockConfig = function () {
        return {
            set: function (value) {
                this.value = value;
            }
        };
    };

    var setEnv = function (name, value) {
        var output = process.env[name];

        if (value) {
            process.env[name] = value;
        } else {
            delete process.env[name];
        }

        return output;
    };

    it('no project config, not travis', function () {
        var config = createMockConfig();
        var env = setEnv('TRAVIS');

        karmaConf(config, null, 'test');

        setEnv('TRAVIS', env);
        var output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromiumHeadless');
    });

    it('no project config, travis', function () {
        var config = createMockConfig();
        var env = setEnv('TRAVIS', 'true');

        karmaConf(config, null, 'test');

        setEnv('TRAVIS', env);
        var output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromeHeadlessTravis');
    });

    it('project config, not travis', function () {
        var config = createMockConfig();
        var env = setEnv('TRAVIS');

        karmaConf(config, {
            test: 'fake value'
        }, 'test');

        setEnv('TRAVIS', env);
        var output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromiumHeadless');
        assert.strictEqual(output.test, 'fake value');
    });

    it('project config, travis', function () {
        var config = createMockConfig();
        var env = setEnv('TRAVIS', 'true');

        karmaConf(config, {
            test: 'fake value'
        }, 'test');

        setEnv('TRAVIS', env);
        var output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromeHeadlessTravis');
        assert.strictEqual(output.test, 'fake value');
    });
});
