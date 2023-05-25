import PageNode from '../../src/nodes/page-node';
import { BufferBuilder } from '../../src/buffer-builder';
import parser from 'xml-parser';

const START_PAGE = Buffer.from([27, 76]);
const ROTATE = Buffer.from([27, 84]);
const ROTATE_N = Buffer.from([27, 84, 0]);
const FORM_FEED = Buffer.from([12]);
const END = Buffer.from([10, 27, 64]);

describe('PageNode', () => {
  test('basic page mode', () => {
    const input = parser(`<page></page>`).root;

    const page = new PageNode(input);

    const output = page.draw(new BufferBuilder()).build();
    expect(output).toStrictEqual(Buffer.concat([START_PAGE, ROTATE_N, FORM_FEED, END]));
  });

  [
    ['north', 0],
    ['west', 1],
    ['south', 2],
    ['east', 3]
  ].forEach(([orientation, v]: [string, number]) => test(`${orientation} page rotation`, () => {
    const input = parser(`<page orientation="${orientation}"></page>`).root;

    const page = new PageNode(input);

    const output = page.draw(new BufferBuilder()).build();
    expect(output).toStrictEqual(Buffer.concat([START_PAGE, ROTATE, Buffer.from([v]), FORM_FEED, END]));
  }));
});
