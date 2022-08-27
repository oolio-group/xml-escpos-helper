import { XMLNode } from '../xml-node';
import { BufferBuilder, QR_EC_LEVEL } from '../buffer-builder';

export default class QRcodeNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    let qrModel, qrSize, ecLevel;

    switch (this.attributes.model) {
      case '1':
        qrModel = 49; break;
      case '2':
        qrModel = 50; break;
      default:
        qrModel = 50;
    }

    if (/\d+/.test(this.attributes.size)) {
      qrSize = parseInt(this.attributes.size);
    }
    else {
      qrSize = 8;
    }

    switch (this.attributes.ecl) {
      case 'L':
        ecLevel = 48; break;
      case 'M':
        ecLevel = 49; break;
      case 'Q':
        ecLevel = 50; break;
      case 'H':
        ecLevel = 51; break;
      default:
        ecLevel = 48;
    }

    if (this.content) {
      let url = this.content.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x3D;/g, '=').replace(/&#x2F;/g, '/').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
      bufferBuilder.printQRcode(url, qrModel, qrSize, ecLevel);
    }

    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder;
  }

}
