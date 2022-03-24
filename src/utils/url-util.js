/**
 * Validates if a string is a valid URL based on nodejs criteria.
 * @param {string} url 
 * @returns True is it's a valid url and false if it isn't.
 */
export function isValidHttpUrl(url) {
    let isUrl;

    try {
        isUrl = new URL(url);
    } catch (_) {
        return false;  
    }
    
    return isUrl.protocol === "http:" || isUrl.protocol === "https:";
}