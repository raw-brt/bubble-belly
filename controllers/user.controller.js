const User = require('../models/user.model');
const Baby = require('../models/baby.model');
const Event = require('../models/event.model');
const mongoose = require('mongoose');


module.exports.start = (_, res) => {
  res.render('users/start')
};

module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
};

module.exports.home = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      let foundUser = {
        userId: user._id,
        userBaby: user.babies,
        momWeight: user.momWeight,
        birthDate: user.birtDate,
        events: user.events
      }
      res.render('/home/:userId', { user: foundUser })
    })
    .catch(error => console.log(`There was an error loading user/'s ${userId} home: `, error))
    next();
};

module.exports.create = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })

  user.save()
    .then((user) => {
      res.redirect('/login')
    })
    .catch((error) => next(error));
  };

module.exports.validate = (req, res, next) => {
  User.findOne({validateToken: req.params.token})
    .then(user => {
      if (user) {
        user.validated = true;
        user.save()
          .then(() => {
            res.redirect('/login')
          })
          .catch(next)
      } else {
        res.redirect('/')
      }
    })
    .catch(next)
};

module.exports.login = (_, res) => {
  res.render('users/login')
};

module.exports.doLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('users/login', { user: req.body })
    }

    User.findOne({ email: email, validated: true })
      .then(user => {
        if (!user) {
          res.render('users/login', {
            user: req.body,
            error: { password: 'invalid password/email' }
          })
        } else {
          return user.checkPassword(password)
            .then(match => {
              if (!match) {
                res.render('users/login', {
                  user: req.body,
                  error: { password: 'invalid password/email' }
                })
              } else {
                req.session.user = user;
                req.session.genericSuccess = 'Welcome!'
                res.redirect('/home');
              }
            })
        }
      })
  };


module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
