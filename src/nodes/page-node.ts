import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';

export default class PageNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.beginPage();
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder.endPage();
  }
}
