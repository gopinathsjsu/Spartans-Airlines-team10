/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Customers = require("../Models/CustomerModel");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Inside get profile details");
  console.log("Req Body : ", req.body);
  const customerID = mongoose.Types.ObjectId(req.query.customerID);

  //Find profile
  Customers.findOne({ _id: customerID }, (error, data) => {
    if (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(400);
      const error = {
        status: 400,
        message: "Bad Request",
      };
      res.end(JSON.stringify(error));
    } else if (!data) {
      res.setHeader("Content-Type", "application/json");
      res.status(404);
      const error = {
        status: 404,
        message: "Profile does not exist",
      };
      res.end(JSON.stringify(error));
    } else {
      console.log("profile details", data);
      res.end(JSON.stringify(data));
    }
  });
});

// Update the profile page
router.put("/", (req, res) => {
  const customerID = mongoose.Types.ObjectId(req.body.customerID);
  if (req.body.isPasswordUpdated) {
    //Hash the pasword
    const saltRounds = 10;

    bcrypt.hash(req.body.password, saltRounds, (hasherr, hash) => {
      if (hasherr) {
        res.setHeader("Content-Type", "application/json");
        res.status(400);
        hasherr.status = 400;
        res.send(JSON.stringify(hasherr));
        console.log("cannot hash");
      } else {
        Customers.updateOne(
          {
            _id: customerID,
          },
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              dob: req.body.dob,
              gender: req.body.gender,
              address: req.body.address,
              emailID: req.body.emailID,
              password: hash,
              phoneNum: req.body.phoneNum,
            },
          },
          (error, data) => {
            if (error) {
              res.setHeader("Content-Type", "application/json");
              res.status(400);
              error.status = 400;
              res.send(JSON.stringify(error));
            } else {
              res.setHeader("Content-Type", "application/json");
              res.status(200);
              res.end(JSON.stringify(data));
            }
          }
        );
      }
    });
  } else {
    Customers.updateOne(
      {
        _id: customerID,
      },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dob: req.body.dob,
          gender: req.body.gender,
          address: req.body.address,
          emailID: req.body.emailID,
          phoneNum: req.body.phoneNum,
        },
      },
      (error, data) => {
        if (error) {
          res.setHeader("Content-Type", "application/json");
          res.status(400);
          error.status = 400;
          res.send(JSON.stringify(error));
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(200);
          res.end(JSON.stringify(data));
        }
      }
    );
  }
});

module.exports = router;
