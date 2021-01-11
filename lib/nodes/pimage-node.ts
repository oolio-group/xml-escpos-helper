import { XMLNode } from "../xml-node";
import { BufferBuilder } from "../buffer-builder";
import parseDataURI from "parse-data-uri";
import ndarray from "ndarray";
import PImage from "../img/pimage";
// import util from 'util';
// import Jimp from  'jimp';
// import ndarray from 'ndarray';
import pngjs from "pngjs";

const PNG = pngjs.PNG;

export default class PImageNode extends XMLNode {
  constructor(node: any) {
    super(node);
  }

  /**
   * [load description]
   * @param  {[type]}   url      [description]
   * @param  {[type]}   type     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  load(url, type, callback) {
    if (typeof type == "function") {
      callback = type;
      type = null;
    }
  }

  public async open(bufferBuilder: BufferBuilder): Promise<BufferBuilder> {
    // return this.load(this.attributes.image, (imagePx) => {

    // const getPixelsAsync = util.promisify(getPixels)

    // try {
      let base64Url = this.getContent();
      const bufferData = parseDataURI(base64Url);

      var png = new PNG();
      const resultNdArr = await new Promise((res, rej) => {
        png.parse(bufferData,  (err, img_data) => {
          if (err) {
            rej(err);
            return;
          }
          res(
            ndarray(
              new Uint8Array(img_data.data),
              [img_data.width | 0, img_data.height | 0, 4],
              [4, (4 * img_data.width) | 0, 1],
              0
            )
          );
        });
      });

      // const result = await getPixels(content);
      // getPixels(content,  (err, pixels) => {
      //   // if (err) return callback(err);
      //   // console.log('---------------pixels', pixels)
      //   // callback(new PImage(pixels));
      //   bufferBuilder.startPImage(pixels, this.attributes.density);

      // });
      bufferBuilder.startPImage(
        new PImage(resultNdArr),
        this.attributes.density
      );

      // .replace(/&nbsp;/g, ' ');
      // bufferBuilder.startPImage(content, this.attributes.density);
      // //   return bufferBuilder;
      // // });
      // console.log('start to print image -------------------------------------');
      // (async () => {
      // try {
      //   console.log('inside trycatch block start to print image -------------------------------------', this.attributes);

      //     const content = await getPixels(this.attributes.image,  (err, pixels) => {
      //         if (err) {
      //           console.log('getPixels error bello --------', err)
      //         };
      //     console.log('promisified result pixels------------- ', pixels)

      //         // callback(new PImage(pixels));
      //       });
      //     console.log('promisified result bello ', content)
      // } catch (err) {
      //   console.log('promisified error bello ', err)
      // }
      // })();
      // console.log('endof to print image -------------------------------------');

      // getPixels(this.attributes.image, function (err, pixels) {
      //   if (err) return callback(err);
      //   callback(new PImage(pixels));
      // });

      //     Jimp.read(this.attributes.image, (err, img) => {
      //       if (err) throw err;

      //       // console.log('till image pixels response ', img)

      //       img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      //           // console.log('till get buffer ', buffer);
      // const img_data = {width:img.bitmap.width, height:img.bitmap.height, data: img.bitmap.data};
      //           const ndArrRef = ndarray(new Uint8Array(img_data.data),
      // [img_data.width|0, img_data.height|0, 4],
      // [4, 4*img_data.width|0, 1],
      // 0)

      // try {
      //     this.adapter.open(err => {
      //         if(err) {
      //             console.error(err);
      //         } else {
      //             if(options.topFeed === undefined) {
      //                 options.topFeed = 2;
      //             }
      //             if(options.topFeed) {
      //                 this.printer.feed(options.topFeed);
      //             }

      //             this.printer.align('ct').raster(new escpos.Image(ndArrRef), null);

      //             if(options.bottomFeed === undefined) {
      //                 options.bottomFeed = 2;
      //             }
      //             if(options.bottomFeed) {
      //                 this.printer.feed(options.bottomFeed);
      //             }

      //             if(options.cut === undefined) {
      //                 options.cut = true;
      //             }
      //             if(options.cut) {
      //                 this.printer.cut();
      //             }

      //             this.printer.close();
      //         }
      //     });
      // } catch (e) {
      //     console.error(e.stack);
      // }
      // });

      // });
    // } catch (err) {
    //   console.log("pimage pixel conversion error ", err);
    // }

    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }
}
