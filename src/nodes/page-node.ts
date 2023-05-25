import { XMLNode } from '../xml-node';
import { BufferBuilder, PAGE_ORIENTATION } from '../buffer-builder';

export default class PageNode extends XMLNode {

  constructor(node: any) {
    super(node);
  }

  public open(bufferBuilder: BufferBuilder): BufferBuilder {
    bufferBuilder.beginPage();
    var orientation = PAGE_ORIENTATION.NORTH;
    switch (this.attributes.orientation) {
      case 'north':
        orientation = PAGE_ORIENTATION.NORTH;
        break;
      case 'west':
        orientation = PAGE_ORIENTATION.WEST;
        break;
      case 'south':
        orientation = PAGE_ORIENTATION.SOUTH;
        break;
      case 'east':
        orientation = PAGE_ORIENTATION.EAST;
        break;
    }
    bufferBuilder.rotatePage(orientation);

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
