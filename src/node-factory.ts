import AlignNode from './nodes/align-node';
import BarcodeNode from './nodes/barcode-node';
import BoldNode from './nodes/bold-node';
import BreakLineNode from './nodes/break-line-node';
import DocumentNode from './nodes/document-node';
import LineFeedNode from './nodes/line-feed-node';
import QRcodeNode from './nodes/qrcode-node';
import SmallNode from './nodes/small-node';
import TextNode from './nodes/text-node';
import TextLineNode from './nodes/text-line-node';
import UnderlineNode from './nodes/underline-node';
import WhiteModeNode from './nodes/white-mode-node';
import PaperCutNode from './nodes/paper-cut-node';
import ImageNode from './nodes/image-node';
import OpenCashDrawerNode from './nodes/open-cash-drawer-node';
import PrintModeNode from './nodes/print-mode';
import PageNode from './nodes/page-node';

export class NodeFactory {

  public static create(nodeType: String, node) {
    switch (nodeType) {
      case 'align':      return new AlignNode(node);
      case 'barcode':    return new BarcodeNode(node);
      case 'bold':       return new BoldNode(node);
      case 'break-line': return new BreakLineNode(node);
      case 'document':   return new DocumentNode(node);
      case 'line-feed':  return new LineFeedNode(node);
      case 'qrcode':     return new QRcodeNode(node);
      case 'small':      return new SmallNode(node);
      case 'text':       return new TextNode(node);
      case 'text-line':  return new TextLineNode(node);
      case 'underline':  return new UnderlineNode(node);
      case 'white-mode': return new WhiteModeNode(node);
      case 'paper-cut': return new PaperCutNode(node);
      case 'open-cash-drawer': return new OpenCashDrawerNode(node);
      case 'image':       return new ImageNode(node);
      case 'print-mode':  return new PrintModeNode(node);
      case 'page':        return new PageNode(node);

      default:           return null;
    }
  }

}
