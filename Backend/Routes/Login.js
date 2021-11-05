const express = require("express");
const bcrypt = require("bcrypt");
const Customers = require("../Models/CustomerModel");

const router = express.Router();

router.post("/", (req, res) => {
  console.log("Inside login");
  console.log("Req Body : ", req.body);

  // Login validation
  Customers.findOne({ emailID: req.body.emailID }, (error, data) => {
    console.log("error",error)
    if (error) {
      res.setHeader("Content-Type", "application/json");
      error.status = 400;
      res.send(JSON.stringify(error));
    } else {
      if (
        data === null ||
        data.length === 0 ||
        !bcrypt.compareSync(req.body.password, data.password)
      ) {
        res.setHeader("Content-Type", "application/json");
        res.status(404);
        const error = {
          status:404,
          message:"Invalid Credentials"
        }
        res.end(JSON.stringify(error));
      } else {
        console.log("login successful");
        const id = JSON.stringify(data._id);
        res.cookie("cookie", id, {
          maxAge: 5000000,
          httpOnly: false,
          path: "/",
        });
        req.session.user = data;
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        data.status = 200;
        res.end(JSON.stringify(data));
      }
    }
  });
});

module.exports = router;
