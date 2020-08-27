/** ===========================
 * Test-API / user.route.js
 * 
 * 
 * Created by Antonio Zayas 
 * https://github.com/azayas97
 * 
 * 
 ============================ */

const userController = require('../controllers/userController');

module.exports = function(app) {
    app.get('/api/users', userController.index);
    app.get('/api/user/:id', userController.get);
    app.post('/api/user/add', userController.add);
    app.put('/api/user/edit', userController.edit);
    app.delete('/api/user/delete', userController.delete);
}