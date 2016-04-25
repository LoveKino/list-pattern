'use strict';

/**
 * data structure
 *      element
 *      a list of elements, list can be empty
 *
 * grammer
 *
 * (1) a word start with lowercase stands for element
 *
 * (2) a word start with captital stands for a list of element
 *
 * exp = item exp | item
 * item = element | list
 * list = [A-Z][a-zA-Z0-9]* | ...
 * element = [a-z][a-zA-Z0-9]* | _
 *
 * eg1: aXb, for list [1, 2, 3]
 * we have: a = 1, x = [2], b=3
 *
 * eg2: aXY, for list [1, 2, 3]
 *
 * we have: a = 1, x = [], y = [2, 3] or
 *          a = 1, x = [2], y = [3] or
 *          a = 1, x = [2, 3], y = []
 * partial(aX) = [[1], [1, 2], [1, 2, 3]]
 */
let Tokenspliter = require('tokenspliter');

let token_class = [{
    type: 'element',
    regular: /[a-z][a-zA-Z0-9]*/
}, {
    type: 'group',
    regular: /[A-Z][a-zA-Z0-9]*/
}, {
    type: 'under',
    regular: /\_/
}, {
    type: 'ellipsis',
    regular: /\.\.\./
}, {
    type: 'whitespace',
    regular: /\s+/
}];

let tokenspliter = Tokenspliter(token_class);

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

let deconstruct = (pattern, list) => {
    if (!isArray(list)) {
        throw new TypeError('expect array for list.');
    }
    if (typeof pattern !== 'string') {
        throw new TypeError('expect string for pattern');
    }

    let tokens = getTokens(pattern);
    let listVariables = getListVariables(tokens);
    let elemVariables = getElemVariables(tokens);
    
    if(!listVariables.length) {
    } else {
    }
};

let getListVariables = (tokens) => {
    let variables = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token.type === 'group' || token.type === 'ellipsis') {
            variables.push({
                token,
                index: i
            });
        }
    }
    return variables;
};

let getElemVariables = (tokens) => {
    let variables = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token.type === 'element' || token.type === 'under') {
            variables.push({
                token,
                index: i
            });
        }
    }
    return variables;

};

let getTokens = (pattern) => {
    let tokens = [];
    let tokenStream = tokenspliter(pattern);
    while (!tokenStream.isEmpty()) {
        let token = tokenStream.next();
        if (token.type === 'whitespace') {
            continue;
        }
        tokens.push(token);
    }
    return tokens;
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = {
    deconstruct
};
