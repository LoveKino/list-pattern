'use strict';

let pattern = require('../index');
let jsoneq = require('cl-jsoneq');
let assert = require('assert');

let all = pattern.all;
let filter = pattern.filter;

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
});
