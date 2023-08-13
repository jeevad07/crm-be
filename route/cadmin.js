const express = require('express');
const router = express.Router();
const cadmincontroller =require('../controllers/companyadmin')
const tokenValidations =require('../middleware/verifyToken')

router.post('/registration',cadmincontroller.registrations)
router.post('/counter',cadmincontroller.couterInsert)
router.post('/newcustomer',tokenValidations.authToken, cadmincontroller.createcustomer)
router.get('/getcustomerByID/:id',tokenValidations.authToken, cadmincontroller.getCustomerDetails)
router.get('/getcustomerForUsers/:id',tokenValidations.authToken, cadmincontroller.getCustomerForUsers)
router.put('/updatecustomer',tokenValidations.authToken, cadmincontroller.updateCustomer)
router.get('/getdetailsbyID/:id',tokenValidations.authToken, cadmincontroller.getCustomerByID)
router.delete('/deletecustomer/:id',tokenValidations.authToken, cadmincontroller.deleteById)

module.exports = router;