require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || "Guleria_Ji";

const encrypt = (payload, secret) => {
  // your code here and return token
  return jwt.sign(payload, secret, {expiresIn: "1h"});
};


const token = encrypt({id: 1, name: "Avinash"}, SECRET_KEY);
console.log(`The token is ${token}`)


function verifyToke(token){
  try{
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(`The decoded Token is:`, decoded);
    
  }catch(err){
    if (err.name === "Random"){
      console.log(`Token has Expired!`)
    }else {
      console.log(err.message);
    }
  }
}

setTimeout(() => {
  verifyToke(token);
}, 1000);


module.exports = encrypt;