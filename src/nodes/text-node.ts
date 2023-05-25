import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';

export default class TextNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {

    const size = this.getNumberPairAttribute('size');
    if (size) {
      bufferBuilder.setCharacterSize(size[0], size[1]);
    }

    let text = this.getContent().replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x3D;/g, '=').replace(/&#x2F;/g, '/').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

    bufferBuilder.printText(text);
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.resetCharacterSize();
    return bufferBuilder;
  }

}
