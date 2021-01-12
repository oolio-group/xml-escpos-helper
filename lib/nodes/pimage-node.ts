import { XMLNode } from "../xml-node";
import {
  BARCODE_LABEL_FONT,
  BARCODE_LABEL_POSITION,
  BARCODE_SYSTEM,
  BARCODE_WIDTH,
  BufferBuilder,
} from "../buffer-builder";
// import parseDataURI from "parse-data-uri";
// import ndarray from "ndarray";
// import pngjs from "pngjs";

// const PNG = pngjs.PNG;

export default class PImageNode extends XMLNode {
  constructor(node: any) {
    super(node);
  }

  public async open(bufferBuilder: BufferBuilder): Promise<BufferBuilder> {
    // const bufferData = parseDataURI(this.content);

    // var png = new PNG();
    // await new Promise((res, rej) => {
    //   png.parse(bufferData.data, (err, img_data) => {
    //     if (err) {
    //       rej(err);
    //       return;
    //     }
    //     res(
    //       ndarray(
    //         new Uint8Array(img_data.data),
    //         [img_data.width | 0, img_data.height | 0, 4],
    //         [4, (4 * img_data.width) | 0, 1],
    //         0
    //       )
    //     );
    //   });
    // });
    // bufferBuilder.startPImage(new PImage(resultNdArr), this.attributes.density);

    bufferBuilder.printBarcode(
      "123456",
      BARCODE_SYSTEM.UPC_A,
      BARCODE_WIDTH.DOT_250,
      162,
      BARCODE_LABEL_FONT.FONT_A,
      BARCODE_LABEL_POSITION.BOTTOM,
      0
    );
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }
}
