const { model } = require('mongoose');
const ShopifyCustomer = model("ShopifyCustomer")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const  requiresAuth = (req, res, next) => {
    let token = req.headers['authorization'];
if (token) {
        token = token.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, auth) => {
            if (err) return res.send({ result: "Invaild token" })
            else {
                return next();
            }
        })
    } else {
        res.status(400).send({
            massage: "Please provide a token"
        })
    }
}
module.exports = {  requiresAuth };
