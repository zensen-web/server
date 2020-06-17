import request from 'supertest';
import { getZensenServer } from '../src';
import startServer from './resources/nested-routes';

describe('minimal', () => {
  let req;
  before(() => {
    startServer();
  });

  after(() => {
    getZensenServer().server.close();
  });

  context('when hitting route without parameters', () => {
    beforeEach(() => {
      req = request(getZensenServer().server).get('/this/route/says/hi');
    });

    it('returns 200', () => req.expect(200));
    it('returns correct response', () => req.expect((res) => expect(res.text).to.deep.equal('<div>thing</div>')));
  });

  context('when hitting nested route without parameters', () => {
    beforeEach(() => {
      req = request(getZensenServer().app).get('/this/route/says/hi/you');
    });

    it('returns 200', () => req.expect(200));
    it('returns correct response', () => req.expect((res) => expect(res.text).to.deep.equal('<div>you</div>')));
  });

  context('when hitting post route without parameters', () => {
    beforeEach(() => {
      req = request(getZensenServer().app).post('/this/route/says/hi');
    });

    it('returns 200', () => req.expect(200));
    it('returns correct response', () => req.expect((res) => expect(res.text).to.deep.equal('<div>post</div>')));
  });

  context('when hitting route with parameters', () => {
    beforeEach(() => {
      req = request(getZensenServer().app).get('/this/route/says/hi/sean');
    });

    it('returns 200', () => req.expect(200));
    it('returns param correctly', () => req.expect((res) => expect(res.body).to.deep.equal({ to: 'sean' })));
  });

  context('when hitting route with nested parameters', () => {
    beforeEach(() => {
      req = request(getZensenServer().app).get('/this/route/says/hi/sean/you');
    });

    it('returns 200', () => req.expect(200));
    it('returns param correctly', () => req.expect((res) => expect(res.body).to.deep.equal({ to: 'sean' })));
  });

  it('starts a server', () => expect(getZensenServer().server.listening).to.be.true);
});
