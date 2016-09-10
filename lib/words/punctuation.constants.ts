const PUNCTUATIONS = `…,."?!()`;

export const PUNCTUATIONS_REGEX = new RegExp(`([${PUNCTUATIONS}])`, 'g');
export const LETTERS_REGEX = new RegExp(`[^${PUNCTUATIONS}\\s]+`, 'g');