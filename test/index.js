'use strict';

let pattern = require('../index');
let jsoneq = require('cl-jsoneq');
let assert = require('assert');

let all = pattern.all;
let filter = pattern.filter;
let match = pattern.match;

describe('list-pattern', () => {
    it('simple', () => {
        let m = all('a X b', [1, 2, 3, 4]);
        assert.equal(jsoneq(m, [
            [1, [2, 3], 4]
        ]), true);
    });

    it('simple1', () => {
        let m = all('a X Y', [1, 2, 3, 4]);
        assert.equal(jsoneq(m, [
            [1, [],
                [2, 3, 4]
            ],
            [1, [2],
                [3, 4]
            ],
            [1, [2, 3],
                [4]
            ],
            [1, [2, 3, 4],
                []
            ]
        ]), true);
    });

    it('...i...j...', () => {
        let m = all('...i...j...', [1, 2, 3, 4]);
        assert.equal(jsoneq(m, [
            [
                [], 1, [], 2, [3, 4]
            ],
            [
                [], 1, [2], 3, [4]
            ],
            [
                [], 1, [2, 3], 4, []
            ],
            [
                [1], 2, [], 3, [4]
            ],
            [
                [1], 2, [3], 4, []
            ],
            [
                [1, 2], 3, [], 4, []
            ]
        ]), true);
    });

    it('all', () => {
        let m = filter(['i', 'j'], '...i...j...', [6, 2, 3, 4]);
        assert.equal(jsoneq(m, [
            [
                6, 2
            ],
            [
                6, 3
            ],
            [
                6, 4
            ],
            [
                2, 3
            ],
            [
                2, 4
            ],
            [
                3, 4
            ]
        ]), true);
    });

    it('illegal', () => {
        let m = filter(['i', 'j', 'k'], '...i...j...k...', [2, 3]);
        assert.equal(jsoneq(m, []), true);
    });

    it('mix', () => {
        let m = all('X y Z', [5, 7, 3, 0]);
        assert.equal(jsoneq([
            [
                [], 5, [7, 3, 0]
            ],
            [
                [5], 7, [3, 0]
            ],
            [
                [5, 7], 3, [0]
            ],
            [
                [5, 7, 3], 0, []
            ]
        ], m), true);
    });

    it('empty', () => {
        let m = all('...', []);
        assert.equal(jsoneq(m, [
            [
                []
            ]
        ]), true);
    });

    it('match', () => {
        let isM = match('_ X b', [1, 2, 3, 4]);
        let isM2 = match('a X b', [1, 2]);
        let isM3 = match('a X b', [1]);
        let isM4 = match('...', []);
        let isM5 = match('a', [1]);
        let isM6 = match('a', [1, 2]);
        let isM7 = match('a b c', [1]);
        assert.equal(isM, true);
        assert.equal(isM2, true);
        assert.equal(isM3, false);
        assert.equal(isM4, true);
        assert.equal(isM5, true);
        assert.equal(isM6, false);
        assert.equal(isM7, false);
    });

    it('error', (done) => {
        try {
            match('a a', [1, 2]);
        } catch(err) {
            if(err.toString().indexOf('repeated lexicon') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });

    it('error args', (done) => {
        try {
            match('a a', 1);
        } catch(err) {
            if(err.toString().indexOf('expect array') !== -1) {
                done();
            } else {
                done(err);
            }
        }
    });
});
