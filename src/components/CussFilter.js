import { Filter } from 'bad-words';

// Custom Hindi/Himachali slang additions
const CUSTOM_BAD_WORDS = [
    'saala', 'saali', 'kamina', 'kamini', 'harami', 'haramkhor',
    'chutiya', 'bhenchod', 'madarchod', 'gaandu', 'bhosdike',
    'randi', 'kutti', 'kutta', 'hagne', 'tatti', 'gadha',
    'ullu', 'bevakoof', 'nalayak', 'badtameez', 'ghatiya',
    'kameena', 'kameeni', 'raand', 'dalla', 'hijra',
    'bc', 'mc', 'bsdk', 'lodu', 'chodu', 'jhatu',
];

let filterInstance = null;

function getFilter() {
    if (!filterInstance) {
        filterInstance = new Filter();
        filterInstance.addWords(...CUSTOM_BAD_WORDS);
    }
    return filterInstance;
}

/**
 * Filters profanity from text, replacing bad words with asterisks.
 * @param {string} text - The input text to filter.
 * @returns {string} - The cleaned text.
 */
export function filterText(text) {
    if (!text || typeof text !== 'string') return text;
    try {
        return getFilter().clean(text);
    } catch {
        return text;
    }
}

/**
 * Checks if text contains profanity.
 * @param {string} text - The input text to check.
 * @returns {boolean} - True if the text contains profanity.
 */
export function containsProfanity(text) {
    if (!text || typeof text !== 'string') return false;
    try {
        return getFilter().isProfane(text);
    } catch {
        return false;
    }
}
