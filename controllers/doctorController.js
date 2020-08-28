/** ===========================
 * Test-API / doctorController.js
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

// Doctors' data using Arrays
var dataDoc = [
    {
        'id': 1,
        'name': 'Antonio Zayas',
        'department': 'Surgery',
        'clinic': 'Zayas Clinic'
    },
    {
        'id': 2,
        'name': 'Jane Doe',
        'department': 'Oncology',
        'clinic': 'KV Clinic'
    },
];

exports.index = (req, res) => {

    res.status(200).json({
        status: 200,
        data: dataDoc
    });
}

exports.add = (req, res) => {

    dataDoc.push({
        id: dataDoc.length + 1,
        name: req.body.name,
        department: req.body.dpt,
        clinic: req.body.clinic,
    });
    res.status(200).json({
        message: 'Doctor added successfully',
        data: dataDoc[dataDoc.length]
    });
}

exports.get = (req, res) => {
    
    const doctorId = req.params.id;

    if(doctorId === undefined || doctorId == null) {
        return res.status(400).json({
            message: 'Select a doctor.'
        });
    }

    if(!dataDoc[doctorId - 1]) return res.status(404).json({
        message: 'This doctor doesn\'t exist'
    });

    res.status(200).json({
        data: dataDoc[doctorId - 1]
    });
}

exports.edit = (req, res) => {

    const doctorId = req.body.id;

    if(!dataDoc[doctorId - 1]) return res.status(404).json({
        message: 'This doctor doesn\'t exist'
    });

    dataDoc[doctorId - 1] = {
        id: doctorId,
        name: req.body.name,
        department: req.body.dpt,
        clinic: req.body.clinic,
    }
    res.status(200).json({
        message: 'Doctor updated successfully',
        data: dataDoc[doctorId - 1]
    });
}

exports.delete = (req, res) => {
    const doctorId = req.body.id;

    if(!dataDoc[doctorId - 1]) return res.status(404).json({
        message: 'This doctor doesn\'t exist'
    });

    dataDoc.splice(doctorId - 1)

    res.status(200).json({
        message: 'Doctor deleted successfully.',
    });
}