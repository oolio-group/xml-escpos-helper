import { sendDataToPrinter } from './network';
import { TEMPLATES } from './templates';

const printBasic = async () => {
  const input = {
    title: 'Sample',
    thankyouNote: 'Welcome...!'
  };

  await sendDataToPrinter(input, TEMPLATES.BASIC);
};

printBasic();
