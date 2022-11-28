import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';

export default class PrintModeNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    if(this.attributes.mode === 'U220')
    {
      bufferBuilder.setPrintMode(false);
    }
    else
    {
      bufferBuilder.setPrintMode(true);
    }
    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.resetAlign();
    return bufferBuilder;
  }

}
