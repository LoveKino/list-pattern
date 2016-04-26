'use strict';

/**
 * x1 + x2 + ... + xm = n
 * xi ≥ 0, i=1, 2, ..., m
 *
 * ## test
[
    [
        [1, 3],
        [[3]]
    ],
    [
        [2, 3],
        [[0, 3], [1, 2], [2, 1], [3, 0]]
    ],
    [
        [3, 3],
        [[0, 0, 3], [0, 1, 2], [0, 2, 1], [0, 3, 0],
         [1, 0, 2], [1, 1, 1], [1, 2, 0],
         [2, 0, 1], [2, 1, 0],
         [3, 0, 0]]
    ]
]
*/

let solve = (m, n) => {
    let ret = [];
    if (n < 0 || m <= 0) {
        return null;
    }
    if (m === 1) {
        ret.push([n]);
    } else {
        for (let i = 0; i <= n; i++) {
            let sub = solve(m - 1, n - i);
            for (let j = 0; j < sub.length; j++) {
                let item = sub[j];
                item.unshift(i);
                ret.push(item);
            }
        }
    }
    return ret;
};

module.exports = solve;
