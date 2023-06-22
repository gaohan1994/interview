'use strict';

const reactSchedulerImp = require('..');
const assert = require('assert').strict;

assert.strictEqual(reactSchedulerImp(), 'Hello from reactSchedulerImp');
console.info('reactSchedulerImp tests passed');
