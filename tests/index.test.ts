import { EscPos } from '../src';
import { TEMPLATES } from '../examples/src/templates';

const INPUT = {
  title: 'Sample',
  thankyouNote: 'Welcome...!',
};

const BASIC_SAMPLE = Buffer.from('\x1Ba1\x1BE\x01\x1D!\x10Sample\x1D!\x00\x1Bd\x00\x1BE\x00\x1Ba0\x1Ba1\x1D!\x00Welcome...!\x1D!\x00\x1Bd\x00\x1Ba0\x0A\x1DVB2\x1B{\x00\x0A\x1B@');

describe('get Buffer from Template', () => {
  test('basic', () => {
    const buffer = EscPos.getBufferFromTemplate(TEMPLATES.BASIC, INPUT);
    expect(buffer).toStrictEqual(BASIC_SAMPLE);
  });
});
