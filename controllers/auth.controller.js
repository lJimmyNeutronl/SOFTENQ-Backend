const db = require("../models");
const config = require("../config/auth.config");
const Customer = db.Customer;
const Role = db.Role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save Customer to Database
  Customer.create({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(customer => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          customer.setRoles(roles).then(() => {
            res.send({ message: "Customer was registered successfully!" });
          });
        });
      } else {
        // customer role = 1
        customer.setRoles([1]).then(() => {
          res.send({ message: "Customer was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  if (!req.body.name && !req.body.phone_number) {
    return res.status(400).send({ message: "Request must include a name or phone number." });
  }
  let condition = {};
  if (req.body.name) {
    condition.name = req.body.name;
  } else if (req.body.phone_number) {
    condition.phone_number = req.body.phone_number;
  }

  Customer.findOne({
    where: condition
  })
    .then(customer => {
      if (!customer) {
        return res.status(404).send({ message: "Customer Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        customer.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: customer.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      customer.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone_number: customer.phone_number,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
