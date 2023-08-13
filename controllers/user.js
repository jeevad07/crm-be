const user =require('../models/users');
const usertracker =require("../models/userstrackers")
const counter =require('../models/counter')
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


const userController={
    registrations:async(req,res,next)=>{
        try{
        const couter =await counter.findOneAndUpdate({ _id: '2' }, { $inc: { seq: 1 } }, { upsert: true, new: true })
         req.body.ID=couter.seq;
         req.body.roledesignation="staff";
         req.body.roleID="2";
         const result = await user.create(req.body);
         let trackerInfo ={email:req.body.email,tableID:2,ID:couter.seq};
         await usertracker.create(trackerInfo);
         return res.send({ status: true, _id: result._id });
        }catch(error)
        {
          console.log("error",error)
        }
    },
    getUserListBycompany:async(req,res,next)=>{
      try{
        const result= await user.find({companyID:req.params.id});
        return res.send(result);
      }catch(err){
        console.log("error",err)
      }
    },
    updateUsers:async(req,res,next)=>{
      try{
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
            password: hashedPassword
          },
        };

       let trackerInfo ={ $set: {email:req.body.email}};
       const tracker = await usertracker.updateOne({ID:req.body.ID},trackerInfo);
       console.log("rtged",tracker)       
        const result = await user.updateOne(updateId, updateData);
        return res.send(result);
      }catch(err){
        console.log("error",err)
      }
    },
    getuserByID:async(req,res,next)=>{
      try{
        const {id}=req.params;
        const result= await user.findOne({_id:id});
        return res.send(result);
      }catch(error){
          console.log("error",error)
      }
  },
  deleteById:async(req,res,next)=>{
    try{
      const{id}=req.params;
      const result =await user.deleteOne({_id:id})
      return res.send(result);
    }catch(error){
      console.log("error",error)
    }
  }
}

module.exports=userController