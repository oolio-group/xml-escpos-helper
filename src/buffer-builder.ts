import { Command } from "./command";
import { MutableBuffer } from "mutable-buffer";
import Image from "./image";
export class BufferBuilder {
  private buffer: MutableBuffer;
  private hasGSCommand: boolean;
  private doEmphasise: boolean;

  constructor(private defaultSettings: boolean = true) {
    this.buffer = new MutableBuffer();
    this.hasGSCommand = true;
    this.doEmphasise = false;

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
    if(this.hasGSCommand)
    {
      let size = (width << 4) + height;
      this.buffer.write(Command.GS_exclamation(size));
    }
    else{
      let mode = (width>0?(1<<5):0)+(height>0?(1<<4):0)+(this.doEmphasise?(1<<3):0)+1;
      this.buffer.write(Command.ESC_exclamation(mode));
    }

    return this;
  }

  public setPrintMode(setting:boolean): BufferBuilder {
    this.hasGSCommand = setting;
    if(setting) this.resetCharacterEncoding();
    this.resetCharacterSize();
    return this;
  }

  public resetCharacterSize(): BufferBuilder {
    if(this.hasGSCommand)
    {
      this.buffer.write(Command.GS_exclamation(0));
    }
    else
    {
      this.buffer.write(Command.ESC_exclamation(1));
    }
    return this;
  }

  public resetCharacterEncoding(): BufferBuilder {
    this.buffer.write(Command.FS_ob_C_fe_utf);
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
    this.hasGSCommand? this.buffer.write(Command.ESC_E(1)):this.doEmphasise=true;
    return this;
  }

  public endBold(): BufferBuilder {
    this.hasGSCommand? this.buffer.write(Command.ESC_E(0)):this.doEmphasise=false;
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

  public printQRcode(data: string, model: number, size: number, ecLevel: number): BufferBuilder {
    let x = data.length + 3;
    let pL = Math.floor(x % 256);
    let pH = Math.floor(x / 256);

    this.buffer.write(Command.QR_MODEL(model));
    this.buffer.write(Command.QR_SIZE(size));
    this.buffer.write(Command.EC_LEVEL(ecLevel));
    this.buffer.write(Command.STORE_QR(pL, pH));
    this.buffer.write(data, "ascii");
    this.buffer.write(Command.PRINT_QR());

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
    this.buffer.write(text, "utf8");
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
    this.buffer.write(Command.GS_v(66,50));
    return this;
  }

  /**
   * Register open cash drawer action
   * @return BufferBuilder
   */
  public openCashDrawer(): BufferBuilder {
    // kick drawer 1, pin 2
    this.buffer.write(Command.CD_KICK_1());
    // kick drawer 2, pin 5
    this.buffer.write(Command.CD_KICK_2());
    return this;
  }

  public printImage(image: Image, mode: RASTER_MODE): BufferBuilder {
    if (!(image instanceof Image)) {
      throw new TypeError("not supported");
    }
    const raster = image.toRaster();
    this.buffer.write(Command.GS_v0(mode));
    this.buffer.writeUInt16LE(raster.width);
    this.buffer.writeUInt16LE(raster.height);
    this.buffer.write(raster.data);
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

export enum RASTER_MODE {
  NORMAL = 0,
  DOUBLE_WIDTH = 1,
  DOUBLE_HEIGHT = 2,
  DOUBLE_WIDTH_HEIGHT = 3,
}
