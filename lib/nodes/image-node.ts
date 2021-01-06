import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';
import { Image } from '../image';

export default class ImageNode extends XMLNode {

    constructor(node: any) {
        super(node);
    }

    private resolveImage( path ) {
        Image.load( 'https://staticaltmetric.s3.amazonaws.com/uploads/2015/10/dark-logo-for-site.png', 'function', ( value ) => {
            console.log( value );
        });
        return new Promise( ( resolve, reject ) => {

        })
    }

    private async loadImage( image ) {
        return await this.resolveImage( image );
    }

    public open(bufferBuilder: BufferBuilder): BufferBuilder {

        console.log( this.loadImage( this.attributes.src ) );

        return bufferBuilder;
    }

    public close(bufferBuilder: BufferBuilder): BufferBuilder {
        return bufferBuilder;
    }

}
