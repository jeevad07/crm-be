const globaladmin =require('../models/globaladmin');
const user =require('../models/users');
const cadmin =require('../models/companyadmin')
const jwt = require('jsonwebtoken');
const config =require('../config/config');
const usertracker =require("../models/userstrackers")
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


const globaladminController={
    registration: async (req, res, next) => {
        try {
          console.log("req",req.body)
          const result = await globaladmin.create(req.body);
          let trackerInfo ={email:req.body.email,tableID:3};
          await usertracker.create(trackerInfo);
          return res.send({ status: true, _id: result._id });
        }
        catch (err) {
          console.log("err", err);
        }
    },
    login:async(req,res,next)=>{
      try {
        const { email, password } = req.body;
        let userdetails;
        const result =await usertracker.findOne({email},{tableID:1});
        if(result.tableID ==3)
        {
          userdetails = await globaladmin.findOne({ email }); 
        }else if(result.tableID ==2){
          userdetails = await user.findOne({ email });
        }else if(result.tableID ==1)
        {
          userdetails = await cadmin.findOne({ email });
        }
        if (!userdetails) return res.status(401).json({ message: 'User not found or Invalid email' });
        const isPassword = await userdetails.comparePassword(password);
        if (!isPassword) return res.status(401).json({ message: 'Invalid password' });
        const expiresIn = '5s';
        const token = jwt.sign({ _id: userdetails._id }, config.api.jwtSecret,{expiresIn});
        const userdetails_id = userdetails;
        return res.status(200).json({ token, userdetails_id });
      } catch (err) {
        console.log("err", err);
      }
    },

    getcompanyadmin:async(req,res,next)=>{
      try{
        const result = await cadmin.find({});
        return res.send(result);
      }catch(err){
        console.log("error",err)
      }
    },

     updatecompanyAdmin: async (req, res, next) => {
      try {
        const updateId = { _id: req.body.id };
        let pass = req.body.password;
        console.log("body",req.body);
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(pass, salt, (err, hash) => {
              if (err) return reject(err);
              resolve(hash);
            });
          });
        });
    
        const updateData = {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            companyname: req.body.companyname,
          },
        };

       let trackerInfo ={ $set: {email:req.body.email}};
       const tracker = await usertracker.updateOne({ID:req.body.companyid},trackerInfo);
       console.log("rtged",tracker)       
        const result = await cadmin.updateOne(updateId, updateData);
        return res.send(result);
      } catch (err) {
        console.log("error", err);
        return res.status(500).send("An error occurred");
      }
    },
    getCadminByID:async(req,res,next)=>{
        try{
          const {id}=req.params;
          const result= await cadmin.findOne({_id:id});
          return res.send(result);
        }catch(error){
            console.log("error",error)
        }
    },
    deleteById:async(req,res,next)=>{
      try{
        const{id}=req.params;
        const result =await cadmin.deleteOne({_id:id})
        return res.send(result);
      }catch(error){
        console.log("error",error)
      }
    }

}

module.exports = globaladminController
