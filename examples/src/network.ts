import net from 'net';
import { EscPos } from '@tillpos/xml-escpos-helper';
const PRINTERS = [{ device_name: 'Epson', host: '10.15.0.173', port: 9100 }];

const connectToPrinter = (
  host: string,
  port: number,
  buffer: Buffer,
): Promise<unknown> => {
  return new Promise((res: (value: unknown) => void, rej) => {
    let device = new net.Socket();

    device.on('close', () => {
      if (device) {
        device.destroy();
        device = null;
      }
      res(true);
      return;
    });

    device.on('error', rej);

    device.connect(port, host, () => {
      device.write(buffer);
      device.emit('close');
    });
  });
};

export const sendDataToPrinter = async (input: any, template: string) => {
  const { host, port } = PRINTERS[0];
  const buffer = EscPos.getBufferFromTemplate(template, input);
  try {
    await connectToPrinter(host, port, (buffer as unknown) as Buffer);
  } catch (err) {
    console.log('some error', err);
  }
};
