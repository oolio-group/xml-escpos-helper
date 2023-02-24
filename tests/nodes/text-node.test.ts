import TextNode from '../../src/nodes/text-node';
import TextLineNode from '../../src/nodes/text-line-node';
import { BufferBuilder } from '../../src/buffer-builder';
import parser from 'xml-parser';

const RESET = Buffer.from([29, 33, 0]);
const FEED = Buffer.from([27, 100, 0]);
const END = Buffer.from([10, 27, 64]);

const TEST_CASES = [
  ['empty text', '', ''],
  ['simple text', 'simple', 'simple'],
  ['non-breaking space', '&nbsp;', ' '],
  ['ampersand', '&amp;', '&'],
  ['equal sign', '&#x3D;', '='],
  ['forward slash', '&#x2F;', '/'],
  ['less than', '&lt;', '<'],
  ['greater than', '&gt;', '>'],
  ['apostrophe', '&#39;', '\''],
  ['quote', '&quot;', '"'],
];

describe('TextNode', () => {
  TEST_CASES.forEach(([name, string, expected]) => test(name, () => {
    const input = parser(`<text>${string}</text>`).root;

    const text = new TextNode(input);

    const output = text.draw(new BufferBuilder()).build();
    expect(output).toStrictEqual(Buffer.concat([Buffer.from(expected), RESET, END]));
  }));
});

describe('TextLineNode', () => {
  TEST_CASES.forEach(([name, string, expected]) => test(name, () => {
    const input = parser(`<text-line>${string}</text-line>`).root;

    const text = new TextLineNode(input);

    const output = text.draw(new BufferBuilder()).build();
    expect(output).toStrictEqual(Buffer.concat([Buffer.from(expected), RESET, FEED, END]));
  }));
});
