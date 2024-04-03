const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect, assert } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../src/resources/messages.json');
const Doctor = require('../../src/models/doctor.model');

describe('/services/doctor.service', () => {
  const mockedDoctor = new Doctor({
    id: 1,
    name: 'Doctor',
    department: 'General',
    clinic: 'Clinic',
    phone: '+526625555555',
    user_id: 1,
  });

  it('getAllDoctorsByUserIDService - returns response', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findAll: sinon.stub().resolves([]),
        },
      },
    });

    const response = await mock.getAllDoctorsByUserIDService(1);

    expect(response.success).equal(true);
    expect(response.data).deep.equal([]);
  });

  it('getDoctorByIDService - returns null response', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolves(null),
        },
      },
    });

    const response = await mock.getDoctorByIDService(1);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.services.doctor.notFound);
    expect(response.data).equal(null);
  });

  it('getDoctorByIDService - returns doctor', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolves(mockedDoctor),
        },
      },
    });

    const response = await mock.getDoctorByIDService(1);

    expect(response.success).equal(true);
    expect(response.message).equal(null);
    expect(response.data).deep.equal(mockedDoctor);
  });

  it('createDoctorService - returns response', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          create: sinon.stub().resolves(mockedDoctor),
        },
      },
    });

    const response = await mock.createDoctorService(1);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.doctor.created);
    expect(response.data).deep.equal(mockedDoctor);
  });

  it('updateDoctorService - no doctor found', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolves(null),
        },
      },
    });

    const response = await mock.updateDoctorService(1);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.services.doctor.notFound);
    expect(response.data).equal(null);
  });

  it('updateDoctorService - updates doctor successfully', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolvesThis(),
          update: sinon.stub().resolves(mockedDoctor),
        },
      },
    });

    const response = await mock.updateDoctorService(1);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.doctor.updated);
    expect(response.data).deep.equal(mockedDoctor);
  });

  it('deleteDoctorByIDService - no doctor found', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolves(null),
        },
      },
    });

    const response = await mock.deleteDoctorByIDService(1);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.services.doctor.notFound);
    expect(response.data).equal(null);
  });

  it('deleteDoctorByIDService - throws error while deleting doctor', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolvesThis(),
          destroy: sinon.stub().resolves(null),
        },
      },
    });

    try {
      await mock.deleteDoctorByIDService(1);

      assert.fail('Expected exception.');
    } catch (err) {
      expect('Could not delete doctor.', err.message);
    }
  });

  it('deleteDoctorByIDService - updates doctor successfully', async () => {
    const mock = proxyquire('../../src/services/doctor.service.js', {
      '../database/entities/index.js': {
        doctor: {
          findOne: sinon.stub().resolvesThis(),
          destroy: sinon.stub().resolves(mockedDoctor),
        },
      },
    });

    const response = await mock.deleteDoctorByIDService(1);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.doctor.deleted);
    expect(response.data).equal(null);
  });
});
