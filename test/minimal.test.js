import { getZensenServer } from '../src';
import startMinimal from './resources/minimal';

describe('minimal', () => {
  before(() => {
    startMinimal();
  });

  after(() => {
    getZensenServer().server.close();
  });

  it('starts a server', () => expect(getZensenServer().server.listening).to.be.true);
});
