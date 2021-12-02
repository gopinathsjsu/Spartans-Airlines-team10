const express = require("express");
const router = express.Router();

const Employee = require("../../Models/EmployeeModel");

const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("emailID").isEmail(),
  body("password").isLength({ min: 8 }),
  (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }

    Employee.find({ emailID: req.body.emailID })
      .exec()
      .then((employee) => {
        console.log("the emplopyee result is: ", employee);
        if (employee.length < 1) {
          res.setHeader("Content-Type", "application/json");
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        bcrypt.compare(
          req.body.password,
          employee[0].password,
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Auth failed",
              });
            }
            if (result) {
              console.log("the result is:", result);
              const id = JSON.stringify(employee._id);
              res.cookie("cookie", id, {
                maxAge: 5000000,
                httpOnly: false,
                path: "/",
              });
              req.session.employee = result;
              return res.status(200).json({
                message: "Auth successful",
                response: employee[0],
              });
            } else {
              return res.status(401).json({
                message: "Auth failed",
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });

    // else {

    // }
  }
);

module.exports = router;
