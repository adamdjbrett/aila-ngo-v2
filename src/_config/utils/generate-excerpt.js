import RemoveMarkdown from 'remove-markdown';

  // --------------------- Strategy taken from https://www.williamkillerud.com/blog/blog-post-excerpts-in-11ty/

export const generateExcerpt = (file) => {
    if (!file.data.date) {
        // Only do this for content pages (that have a date which denotes either a post or page from the export).
        return;
    }

    // I use https://www.npmjs.com/package/remove-markdown here,
    let plaintext = RemoveMarkdown(file.content).trim();

    // End the description at a period (inclusive) or newline (not)
    // somewhere around the preferredLength mark.

    let preferredLength = 200;
    let dot = plaintext.indexOf(".", preferredLength) + 1;
    let newline = plaintext.indexOf("\n", preferredLength);

    // Avoid substringing to the empty string
    if (dot === -1) dot = plaintext.length;
    if (newline === -1) newline = plaintext.length;

    

    file.excerpt = (plaintext.length > preferredLength) ? (plaintext.slice(0, preferredLength) + "....") : plaintext;
}