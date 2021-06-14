import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';

export default class OpenCashDrawerNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder.openCashDrawer();
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }

}