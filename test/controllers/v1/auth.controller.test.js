const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../../src/resources/messages.json');
const Token = require('../../../src/models/token.model.js');
const Constants = require('../../../src/utils/constants.util.js');

describe('/controllers/v1/auth.controller', () => {
  const res = {
    status: sinon.stub().returnsThis(),
    json: (e) => e,
    cookie: sinon.stub().returnsThis(),
  };

  it('loginUser - Returns 400 if fields are missing', async () => {
    const loginUserStub = sinon.stub().resolves(null);

    const req = {
      body: {},
    };

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        loginUserService: loginUserStub,
      },
    });

    const response = await mock.loginUser(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.badRequest);
  }).retries(2);

  it('loginUser - Catches error and returns 500', async () => {
    const testEmail = 'test@email.com';
    const loginUserStub = sinon.stub().throws(new Error('Dang'));

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        loginUserService: loginUserStub,
      },
    });

    const req = {
      body: {
        email: testEmail,
        password: 'testPass',
      },
    };

    const response = await mock.loginUser(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });

  it('loginUser - Returns 200', async () => {
    const testEmail = 'test@email.com';
    const loginUserStub = sinon.stub().resolves({
      success: true,
      code: 200,
      message: messages.services.auth.successLogin,
      data: {
        data: new Token(
          testEmail,
          'token',
          Constants.EXPIRE_TIME,
        ),
        id: '1',
      },
    });

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        loginUserService: loginUserStub,
      },
    });

    const req = {
      body: {
        email: testEmail,
        password: 'testPass',
      },
    };

    const response = await mock.loginUser(req, res);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.auth.successLogin);
  });

  it('changePassword - Returns 400 if fields are missing', async () => {
    const changeUserPasswordStub = sinon.stub().resolves(null);

    const req = {
      body: {},
    };

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        changeUserPasswordService: changeUserPasswordStub,
      },
    });

    const response = await mock.changePassword(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.badRequest);
  });

  it('changePassword - Catches error and returns 500', async () => {
    const changeUserPasswordStub = sinon.stub().throws(new Error('Dang'));

    const req = {
      body: {
        email: 'test@email.com',
        oldPassword: 'pastPass',
        newPassword: 'newPass',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        changeUserPasswordService: changeUserPasswordStub,
      },
    });

    const response = await mock.changePassword(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });

  it('changePassword - Returns 200', async () => {
    const changeUserPasswordStub = sinon.stub().resolves({
      success: true,
      code: 200,
      message: messages.services.auth.passwordChanged,
      data: null,
    });

    const req = {
      body: {
        email: 'test@email.com',
        oldPassword: 'pastPass',
        newPassword: 'newPass',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        changeUserPasswordService: changeUserPasswordStub,
      },
    });

    const response = await mock.changePassword(req, res);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.auth.passwordChanged);
  });

  it('exchangeSession - Returns 200', async () => {
    const exchangeSessionStub = sinon.stub().resolves({
      success: true,
      code: Constants.OKAY,
      message: null,
      data: 'token',
    });

    const req = {
      body: {
        sessionId: 'sessionId',
        userId: 'userId',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        exchangeSessionService: exchangeSessionStub,
      },
    });

    const response = await mock.exchangeSession(req, res);

    expect(response.success).equal(true);
    expect(response.data).equal('token');
  });

  it('exchangeSession - Throws an error on service call', async () => {
    const exchangeSessionStub = sinon.stub().throws(new Error('Error'));

    const req = {
      body: {
        sessionId: 'sessionId',
        userId: 'userId',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {
      '../../services/auth.service.js': {
        exchangeSessionService: exchangeSessionStub,
      },
    });

    const response = await mock.exchangeSession(req, res);

    expect(response.success).equal(false);
    expect(response.data).equal('Error');
  });

  it('logout - logs out successfully', () => {
    const mock = proxyquire('../../../src/controllers/v1/auth.controller.js', {});
    const req = {};

    const response = mock.logout(req, res);

    expect(response.success).equal(true);
    expect(response.code).equal(Constants.OKAY);
    expect(response.message).equal(messages.services.auth.loggedOut);
  });
});
