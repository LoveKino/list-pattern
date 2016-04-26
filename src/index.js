'use strict';

let reduce = require('./reduce');

let deconstruct = reduce.deconstruct;

let all = (pattern, list) => {
    let matrix = deconstruct(pattern, list).matrix;
    return matrix;
};

let filter = (targets, pattern, list) => {
    let res = deconstruct(pattern, list);
    let m = res.matrix;
    let symbolMap = res.symbolMap;

    let indexes = [];
    for (let i = 0; i < targets.length; i++) {
        indexes.push(symbolMap[targets[i]].index);
    }

    let rets = [];

    for (let i = 0; i < m.length; i++) {
        let line = m[i];
        let ret = [];
        for (let j = 0; j < indexes.length; j++) {
            ret[j] = line[indexes[j]];
        }
        rets.push(ret);
    }

    return rets;
};

module.exports = {
    all,
    filter,
    deconstruct
};
