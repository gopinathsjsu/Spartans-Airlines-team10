const express = require("express");
const bcrypt = require("bcrypt");
const Customers = require("../Models/CustomerModel");

const router = express.Router();

router.post("/", (req, res) => {
  console.log("Inside signup");
  console.log("Req Body : ", req.body);

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
      console.log(hash);
      const newCustomer = new Customers({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        emailID: req.body.emailID,
        password: hash,
        phoneNum: req.body.phoneNum,
        createdOn: req.body.createdOn,
      });

      //save customer
      newCustomer.save((insertErr, insertData) => {
        if (insertErr) {
          console.log("Cannot insert customer details into db");
          res.setHeader("Content-Type", "application/json");
          res.status(400);
          insertErr.status = 400;
          res.send(JSON.stringify(insertErr));
        } else {
          console.log("Inserted sucessfully", insertData._id);
          const id = JSON.stringify(insertData._id)
          res.cookie('cookie', id, {
            maxAge: 5000000,
            httpOnly: false,
            path: '/',
          });
          req.session.user = insertData;
          res.setHeader("Content-Type", "application/json");
          res.status(200);
          insertData.status = 200;
          res.end(JSON.stringify(insertData));
        }
      });
    }
  });
});

module.exports = router;
