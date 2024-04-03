const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../../src/resources/messages.json');
const Response = require('../../../src/models/response.model.js');

describe('/controllers/v1/user.controller', () => {
  const res = {
    status: sinon.stub().returnsThis(),
    json: (e) => e,
  };

  it('registerUser - returns 200', async () => {
    const req = {
      body: {
        email: 'test@email.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        city: 'Hermosillo',
        state: 'Sonora',
        country: 'Mexico',
        phone: '+5266255555555',
      },
    };

    const registerUserStub = sinon.stub().resolves(
      new Response(true, 200, messages.services.user.created, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/user.controller.js', {
      '../../services/user.service.js': {
        registerUserService: registerUserStub,
      },
    });

    const response = await mock.registerUser(req, res);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.user.created);
  });

  it('registerUser - returns 400 with empty fields', async () => {
    const req = {
      body: {},
    };

    const registerUserStub = sinon.stub().resolves(
      new Response(true, 200, messages.services.user.created, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/user.controller.js', {
      '../../services/user.service.js': {
        registerUserService: registerUserStub,
      },
    });

    const response = await mock.registerUser(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.badRequest);
  });

  it('registerUser - catches error and returns 500', async () => {
    const req = {
      body: {
        email: 'test@email.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        city: 'Hermosillo',
        state: 'Sonora',
        country: 'Mexico',
        phone: '+5266255555555',
      },
    };

    const registerUserStub = sinon.stub().throws(
      new Error('Dang'),
    );

    const mock = proxyquire('../../../src/controllers/v1/user.controller.js', {
      '../../services/user.service.js': {
        registerUserService: registerUserStub,
      },
    });

    const response = await mock.registerUser(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });

  it('editUser - returns 200', async () => {
    const req = {
      body: {
        id: '0',
      },
    };

    const editUserStub = sinon.stub().resolves(
      new Response(true, 200, messages.services.user.updated, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/user.controller.js', {
      '../../services/user.service.js': {
        editUserService: editUserStub,
      },
    });

    const response = await mock.editUser(req, res);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.user.updated);
  });

  it('editUser - returns 400 with no id', async () => {
    const req = {
      body: {},
    };

    const editUserStub = sinon.stub().resolves(
      new Response(true, 200, messages.services.user.updated, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/user.controller.js', {
      '../../services/user.service.js': {
        editUserService: editUserStub,
      },
    });

    const response = await mock.editUser(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.user.idMissing);
  });

  it('editUser - catches error and returns 500', async () => {
    const req = {
      body: {
        id: '0',
      },
    };

    const editUserStub = sinon.stub().throws(
      new Error('Dang'),
    );

    const mock = proxyquire('../../../src/controllers/v1/user.controller.js', {
      '../../services/user.service.js': {
        editUserService: editUserStub,
      },
    });

    const response = await mock.editUser(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });
});
