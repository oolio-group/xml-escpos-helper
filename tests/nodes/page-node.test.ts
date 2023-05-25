import PageNode from '../../src/nodes/page-node';
import { BufferBuilder } from '../../src/buffer-builder';
import parser from 'xml-parser';

const START_PAGE = Buffer.from([27, 76]);
const FORM_FEED = Buffer.from([12]);
const END = Buffer.from([10, 27, 64]);

describe('PageNode', () => {
  test('basic page mode', () => {
    const input = parser(`<page></page>`).root

    const page = new PageNode(input);

    const output = page.draw(new BufferBuilder()).build();
    expect(output).toStrictEqual(Buffer.concat([START_PAGE, FORM_FEED, END]));
  });
});
