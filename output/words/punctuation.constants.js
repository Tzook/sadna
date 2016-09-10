"use strict";
var PUNCTUATIONS = "\u2026,.\"?!()";
exports.PUNCTUATIONS_REGEX = new RegExp("([" + PUNCTUATIONS + "])", 'g');
exports.LETTERS_REGEX = new RegExp("[^" + PUNCTUATIONS + "\\s]+", 'g');
//# sourceMappingURL=punctuation.constants.js.map