/** ===========================
 * Test-API / doctor.route.js
 * 
 * 
 * Created by Antonio Zayas 
 * https://github.com/azayas97
 * 
 * 
 ============================ */

const doctorController = require('../controllers/doctorController');

module.exports = function(app) {
    app.get('/api/doctors', doctorController.index);
    app.get('/api/doctor/:id', doctorController.get);
    app.post('/api/doctor/add', doctorController.add);
    app.put('/api/doctor/edit', doctorController.edit);
    app.delete('/api/doctor/delete', doctorController.delete);
}