# list-pattern

A pattern to deconstruction list

[![Build Status](https://travis-ci.org/LoveKino/list-pattern.svg)](https://travis-ci.org/LoveKino/list-pattern.svg)
[![Coverage Status](https://coveralls.io/repos/github/LoveKino/list-pattern/badge.svg?branch=master)](https://coveralls.io/github/LoveKino/list-pattern?branch=master)

## goal

Simplely write some grammer to divide a list. Get all possibilities about the dividing.

## example

### eg: 'a X b' as a pattern to divide [1, 2, 3, 4]

All possibilities: [ [1, [2, 3], 4] ].
There only one possible [1, [2, 3], 4], a is 1, X is [2, 3] and b is 4.

- rule: the word stands for element or sublist

`the word start with capital letter stands for list`

`the word start with lower letter stands for element`

In this example, a and b stands for one element of [1, 2, 3, 4], X stands for sublist of [1, 2, 3, 4].

- rule: the expression stand for a way to divide list

`a X b` stands for a way to divide list, we can say 'one element (a) at first, then follow some elements (X), and end with one element.'

### eg: 'head Mid Tail' as a pattern to divide [11, 32, 30]

All possibilities:

```js
[
    [11, [], [32, 30]],
    [11, [32], [30]],
    [11, [32, 30], []],
]
```

## install

`npm i list-pattern --save`

## code example

Api all can return all possibilities.

Api filter can return all possibilities of the items you cared about.

```js
let pattern = require('list-pattern');
let all = pattern.all;

let m1 = all('Prev i Mid j Tail', [1, 2, 3, 4]);
let m2 = filter(['i', 'j'], 'Prev i Mid j Tail', [1, 2, 3, 4]);

console.log(m1);
/* result is:
[
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
]
*/

console.log(m2);
/* result is:
[
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4]
]
*/
```

## two special symbols

Words in pattern expresion like 'a X b' can not be repeated.

But `...` and `_` can be repeated.

`...` stands for sublist like word starts with capital letter.

`_` stands for element like word starts with low case letter.
