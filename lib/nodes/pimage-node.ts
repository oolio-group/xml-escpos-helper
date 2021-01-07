import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';
import Image from '../img/pimage';

export default class PImageNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    return Image.load(this.attributes.image, (imagePx) => {

      // Image.image(imagePx, 's8')

      bufferBuilder.startPImage(imagePx, this.attributes.density);
      return bufferBuilder;
    });
    // return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }

}
