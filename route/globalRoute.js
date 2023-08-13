const express = require('express');
const router = express.Router();
const globalController = require('../controllers/globaladmin')
const tokenValidations =require('../middleware/verifyToken')


router.post('/registrations',globalController.registration)
router.post('/login',globalController.login)
router.get('/getcompanyadmin',tokenValidations.authToken,globalController.getcompanyadmin)
router.put('/updateDetails',tokenValidations.authToken,globalController.updatecompanyAdmin)
router.get('/getById/:id',tokenValidations.authToken,globalController.getCadminByID)
router.delete('/deleteByid/:id',tokenValidations.authToken,globalController.deleteById)
router.get('/refreshToken',tokenValidations.refreshToken)

module.exports = router;
