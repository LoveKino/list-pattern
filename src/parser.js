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

let parse = (pattern) => {
    let tokenStream = tokenspliter(pattern);
    let tokens = ignore(tokenStream);
    let symbolMap = getSymbolMap(tokens);
    let groupNum = getGroupNum(tokens);
    let elementNum = tokens.length - groupNum;
    return {
        tokens,
        symbolMap,
        groupNum,
        elementNum
    };
};

/**
 * include ...
 */
let getGroupNum = (tokens) => {
    let count = 0;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        let type = token.type;
        if (type === 'ellipsis' || type === 'group') {
            count++;
        }
    }
    return count;
};

/**
 *
 * ## test
 *
[
    [
        [
            [{
                type: 'element',
                lexicon: 'a'
            }, {
                type: 'ellipsis',
                lexicon: '...'
            }, {
                type: 'group',
                lexicon: 'X'
            }, {
                type: 'under',
                lexicon: '_'
            }, {
                type: 'element',
                lexicon: 'b'
            }]
        ], {
            'a': {
                type: 'element',
                lexicon: 'a',
                index: 0
            },
            'X': {
                type: 'group',
                lexicon: 'X',
                index: 2
            },
            'b': {
                type: 'element',
                lexicon: 'b',
                index: 4
            },
            '...': [{
                type: 'ellipsis',
                lexicon: '...',
                index: 1
            }],
            '_': [{
                type: 'under',
                lexicon: '_',
                index: 3
            }]
        }
    ]
]
*/

let getSymbolMap = (tokens) => {
    let symbolMap = {};
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        let type = token.type;
        let lexicon = token.lexicon;
        let item = {
            type,
            lexicon,
            index: i
        };
        if (type === 'ellipsis') {
            symbolMap['...'] = symbolMap['...'] || [];
            symbolMap['...'].push(item);
        } else if (type === 'under') {
            symbolMap['_'] = symbolMap['_'] || [];
            symbolMap['_'].push(item);
        } else {
            if (symbolMap[lexicon]) {
                throw new Error('repeated lexicon for element or group. lexicon is ' + lexicon);
            } else {
                symbolMap[lexicon] = item;
            }
        }
    }
    return symbolMap;
};

let ignore = (tokenStream) => {
    let tokens = [];
    while (!tokenStream.isEmpty()) {
        let token = tokenStream.next();
        let type = token.type;
        if (type === 'whitespace') {
            continue;
        }
        tokens.push(token);
    }
    return tokens;
};

module.exports = {
    parse
};
