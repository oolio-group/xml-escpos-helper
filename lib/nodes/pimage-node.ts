import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';
import PImage from '../img/pimage';

export default class PImageNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    return PImage.load(this.attributes.image, (imagePx) => {


      bufferBuilder.startPImage(imagePx, this.attributes.density);
      return bufferBuilder;
    });
    // return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }

}
