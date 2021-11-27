const express = require("express");
const router = express.Router();
const Employee = require("../../Models/EmployeeModel");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("firstName").isLength({ max: 30 }),
  body("lastName").isLength({ max: 30 }),
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
      .then((emp) => {
        if (emp.length >= 1) {
          return res.status(409).json({
            message: "Mail exists",
          });
        } else {
          const saltRounds = 10;
          bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const emp = new Employee({
                _id: new mongoose.Types.ObjectId(),
                emailID: req.body.emailID,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
              });
              emp
                .save()
                .then((result) => {
                  const id = JSON.stringify(result._id);
                  res.cookie("cookie", id, {
                    maxAge: 5000000,
                    httpOnly: false,
                    path: "/",
                  });
                  console.log(result);
                  return res.status(200).json({
                    message: "Employee created",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }
);

module.exports = router;
