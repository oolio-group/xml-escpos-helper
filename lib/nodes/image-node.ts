import { XMLNode } from "../xml-node";
import { BufferBuilder } from "../buffer-builder";
import ndarray from "ndarray";
import Image from "../image";
import pngjs from "pngjs";

const PNG = pngjs.PNG;

export default class ImageNode extends XMLNode {
  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    const img_data = PNG.sync.read(
      Buffer.from(this.content.slice("data:image/png;base64,".length), "base64")
    );

    const pixels = ndarray(
      new Uint8Array(img_data.data),
      [img_data.width | 0, img_data.height | 0, 4],
      [4, (4 * img_data.width) | 0, 1],
      0
    );

    bufferBuilder.printImage(new Image(pixels), this.attributes.density);
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }
}
