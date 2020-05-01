const request = require('supertest');

describe('GET /healthcheck', () => {
  let req;

  before(() => {
    req = request(app).get('/healthcheck');
  });

  it('returns correctly', () => req.expect(200));
});
