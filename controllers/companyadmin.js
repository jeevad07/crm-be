const companyadmin = require('../models/companyadmin');
const usertracker = require("../models/userstrackers");
const counter = require('../models/counter');
const customer= require('../models/customer');

const cadminController = {

    registrations: async (req, res, next) => {
        try {
            const couter = await counter.findOneAndUpdate({ _id: '1' }, { $inc: { seq: 1 } }, { upsert: true, new: true })
            req.body.companyID = couter.seq;
            req.body.roledesignation = "admin";
            req.body.roleID = "1";
            const result = await companyadmin.create(req.body);
            let trackerInfo = { email: req.body.email, tableID: 1, ID: couter.seq };
            await usertracker.create(trackerInfo);
            return res.send({ status: true, _id: result._id });
        } catch (err) {
            console.log("error", err);
        }
    },

    couterInsert: async (req, res, next) => {
        try {
            const result = await counter.create(req.body);
            return res.send({ status: true, _id: result._id });

        } catch (err) {
            console.log("error", err)
        }
    },
    createcustomer: async (req, res, next) => {
        try {
            const couter = await counter.findOneAndUpdate({ _id: '4' }, { $inc: { seq: 1 } }, { upsert: true, new: true })
            req.body.customerID=couter.seq;
            console.log("body",req.body)
            const result = await customer.create(req.body);
            return res.send({ status: true, _id: result._id });
        } catch (err) {
            console.log("error", err);
        }
    },
    getCustomerDetails:async(req,res,next)=>{
        try{
            const result= await customer.find({companyID:req.params.id});
            return res.send(result);
        }catch(err){
            console.log("error",err);
        }
    },
    getCustomerForUsers:async(req,res,next)=>{
      const userID=req.query.userID;
      try{
        const result= await customer.find({companyID:req.params.id,assignID:userID});
        return res.send(result);
    }catch(err){
        console.log("error",err);
    }
    },
    updateCustomer:async(req,res,next)=>{
        try{
          const updateId = { _id: req.body.id };
          console.log("body",req.body);
          const updateData = {
            $set: {
              name: req.body.name,
              email: req.body.email,
              status: req.body.status,
              Place:req.body.Place,
              phoneNumber:req.body.phoneNumber,
              assignUsername:req.body.assignUsername,
              assignID:req.body.assignID 
            },
          };
          const result = await customer.updateOne(updateId, updateData);
          return res.send(result);
        }catch(err){
          console.log("error",err)
        }
      },
      getCustomerByID:async(req,res,next)=>{
        try{
            const result= await customer.find({_id:req.params.id});
            return res.send(result);
        }catch(err){
            console.log("error",err)
        }
      },
      deleteById:async(req,res,next)=>{
        try{
          const{id}=req.params;
          const result =await customer.deleteOne({_id:id})
          return res.send(result);
        }catch(error){
          console.log("error",error)
        }
      }
}

module.exports = cadminController