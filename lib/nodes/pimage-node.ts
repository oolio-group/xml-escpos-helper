import { XMLNode } from "../xml-node";
import { BufferBuilder } from "../buffer-builder";
// import parseDataURI from "parse-data-uri";
import ndarray from "ndarray";
import PImage from "../img/pimage";
// import util from 'util';
// import Jimp from  'jimp';
// import ndarray from 'ndarray';
import pngjs from "pngjs";
// import UPNGJS from 'upng-js'


const PNG = pngjs.PNG;

export default class PImageNode extends XMLNode {
  constructor(node: any) {
    super(node);
  }


  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    // const bufferData = parseDataURI(this.content);

    // var png = new PNG();
    // const resultNdArr = await new Promise((res, rej) => {
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

    const img_data = PNG.sync.read(Buffer.from(this.content.slice('data:image/png;base64,'.length), 'base64'));

    // const img_data = UPNGJS.decode(bufferData.data)
          const pixels = ndarray(
            new Uint8Array(img_data.data),
            [img_data.width | 0, img_data.height | 0, 4],
            [4, (4 * img_data.width) | 0, 1],
            0
          )


    bufferBuilder.startPImage(new PImage(pixels), this.attributes.density);
    // bufferBuilder.startPImage();
    console.log('start printing image')
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }
}
