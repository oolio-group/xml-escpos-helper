import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';

export default class PImageNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.startPImage(this.attributes.image, this.attributes.density);
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }

}
