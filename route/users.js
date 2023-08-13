const express = require('express');
const router = express.Router();
const userController =require('../controllers/user')

router.post('/registrations',userController.registrations);
router.get('/getlistByID/:id',userController.getUserListBycompany);
router.put('/updateUsers',userController.updateUsers);
router.delete('/deleteByid/:id',userController.deleteById);
router.get('/geteditByID/:id',userController.getuserByID)



module.exports = router;
