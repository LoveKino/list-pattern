'use strict';

let parser = require('./parser');
let solve = require('./solve');

let parse = parser.parse;

let deconstruct = (pattern, list) => {
    let matrix = null;
    let ret = check(pattern, list);
    let ast = ret.ast;
    if (!ret.match) {
        matrix = [];
    } else {
        if (ast.groupNum === 0 && ast.elementNum === list.length) {
            matrix = [list.slice(0)];
        } else {
            let lens = solve(ast.groupNum, list.length - ast.elementNum);
            matrix = getDistribution(ast.tokens, lens, list);
        }
    }
    return {
        matrix,
        symbolMap: ast.symbolMap
    };
};

let check = (pattern, list) => {
    if (!isArray(list)) {
        throw new TypeError('expect array for list.');
    }
    let ast = parse(pattern);

    if (ast.elementNum > list.length) {
        return {
            match: false,
            ast
        };
    } else if (ast.groupNum === 0 && ast.elementNum !== list.length) {
        return {
            match: false,
            ast
        };
    }
    return {
        match: true,
        ast
    };
};

/**
 *
 * ## test
[
    [
        [
            [{
                type: 'element'
            }, {
                type: 'group'
            }, {
                type: 'element'
            }],
            [
                [2]
            ],
            [5, 2, 4, 1]
        ],
        [
            [5, [2, 4], 1]
        ]
    ]
]
*/
let getDistribution = (tokens, lens, list) => {
    let matrix = [];
    for (let i = 0; i < lens.length; i++) {
        let lenList = lens[i];
        let lenCount = 0;
        let index = 0;
        let line = [];
        for (let j = 0; j < tokens.length; j++) {
            let token = tokens[j];
            if (token.type === 'ellipsis' || token.type === 'group') {
                let len = lenList[lenCount];
                let item = [];
                for (let k = 0; k < len; k++) {
                    item.push(list[index++]);
                }
                line.push(item);
                lenCount++;
            } else {
                line.push(list[index++]);
            }
        }
        matrix.push(line);
    }
    return matrix;
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = {
    deconstruct,
    check
};
