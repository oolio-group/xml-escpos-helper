import { sendDataToPrinter } from './network';
import { TEMPLATES } from './templates';
import { getBorderCharacters, table } from 'table';

const printTable = async () => {
  const versions = [
    ['React', '16.8'],
    ['Angular', '9'],
    ['Ember', '3.16'],
  ];

  const tableData = table(versions, {
    border: getBorderCharacters(`void`),
    drawHorizontalLine: () => {
      return false;
    },
  });

  await sendDataToPrinter({ tableData }, TEMPLATES.TABLE);
};

printTable();
