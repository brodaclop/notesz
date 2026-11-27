export interface Note {
    title?: string,
    blocks: Block[],
    start: number;
}

export interface Block {
    title?: string;
    paras: string[];
}

const isSeparator = (line: string) => !!line.trim().match(/^-(-)+$/g);
const isEmpty = (line: string) => line.trim().length === 0;

const SINGLE_COLON = /(?<!:):(?!:)/;

const filterDoubleColon = (str: string) => str.replaceAll(/:+/g, ':');

export const parseNotes = (str: string): Note[] => {
    const lines = str.split('\n');
    const ret: Note[] = [];
    let currentNote: Note = {
        blocks: [],
        start: 0
    };
    let currentBlock: Block = {
        paras: []
    };
    let currentPos = 0;

    const addBlock = () => {
        if (currentBlock.paras.length > 0 || currentBlock.title) {
            currentNote.blocks.push(currentBlock);
            currentBlock = {
                paras: []
            }
        }
    };
    const addNote = () => {
        addBlock();
        if (currentNote.blocks.length > 0 || currentNote.title) {
            ret.push(currentNote);
            currentNote = {
                blocks: [],
                start: currentPos
            };
        }
    };
    lines.forEach((line) => {
        currentPos += line.length + 1;
        if (isEmpty(line)) {
                addBlock();
        } else {
            const isFirstLineOfNote = currentNote.blocks.length === 0;
            const isFirstLineOfBlock = currentBlock.paras.length === 0;
            if (isSeparator(line)) {  
                addNote();
            } else if (isFirstLineOfBlock && isFirstLineOfNote && line.match(SINGLE_COLON)?.index === 0) {
                currentNote.title = line.slice(1);
            } else if (isFirstLineOfBlock && line.match(SINGLE_COLON)) {
                const [title, rest] = line.split(SINGLE_COLON, 2);
                currentBlock.title = title;
                if (rest.trim().length > 0) {
                    currentBlock.paras.push(filterDoubleColon(rest.trim()));
                }
            } else {
                currentBlock.paras.push(filterDoubleColon(line.trim()));

            }
        } 

    });
    addNote();

    return ret;
}