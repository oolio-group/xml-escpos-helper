import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';
import getPixels from "get-pixels";
import util from 'util';


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


  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    // return this.load(this.attributes.image, (imagePx) => {

    const getPixelsAsync = util.promisify(getPixels)

      // bufferBuilder.startPImage(imagePx, this.attributes.density);
    //   return bufferBuilder;
    // });
    (async () => {
      try {
          const content = await getPixelsAsync(this.attributes.image);
          console.log('promisified result bello ', content)
      } catch (err) {
        console.log('promisified error bello ', err)
      }
    })();

    // getPixels(this.attributes.image, function (err, pixels) {
    //   if (err) return callback(err);
    //   callback(new PImage(pixels));
    // });
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }

}
