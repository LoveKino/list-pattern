# list-pattern

A pattern to deconstruction list

## install

`npm i list-pattern --save`

## example

```js
let pattern = require('list-pattern');
let filter = pattern.filter;

let m = filter('...i...j...', [1, 2, 3, 4]);

console.log(m);
/* result are:
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
```
