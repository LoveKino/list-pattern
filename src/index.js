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
let parse = (sentence) => {
    let words = sentence.split(' ');
    let tokens = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word.trim();
        if(word) {
            let type = 'elem';
            if(word[0] >= 'A' && word[0] <= 'Z') {
                type = 'list';
            }
            tokens.push({
                lexicon: word,
                type
            });
        }
    }
    return tokens;
};
