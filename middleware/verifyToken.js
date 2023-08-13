var jwt = require('jsonwebtoken');
const config = require('../config/config');
const companyadmin = require('../models/companyadmin');
const globaladmin = require('../models/globaladmin');
const users = require('../models/users');
module.exports = {
    authToken: async (req, res, next) => {
        let token = req.header('Authorization');
        console.log("token", token);
        if (!token) return res.status(401).json({ message: 'No authorization found' })
        jwt.verify(token, config.api.jwtSecret, function (err, tokendata) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token has expired' });
                }
                return res.status(400).json({ message: ' Unauthorized request' });
            }
            else {
                req.user = tokendata;
                return next();
            }
        })

    },
    refreshToken: async (req, res, next) => {
        const { email, roleID } = req.query;
        let userdetails;
        if (roleID == '2') {
            userdetails = await companyadmin.find({ email: email }, { _id: 1 });
        } else if (roleID == '1') {
            userdetails = await users.find({ email: email }, { _id: 1 });
        } else {
            userdetails = await globaladmin.find({ email: email }, { _id: 1 });
        }

        const accessToken = jwt.sign({ _id: userdetails._id }, config.api.jwtSecret, {
            expiresIn: '5s'
        });
        res.json({ accessToken });
    }

}