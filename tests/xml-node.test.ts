import { BufferBuilder } from '../src';
import { XMLNode } from '../src/xml-node';
import parser from 'xml-parser';

class TestNode extends XMLNode {
  public open(bufferBuilder: BufferBuilder): BufferBuilder | Promise<BufferBuilder> {
    throw new Error("Method not implemented.");
  }
  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    throw new Error("Method not implemented.");
  }

  public getNumberPairAttribute(attr: string): [number, number] {
    return super.getNumberPairAttribute(attr);
  }
}

describe('XMLNode', () => {

  [
    ['pair="1:2"', [1, 2]],
    ['', undefined],
    ['pair="1:"', undefined],
    ['pair=":2"', undefined],
    ['pair="foo:bar"', undefined],
  ].forEach(([pair, output]) => test('getNumberPairAttribute', () => {
    const node = new TestNode(parser(`<xml ${pair}/>`).root);

    expect(node.getNumberPairAttribute('pair')).toStrictEqual(output);
  }));

});
