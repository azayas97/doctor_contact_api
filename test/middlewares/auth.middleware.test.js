const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../src/resources/messages.json');

describe('/middlewares/auth.middleware', () => {
  const res = {
    status: sinon.stub().returnsThis(),
    json: (e) => e,
  };
  const next = sinon.stub();

  it('userIdCheck - jwt not verified returns 401', () => {
    const req = {
      headers: {},
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().throws(new Error('Dang')),
      },
    });

    const response = mock.userIdCheck(req, res, next);

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.errors.expiredSession);
  });

  it('userIdCheck - ids do not match returns 403', () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      params: {
        userId: '999',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().returns({
          id: 1,
        }),
      },
    });

    const response = mock.userIdCheck(req, res, next);

    expect(response.success).equal(false);
    expect(response.code).equal(403);
    expect(response.message).equal(messages.errors.forbidden);
  });

  it('userIdCheck - next is called', () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      params: {
        userId: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().returns({
          id: 1,
        }),
      },
    });

    mock.userIdCheck(req, res, next);

    expect(next.called).equal(true);
  });

  it('isUserAllowedCheck - cannot verify jwt returns 401', async () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      params: {
        id: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().throws(new Error('Dang')),
      },
    });

    const response = await mock.isUserAllowedCheck(req, res, next);

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.errors.expiredSession);
  });

  it('isUserAllowedCheck - User is not allowed returns 403', async () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      params: {
        id: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().returns({
          id: 1,
        }),
      },
      '../rules/doctor.rule.js': {
        isUserIdAllowed: sinon.stub().resolves(false),
      },
    });

    const response = await mock.isUserAllowedCheck(req, res, next);

    expect(response.success).equal(false);
    expect(response.code).equal(403);
    expect(response.message).equal(messages.errors.forbidden);
  });

  it('isUserAllowedCheck - Next is called', async () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      params: {
        id: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().returns({
          id: 1,
        }),
      },
      '../rules/doctor.rule.js': {
        isUserIdAllowed: sinon.stub().resolves(true),
      },
    });

    await mock.isUserAllowedCheck(req, res, next);

    expect(next.called).equal(true);
  });

  it('isUserActionAllowedCheck - cannot verify jwt returns 401', async () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      body: {
        id: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().throws(new Error('Dang')),
      },
    });

    const response = await mock.isUserActionAllowedCheck(req, res, next);

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.errors.expiredSession);
  });

  it('isUserActionAllowedCheck - User is not allowed returns 403', async () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      body: {
        id: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().returns({
          id: 1,
        }),
      },
      '../rules/doctor.rule.js': {
        isUserIdAllowed: sinon.stub().resolves(false),
      },
    });

    const response = await mock.isUserActionAllowedCheck(req, res, next);

    expect(response.success).equal(false);
    expect(response.code).equal(403);
    expect(response.message).equal(messages.errors.forbidden);
  });

  it('isUserActionAllowedCheck - Next is called', async () => {
    const req = {
      headers: {
        'auth-token': 'token',
      },
      body: {
        id: '1',
      },
    };

    const mock = proxyquire('../../src/middlewares/auth.middleware.js', {
      jsonwebtoken: {
        verify: sinon.stub().returns({
          id: 1,
        }),
      },
      '../rules/doctor.rule.js': {
        isUserIdAllowed: sinon.stub().resolves(true),
      },
    });

    await mock.isUserActionAllowedCheck(req, res, next);

    expect(next.called).equal(true);
  });
});
