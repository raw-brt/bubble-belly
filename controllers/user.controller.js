const User = require('../models/user.model');
const mongoose = require('mongoose');


module.exports.new = (_, res) => {
  res.render('/users/new', {user: new User()})
};

module.exports.create = (req, res, next => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    birthDate: req.body.birthDate,
    lastPeriod: req.body.lastPeriod,
  })

  user.save()
    .then(user => {
      res.redirect('users/login')
    })
    .catch(error => next(error))

module.exports.login = (_, res) => {
  res.render('users/login')
};

// module.exports.doLogin = (req, res, next => {
//   const {email, password} = req.body;

//   if (!email || !password) {
//     return res.render('/users/login', {user: req.body})
//   }

//   User.findOne({email: email, validated: true})
//     .then(user => {
//       if(!user) {
//         res.render('/users/login', {
//           user: req.body,
//           error: {password: 'Invalid password'}
//         })
//       }
//       else {
        
//       }
//     })

// });