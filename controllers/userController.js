/** ===========================
 * Test-API / userController.js
 * 
 *         --NOTICE-- 
 * THIS HAS NO DATA VALIDATION 
 * 
 * 
 * Created by Antonio Zayas 
 * https://github.com/azayas97
 * 
 * 
 * Features:
 *  - Index
 *  - Get ( params )
 *  - Add ( form-data )
 *  - Update ( form-data )
 *  - Delete ( form-data )
 * 
 ============================ */
 
 const fs = require('fs');
 
 const path = './assets/';
 const link = 'http://localhost:3000/';

// Users' data using Arrays
var dataUser = [
    {
        'id': 1,
        'name': 'Antonio Zayas',
        'email': 'Antonio@email.com',
        'phone': '66222221144',
        'profile_pic': link + 'aaa.PNG'
    },
    {
        'id': 2,
        'name': 'John Doe',
        'email': 'John@email.com',
        'phone': '66222221144',
        'profile_pic': link + 'gaben.png'
    },
    {
        'id': 3,
        'name': 'Jane Doe',
        'email': 'Jane@email.com',
        'phone': '66222221144',
        'profile_pic': link + 'todd.png'
    },
    {
        'id': 2,
        'name': 'Kevin Doe',
        'email': 'Kevin@email.com',
        'phone': '66222221144',
        'profile_pic': link + 'aa.png'
    },
];

exports.index = (req, res) => {
    res.status(200).json({
        data: dataUser
    });
}

exports.add = (req, res) => {

    let picture = req.files.picture;
    let pictureName = picture.name.split('.');
    let extension = pictureName[pictureName.length - 1];

    let fileName = `${ req.body.name }-${ dataUser.length + 1}.${ extension }`;

    picture.mv(`./assets/${ fileName }`);

    dataUser.push({
        id: dataUser.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profile_pic: link + fileName
    });

    res.status(200).json({
        message: 'User added succesfully.',
        data: dataUser[dataUser.length]
    });
}

exports.get = (req, res) => {
    
    const userId = req.params.id;

    if(userId === undefined || userId == null) {
        return res.status(400).json({
            message: 'Select a user.'
        });
    }

    if(!dataUser[userId - 1]) return res.status(404).json({
        message: 'This user doesn\'t exist'
    });

    res.status(200).json({
        data: dataUser[userId - 1]
    });
}

exports.edit = (req, res) => {

    const userId = req.body.id;
    
    if(!dataUser[userId - 1]) return res.status(404).json({
        message: 'This user doesn\'t exist'
    });

    fs.unlinkSync(path + dataUser[userId - 1].profile_pic.split('3000/')[1]);

    let picture = req.files.picture;
    let pictureName = picture.name.split('.');
    let extension = pictureName[nombreFoto.length - 1];

    let fileName = `${ dataUser[userId - 1].name }-${ userId }.${ extension }`;

    picture.mv(`./assets/${ fileName }`);

    dataUser[userId - 1] = {
        id: userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profile_pic: link + fileName
    }

    res.status(200).json({
        message: 'User updated successfully.',
        data: dataUser[userId]
    });
}

exports.delete = (req, res) => {

    const userId = req.body.id;

    if(!dataUser[userId - 1]) return res.status(404).json({
        message: 'This user doesn\'t exist'
    });

    // This line is to delete the user's profile picture.
    fs.unlinkSync(path + dataUser[userId - 1].profile_pic.split('3000/')[1]);

    dataUser.splice(userId - 1);

    res.status(200).json({
        message: 'User deleted successfully'
    });
}