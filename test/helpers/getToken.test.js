const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

describe('/helpers/getToken', () => {
  it('getUserIDFromToken returns token', () => {
    const jwtDecodeStub = sinon.stub().returns({
      id: '0',
    });
    const req = {
      headers: {
        'auth-token': 'token',
      },
    };
    const mock = proxyquire('../../src/helpers/getToken.js', {
      jsonwebtoken: {
        decode: jwtDecodeStub,
      },
    });

    const response = mock.getUserIDFromToken(req);

    expect(response).equal('0');
  });
});
