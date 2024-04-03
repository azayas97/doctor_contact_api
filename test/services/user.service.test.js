const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../src/resources/messages.json');

describe('/services/user.service', () => {
  const mockedUser = {
    id: 1,
    email: 'test@email.com',
    password: 'pass',
    first_name: 'John',
    last_name: 'Doe',
    city: 'Hermosillo',
    state: 'Sonora',
    country: 'Hermosillo',
    phone: '+526625555555',
  };

  it('registerUserService - User already exists', async () => {
    const mock = proxyquire('../../src/services/user.service.js', {
      '../rules/user.rule.js': {
        doesUserExistByEmail: sinon.stub().resolves(mockedUser),
      },
    });

    const response = await mock.registerUserService(mockedUser);

    expect(response.success).equal(false);
    expect(response.code).equal(400);
    expect(response.message).equal(messages.services.user.emailExists);
  });

  it('registerUserService - Creates user successfully', async () => {
    const mock = proxyquire('../../src/services/user.service.js', {
      '../rules/user.rule.js': {
        doesUserExistByEmail: sinon.stub().resolves(null),
      },
      bcrypt: {
        hashSync: sinon.stub().returns('hashedPass'),
      },
      '../database/entities/index.js': {
        user: {
          create: sinon.stub(),
        },
      },
    });

    const response = await mock.registerUserService(mockedUser);

    expect(response.success).equal(true);
    expect(response.code).equal(201);
    expect(response.message).equal(messages.services.user.created);
  });

  it('editUserService - User doesnt exist', async () => {
    const mock = proxyquire('../../src/services/user.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().resolves(null),
        },
      },
    });

    const response = await mock.editUserService(mockedUser);

    expect(response.success).equal(false);
    expect(response.code).equal(400);
    expect(response.message).equal(messages.services.user.notFound);
  });

  it('editUserService - Updates user successfully', async () => {
    const mock = proxyquire('../../src/services/user.service.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().resolvesThis(),
          update: sinon.stub().resolves(mockedUser),
        },
      },
    });

    const response = await mock.editUserService(mockedUser);

    expect(response.success).equal(true);
    expect(response.code).equal(200);
    expect(response.message).equal(messages.services.user.updated);
  });
});
