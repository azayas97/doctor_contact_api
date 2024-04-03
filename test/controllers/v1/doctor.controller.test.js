const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const {
  describe,
  it,
} = require('mocha');

const messages = require('../../../src/resources/messages.json');
const Response = require('../../../src/models/response.model.js');

describe('/controllers/v1/doctor.controller', () => {
  const res = {
    status: sinon.stub().returnsThis(),
    json: (e) => e,
  };

  it('getAllDoctorsByUserID - returns 200', async () => {
    const req = {
      params: {
        id: 0,
      },
    };

    const getAllDoctorsStub = sinon.stub().resolves(
      new Response(true, 200, null, []),
    );

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        getAllDoctorsByUserIDService: getAllDoctorsStub,
      },
    });

    const response = await mock.getAllDoctorsByUserID(req, res);

    expect(response.success).equal(true);
  });

  it('getDoctorByID - returns 200', async () => {
    const req = {
      params: {
        id: '0',
      },
    };

    const getDoctorStub = sinon.stub().resolves(
      new Response(true, 200, null, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        getDoctorByIDService: getDoctorStub,
      },
    });

    const response = await mock.getDoctorByID(req, res);

    expect(response.success).equal(true);
  });

  it('getDoctorByID - returns 400 with incomplete id', async () => {
    const req = {
      params: {},
    };

    const getDoctorStub = sinon.stub().resolves(
      new Response(true, 200, null, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        getDoctorByIDService: getDoctorStub,
      },
    });

    const response = await mock.getDoctorByID(req, res);

    expect(response.success).equal(false);
  });

  it('getDoctorByID - Catches error and returns 500', async () => {
    const req = {
      params: {
        id: '0',
      },
    };

    const getDoctorStub = sinon.stub().throws(new Error('Dang'));

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        getDoctorByIDService: getDoctorStub,
      },
    });

    const response = await mock.getDoctorByID(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });

  it('createDoctor - returns 200', async () => {
    const req = {
      body: {
        name: 'doctor',
        dpt: 'dpt',
        clinic: 'clinic',
        phone: 'phone',
      },
    };

    const createDoctorStub = sinon.stub().resolves(
      new Response(true, 200, messages.services.doctor.created, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        createDoctorService: createDoctorStub,
      },
      '../../helpers/getToken.js': {
        getUserIDFromToken: sinon.stub().returns('1'),
      },
    });

    const response = await mock.createDoctor(req, res);

    expect(response.success).equal(true);
  });

  it('createDoctor - returns 400 with incomplete fields', async () => {
    const req = {
      body: {},
    };

    const createDoctorStub = sinon.stub().resolves(
      new Response(true, 200, null, {}),
    );

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        createDoctorService: createDoctorStub,
      },
      '../../helpers/getToken.js': {
        getUserIDFromToken: sinon.stub().returns('1'),
      },
    });

    const response = await mock.createDoctor(req, res);

    expect(response.success).equal(false);
  });

  it('createDoctor - Catches error and returns 500', async () => {
    const req = {
      body: {
        name: 'doctor',
        dpt: 'dpt',
        clinic: 'clinic',
        phone: 'phone',
      },
    };

    const createDoctorStub = sinon.stub().throws(new Error('Dang'));

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        createDoctorService: createDoctorStub,
      },
      '../../helpers/getToken.js': {
        getUserIDFromToken: sinon.stub().returns('1'),
      },
    });

    const response = await mock.createDoctor(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });

  it('updateDoctor - returns 200', async () => {
    const updateDoctorStub = sinon.stub().resolves(
      new Response(
        true,
        200,
        messages.services.doctor.updated,
        {},
      ),
    );
    const req = {
      body: {
        id: '1',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        updateDoctorService: updateDoctorStub,
      },
    });

    const response = await mock.updateDoctor(req, res);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.doctor.updated);
  });

  it('updateDoctor - returns 400 with empty id', async () => {
    const updateDoctorStub = sinon.stub().resolves(
      new Response(
        true,
        200,
        messages.services.doctor.updated,
        {},
      ),
    );
    const req = {
      body: {},
    };

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        updateDoctorService: updateDoctorStub,
      },
    });

    const response = await mock.updateDoctor(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.doctor.idMissing);
  });

  it('updateDoctor - catches error and returns 500', async () => {
    const updateDoctorStub = sinon.stub().throws(
      new Error('Dang'),
    );
    const req = {
      body: {
        id: '0',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        updateDoctorService: updateDoctorStub,
      },
    });

    const response = await mock.updateDoctor(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });

  it('deleteDoctorByID - returns 200', async () => {
    const deleteDoctorStub = sinon.stub().resolves(
      new Response(
        true,
        200,
        messages.services.doctor.deleted,
        {},
      ),
    );
    const req = {
      body: {
        id: '1',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        deleteDoctorByIDService: deleteDoctorStub,
      },
    });

    const response = await mock.deleteDoctorByID(req, res);

    expect(response.success).equal(true);
    expect(response.message).equal(messages.services.doctor.deleted);
  });

  it('deleteDoctorByID - catches error and returns 500', async () => {
    const deleteDoctorStub = sinon.stub().throws(
      new Error('Dang'),
    );
    const req = {
      body: {
        id: '0',
      },
    };

    const mock = proxyquire('../../../src/controllers/v1/doctor.controller.js', {
      '../../services/doctor.service.js': {
        deleteDoctorByIDService: deleteDoctorStub,
      },
    });

    const response = await mock.deleteDoctorByID(req, res);

    expect(response.success).equal(false);
    expect(response.message).equal(messages.controllers.internal);
    expect(response.data).equal('Dang');
  });
});
