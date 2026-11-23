import { parseNotes } from "./note-parser";
import { describe, expect, it } from 'vitest'

describe('parseNotes', () => {
    it('parses empty string', () => {
        const uut = parseNotes('');
        expect(uut).toEqual([]);
    });

    it('parses single line', () => {
        const uut = parseNotes('asdf');
        expect(uut).toEqual([{ blocks: [{ paras: ['asdf'] }], start: 0 }]);
    });

    it('parses multiple lines', () => {
        const uut = parseNotes('asdf\nxvcf\nqwer');
        expect(uut).toEqual([{
            blocks: [
                { paras: ["asdf", "xvcf", "qwer"] },
            ],
            start: 0
        }]);
    });

    it('parses note title', () => {
        const uut = parseNotes(':asdf');
        expect(uut).toEqual([{ title: 'asdf', blocks: [], start: 0 }]);
    });


    it('parses block title', () => {
        const uut = parseNotes('my title: asdf\nxvcf\nqwer');
        expect(uut).toEqual([{
            blocks: [
                { title: 'my title', paras: ["asdf", "xvcf", "qwer"] },
            ],
            start: 0
        }]);
    });

    it('parses fake block title', () => {
        const uut = parseNotes('asdf\nfake title: xvcf\nqwer');
        expect(uut).toEqual([{
            blocks: [
                { paras: ["asdf", "fake title: xvcf", "qwer"] },
            ],
            start: 0
        }]);
    });


    it('parses multiple blocks', () => {
        const uut = parseNotes('asdf\n\nxvcf\n\nqwer');
        expect(uut).toEqual([{
            blocks: [
                { paras: ["asdf"] },
                { paras: ["xvcf"] }, 
                { paras: ["qwer"] },
            ],
            start: 0
        }]);
    });


    it('parses multiple notes', () => {
        const uut = parseNotes('1\n--\n2\n--\n3');
        expect(uut).toEqual([
            { blocks: [{ paras: ['1'] }], start: 0 },
            { blocks: [{ paras: ['2'] }], start: 5 },
            { blocks: [{ paras: ['3'] }], start: 10 }
        ]);
    });

});