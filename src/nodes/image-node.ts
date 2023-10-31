import { XMLNode } from '../xml-node';
import { BufferBuilder, RASTER_MODE } from '../buffer-builder';
import ndarray from 'ndarray';
import Image from '../image';
import upngjs from 'upng-js';

export default class ImageNode extends XMLNode {
  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    const img_data = upngjs.decode(
      Buffer.from(this.content.replace(/&#x2F/g, '/'), 'base64'),
    );

    const pixels = ndarray(
      new Uint8Array(img_data.data),
      [img_data.width | 0, img_data.height | 0, 4],
      [4, (4 * img_data.width) | 0, 1],
      0,
    );

    let mode;
    switch (this.attributes.mode) {
      case 'NORMAL':
        mode = RASTER_MODE.NORMAL;
        break;
      case 'DW':
        mode = RASTER_MODE.DOUBLE_WIDTH;
        break;
      case 'DH':
        mode = RASTER_MODE.DOUBLE_HEIGHT;
        break;
      case 'DWH':
        mode = RASTER_MODE.DOUBLE_WIDTH_HEIGHT;
        break;
      default:
        mode = RASTER_MODE.NORMAL;
    }

    bufferBuilder.printImage(new Image(pixels), mode);
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }
}
