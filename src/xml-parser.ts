import parser from 'xml-parser';
import { BufferBuilder } from './buffer-builder';
import { XMLNode } from './xml-node';
import { NodeFactory } from './node-factory';

export class XMLParser {

  public parser(xml: string, shouldReset: boolean = false): BufferBuilder {
    let parsedXML = parser(xml);
    return this.compile(parsedXML, shouldReset);
  }

  private compile(parsedXML: any, shouldReset: boolean = false): BufferBuilder {
    let bufferBuilder = new BufferBuilder(shouldReset);
    let rootNode = this.adapter(parsedXML.root, null);
    return rootNode.draw(bufferBuilder);
  }

  private adapter(node: any, parentNode): XMLNode {
    let xmlNode: XMLNode = NodeFactory.create(node.name, node);
    if (parentNode) parentNode.addChild(xmlNode);
    if (node.children.length > 0) {
      node.children.forEach(child => {
        this.adapter(child, xmlNode);
      });
    }
    return xmlNode;
  }

}
