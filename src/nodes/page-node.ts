import { XMLNode } from '../xml-node';
import { BufferBuilder, PAGE_ORIENTATION } from '../buffer-builder';

export default class PageNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.beginPage();
    const orientation = PAGE_ORIENTATION[this.attributes.orientation?.toUpperCase() as keyof PAGE_ORIENTATION] ?? PAGE_ORIENTATION.NORTH;
    bufferBuilder.orientPage(orientation);

    const size = this.getNumberPairAttribute('size');
    if (size) {
      const origin = this.getNumberPairAttribute('origin');
      bufferBuilder.setPageSize(size, origin);
    }

    return bufferBuilder;
  }

  public close(bufferBuilder: BufferBuilder): BufferBuilder {
    return bufferBuilder.endPage();
  }
}
