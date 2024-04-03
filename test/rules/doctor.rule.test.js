const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

describe('/rules/doctor.rule', () => {
  it('isUserIdAllowed - returns result', async () => {
    const mock = proxyquire('../../src/rules/doctor.rule.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolves({
            id: '0',
          }),
        },
      },
    });

    const response = await mock.isUserIdAllowed(1, 1);

    expect(response).deep.equal({
      id: '0',
    });
  });
});
