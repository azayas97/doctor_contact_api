const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../src/resources/messages.json');
const Token = require('../../src/models/token.model');
const Constants = require('../../src/utils/constants.util');

describe('/services/auth.service', () => {
  it('loginUserService - finds no user', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().returns(null),
        },
      },
    });

    const response = await mock.loginUserService('test@email.com', 'password');

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.services.auth.noUser);
  });

  it('loginUserService - password is incorrect', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().returns({
            password: 'pass',
          }),
        },
      },
      bcrypt: {
        compareSync: sinon.stub().returns(false),
      },
    });

    const response = await mock.loginUserService('test@email.com', 'wrongPassword');

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.services.auth.wrongPass);
  });

  it('loginUserService - returns successful response', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().returns({
            id: '1',
            password: 'pass',
          }),
        },
        token: {
          create: sinon.stub().returns({
            session_id: 'sessionId',
          }),
        },
      },
      bcrypt: {
        compareSync: sinon.stub().returns(true),
      },
      jsonwebtoken: {
        sign: sinon.stub().returns('token'),
      },
    });

    const response = await mock.loginUserService('test@email.com', 'pass');

    expect(response.success).equal(true);
    expect(response.code).equal(200);
    expect(response.message).equal(messages.services.auth.successLogin);
    expect(response.data.data).deep.equal(
      new Token(
        'test@email.com',
        'sessionId',
        Constants.EXPIRE_TIME,
      ),
    );
  });

  it('changeUserPasswordService - finds no user', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().returns(null),
        },
      },
    });

    const response = await mock.changeUserPasswordService('test@email.com', 'pass', 'newPass');

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.services.auth.noUser);
  });

  it('changeUserPasswordService - password is incorrect', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().returns({
            password: 'pass',
          }),
        },
      },
      bcrypt: {
        compareSync: sinon.stub().returns(false),
      },
    });

    const response = await mock.changeUserPasswordService('test@email.com', 'pass', 'newPass');

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.services.auth.wrongPass);
  });

  it('changeUserPasswordService - returns successful response', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().returnsThis(),
          update: sinon.stub(),
        },
      },
      bcrypt: {
        compareSync: sinon.stub().returns(true),
        hashSync: sinon.stub(),
      },
    });

    const response = await mock.changeUserPasswordService('test@email.com', 'pass', 'newPass');

    expect(response.success).equal(true);
    expect(response.code).equal(200);
    expect(response.message).equal(messages.services.auth.passwordChanged);
  });

  it('exchangeSessionService - returns unauthorized token not found', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        token: {
          findOne: sinon.stub().resolves(null),
        },
      },
    });

    const response = await mock.exchangeSessionService('sessionId', 'userId');

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.services.auth.sessionExpired);
  });

  it('exchangeSessionService - returns unauthorized expired token', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        token: {
          findOne: sinon.stub().resolves({
            expire_date: new Date(new Date().setDate(new Date().getDate() - 5)),
            token: 'token',
          }),
        },
      },
    });

    const response = await mock.exchangeSessionService('sessionId', 'userId');

    expect(response.success).equal(false);
    expect(response.code).equal(401);
    expect(response.message).equal(messages.services.auth.sessionExpired);
  });

  it('exchangeSessionService - returns successful response', async () => {
    const mock = proxyquire('../../src/services/auth.service.js', {
      '../database/entities/index.js': {
        token: {
          findOne: sinon.stub().resolves({
            expire_date: new Date(new Date().setDate(new Date().getDate() + 5)),
            token: 'token',
          }),
        },
      },
    });

    const response = await mock.exchangeSessionService('sessionId', 'userId');

    expect(response.success).equal(true);
    expect(response.code).equal(200);
    expect(response.message).equal(null);
    expect(response.data).equal('token');
  });
});
