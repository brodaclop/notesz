export const HELP_TEXT = `
:notesz
This simple tool turns vaguely formatted notes into a series of note cards.
(These notes are stored in your browser, no server is involved.)
---
You can start a new card by typing a line that begins with two or more minus(\`-\`) characters
---
Each note consists of one or more blocks.

An empty line will put the subsequent text in a new block.

Of course you can have as many blocks as you want.
And you can have multiple paragraphs in a single block.
Simply start the next paragraph on a new line.
---
:Note titles
You can add a title to your note by starting its first line with a colon (\`::\`)

Block titles: these are also possible, here the first line of a block should contain a colon(\`::\`), the text before it will become the block title, the rest will form the first paragraph
---
You may have noticed that in the previous note I used two colons but only one was displayed. You can use a double-colon to avoid mistakenly marking something as a title when all you wanted was to type ::
---
You can also use simple Markdown to _highlight_ ~~certain~~ **words** or [link](https:://kozterulethasznalatienge.day) to other websites.
---
Oh, and clicking on a note card will highlight its source text in the editor.

And that's about it.
`