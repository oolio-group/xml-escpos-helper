import { Command } from "./command";
import { MutableBuffer } from "mutable-buffer";
import PImage from "./img/pimage";
export class BufferBuilder {
  private buffer: MutableBuffer;

  constructor(private defaultSettings: boolean = true) {
    this.buffer = new MutableBuffer();

    if (this.defaultSettings) {
      this.resetCharacterSize();
      this.resetCharacterCodeTable();
    }
  }

  public end(): BufferBuilder {
    return this;
  }

  public resetCharacterCodeTable(): BufferBuilder {
    this.buffer.write(Command.ESC_t(0));
    return this;
  }

  public setCharacterSize(
    width: number = 0,
    height: number = 0
  ): BufferBuilder {
    let size = (width << 4) + height;
    this.buffer.write(Command.GS_exclamation(size));
    return this;
  }

  public resetCharacterSize(): BufferBuilder {
    this.buffer.write(Command.GS_exclamation(0));
    return this;
  }

  public startCompressedCharacter(): BufferBuilder {
    this.buffer.write(Command.ESC_M(1));
    return this;
  }

  public endCompressedCharacter(): BufferBuilder {
    this.buffer.write(Command.ESC_M(0));
    return this;
  }

  public startBold(): BufferBuilder {
    this.buffer.write(Command.ESC_E(1));
    return this;
  }

  public endBold(): BufferBuilder {
    this.buffer.write(Command.ESC_E(0));
    return this;
  }

  public startUnderline(
    underlineMode: UNDERLINE_MODE = UNDERLINE_MODE.TWO_POINTS_OF_COARSE
  ): BufferBuilder {
    this.buffer.write(Command.ESC_minus(underlineMode));
    return this;
  }

  public endUnderline(): BufferBuilder {
    this.buffer.write(Command.ESC_minus(48));
    return this;
  }

  public startAlign(alignment: ALIGNMENT): BufferBuilder {
    this.buffer.write(Command.ESC_a(alignment));
    return this;
  }

  public resetAlign(): BufferBuilder {
    return this.startAlign(ALIGNMENT.LEFT);
  }

  public startWhiteMode(): BufferBuilder {
    this.buffer.write(Command.GS_B(1));
    return this;
  }

  public endWhiteMode(): BufferBuilder {
    this.buffer.write(Command.GS_B(0));
    return this;
  }

  public startReverseMode(): BufferBuilder {
    this.buffer.write(Command.ESC_rev(1));
    return this;
  }

  public endReverseMode(): BufferBuilder {
    this.buffer.write(Command.ESC_rev(0));
    return this;
  }

  public printBarcode(
    data: string,
    barcodeSystem: BARCODE_SYSTEM,
    width: BARCODE_WIDTH = BARCODE_WIDTH.DOT_375,
    height: number = 162,
    labelFont: BARCODE_LABEL_FONT = BARCODE_LABEL_FONT.FONT_A,
    labelPosition: BARCODE_LABEL_POSITION = BARCODE_LABEL_POSITION.BOTTOM,
    leftSpacing: number = 0
  ): BufferBuilder {
    this.buffer.write(Command.GS_w(width)); // width
    this.buffer.write(Command.GS_h(height)); // height
    this.buffer.write(Command.GS_x(leftSpacing)); // left spacing
    this.buffer.write(Command.GS_f(labelFont)); // HRI font
    this.buffer.write(Command.GS_H(labelPosition)); // HRI font
    this.buffer.write(Command.GS_K(barcodeSystem, data.length)); // data is a string in UTF-8
    this.buffer.write(data, "ascii");
    return this;
  }

  public printQRcode(
    data: string,
    version: number = 1,
    errorCorrectionLevel: QR_EC_LEVEL = QR_EC_LEVEL.H,
    componentTypes: number = 8
  ): BufferBuilder {
    this.buffer.write(
      Command.ESC_Z(version, errorCorrectionLevel, componentTypes)
    );
    this.buffer.writeUInt16LE(data.length); // data is a string in UTF-8
    this.buffer.write(data, "ascii");
    return this;
  }

  public printBitmap(
    image: number[],
    width: number,
    height: number,
    scale: BITMAP_SCALE = BITMAP_SCALE.NORMAL
  ): BufferBuilder {
    //TODO
    return this;
  }

  public printText(text: string): BufferBuilder {
    this.buffer.write(text, "ascii");
    return this;
  }

  public printTextLine(text: string): BufferBuilder {
    return this.printText(text).breakLine();
  }

  public breakLine(lines: number = 0): BufferBuilder {
    this.buffer.write(Command.ESC_d(lines));
    return this;
  }

  public lineFeed(): BufferBuilder {
    this.buffer.write(Command.LF);
    return this;
  }

  public transmitStatus(statusType: STATUS_TYPE): BufferBuilder {
    this.buffer.write(Command.DLE_EOT(statusType));
    return this;
  }

  public build(): number[] {
    if (this.defaultSettings) {
      this.lineFeed();
      this.buffer.write(Command.ESC_init);
    }

    return this.buffer.flush();
  }

  /**
   * Register Paper Cut Action
   * @return BufferBuilder
   */
  public paperCut(): BufferBuilder {
    this.buffer.write(Command.GS_v(1));
    return this;
  }

  public printImage(): BufferBuilder {
    this.buffer.write(Command.ESC_ak);
    return this;
  }

  public startPImage(image, density): BufferBuilder {

    density = density || 'd24';
            let bitmapFormat;
            switch (density) {
              case 's8':
                bitmapFormat = '\x1b\x2a\x00';
                break;
              case 'd8':
                bitmapFormat = '\x1b\x2a\x01';
                break;
              case 's24':
                bitmapFormat = '\x1b\x2a\x20';
                break;
              case 'd24':
                  bitmapFormat = '\x1b\x2a\x21';
                break;
              default:
                console.warn('no bitmap format specified, using default');
                bitmapFormat = '\x1b\x2a\x00';
            }

    const EOL = "\n";

    // this.buffer.write(Command.GS_K(BARCODE_SYSTEM.UPC_A, '12345678'.length)); // data is a string in UTF-8
    // this.buffer.write('12345678', "ascii");
    // const imagePx = new PImage(image)
    if (!(image instanceof PImage)) {
      throw new TypeError("Only escpos.PImage supported");
    }
    density = density || "d24";
    var n = !!~["d8", "s8"].indexOf(density) ? 1 : 3;
    // var header = BITMAP_FORMAT["BITMAP_" + density.toUpperCase()];
    var bitmap = image.toBitmap(n * 8);

    // added a delay so the printer can process the graphical data
    // when connected via slower connection ( e.g.: Serial)
    this.breakLine(0); // set line spacing to 0
    // this.buffer.write(Command.ESC_akp());
    bitmap.data.forEach( (line) => {
      this.buffer.write(bitmapFormat);
      this.buffer.writeUInt16LE(line.length / n);
      this.buffer.write(line);
      this.buffer.write(EOL);
      // await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(true);
      //   }, 200);
      // });
    });
    // this.buffer.write(data, "ascii");
    this.paperCut()
    return this;
  }
}

export enum UNDERLINE_MODE {
  ONE_POINT_OF_COARSE = 49,
  TWO_POINTS_OF_COARSE = 50,
}

export enum ALIGNMENT {
  LEFT = 48,
  CENTER = 49,
  RIGHT = 50,
}

export enum BARCODE_SYSTEM {
  UPC_A = 65,
  UPC_E = 66,
  EAN_13 = 67,
  EAN_8 = 68,
  CODE_39 = 69,
  ITF = 70,
  CODABAR = 71,
  CODE_93 = 72,
  CODE_128 = 73,
}

export enum BARCODE_WIDTH {
  DOT_250 = 2,
  DOT_375 = 3,
  DOT_560 = 4,
  DOT_625 = 5,
  DOT_750 = 6,
}

export enum BARCODE_LABEL_FONT {
  FONT_A = 48,
  FONT_B = 49,
}

export enum BARCODE_LABEL_POSITION {
  NOT_PRINT = 48,
  ABOVE = 49,
  BOTTOM = 50,
  ABOVE_BOTTOM = 51,
}

export enum QR_EC_LEVEL {
  L = 0,
  M = 1,
  Q = 2,
  H = 3,
}

export enum BITMAP_SCALE {
  NORMAL = 48,
  DOUBLE_WIDTH = 49,
  DOUBLE_HEIGHT = 50,
  FOUR_TIMES = 51,
}

export enum STATUS_TYPE {
  PRINTER_STATUS = 1,
  OFFLINE_STATUS = 2,
  ERROR_STATUS = 3,
  PAPER_ROLL_SENSOR_STATUS = 4,
}
