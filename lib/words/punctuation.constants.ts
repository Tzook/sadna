const PUNCTUATIONS = `…,."?!()`;

export const PUNCTUATIONS_REGEX = new RegExp(`([${PUNCTUATIONS}])`, 'g'); // anything that is punctuation
export const LETTERS_REGEX = new RegExp(`[^${PUNCTUATIONS}\\s]+`, 'g'); // anything that is not punctuation nor whitespace
export const HOUSE_SPLIT_REGEX = /\n{2,}/g; // two or more line breaks
export const SENTENCE_SPLIT_REGEX = /\n/g; // any line break
export const WORD_SPLIT_REGEX = /\s/g; // any whitespace