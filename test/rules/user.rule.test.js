const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

describe('/rules/user.rule', () => {
  it('doesUserExistByEmail - returns result', async () => {
    const mock = proxyquire('../../src/rules/user.rule.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().resolves({
            id: '0',
          }),
        },
      },
    });

    const response = await mock.doesUserExistByEmail('email');

    expect(response).deep.equal({
      id: '0',
    });
  });

  it('doesUserExistByID - returns result', async () => {
    const mock = proxyquire('../../src/rules/user.rule.js', {
      '../database/entities/index.js': {
        user: {
          findOne: sinon.stub().resolves({
            id: '0',
          }),
        },
      },
    });

    const response = await mock.doesUserExistByID('0');

    expect(response).deep.equal({
      id: '0',
    });
  });
});
