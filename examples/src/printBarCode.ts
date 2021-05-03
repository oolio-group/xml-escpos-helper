import { sendDataToPrinter } from './network';
import { TEMPLATES } from './templates';

const printBarCode = async () => {
  const input = {
    barcode: '12345678',
  };

  await sendDataToPrinter(input, TEMPLATES.BAR_CODE);
};

printBarCode();
