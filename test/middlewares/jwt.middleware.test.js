const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

describe('/middlewares/jwt.middleware', () => {
  const res = {
    status: sinon.stub().returnsThis(),
    json: (e) => e,
  };
  const next = sinon.stub();

  it('Returns 401 - no token found', () => {
    const req = {
      headers: {},
    };
    const mock = proxyquire('../../src/middlewares/jwt.middleware.js', {});

    const response = mock(req, res, next);

    expect(next.called).equal(false);
    expect(response.success).equal(false);
    expect(response.code).equal(401);
  });

  it('Returns 401 - token could not be verified', () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
    };
    const mock = proxyquire('../../src/middlewares/jwt.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().callsArgWith(2, 'error'),
      },
    });

    const response = mock(req, res, next);

    expect(next.called).equal(false);
    expect(response.success).equal(false);
    expect(response.code).equal(401);
  });

  it('Calls next', () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
    };
    const mock = proxyquire('../../src/middlewares/jwt.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().callsArgWith(2, null),
      },
    });

    mock(req, res, next);

    expect(next.called).equal(true);
  });
});
