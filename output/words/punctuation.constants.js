"use strict";
var PUNCTUATIONS = "\u2026,.\"?!()";
exports.PUNCTUATIONS_REGEX = new RegExp("([" + PUNCTUATIONS + "])", 'g'); // anything that is punctuation
exports.LETTERS_REGEX = new RegExp("[^" + PUNCTUATIONS + "\\s]+", 'g'); // anything that is not punctuation nor whitespace
exports.HOUSE_SPLIT_REGEX = /\n{2,}/g; // two or more line breaks
exports.SENTENCE_SPLIT_REGEX = /\n/g; // any line break
exports.WORD_SPLIT_REGEX = /\s/g; // any whitespace
//# sourceMappingURL=punctuation.constants.js.map