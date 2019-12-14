const User = require('../models/user.model');
const babyLogic = require('../helpers/baby.logic');
const mongoose = require('mongoose');

// Import data files
require('../data/info');

module.exports.start = (_, res) => {
  res.render('users/start')
};

module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
};

module.exports.home = (req, res, next) => {
  User.findByIdAndUpdate(req.params.userid)
    .then(user => {
      updateAge(user.lastPeriod);
      res.render('users/home', { user: user, size: sizes[user.babyAge - 1] })
    })
    .catch((error) =>  next(error))
};

module.exports.create = (req, res, next) => {
  console.log(req.body.period)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    lastPeriod: req.body.period,
    weight: req.body.weight,
    bellyDiameter: req.body.diameter
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
  res.render('users/login', )
};

module.exports.doLogin = (req, res) => {
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
                res.redirect(`user/${req.session.user.id}`);
              }
            })
        }
      })
  };

module.exports.profile = (req, res, next) => {
  User.findById(req.params.userid)
  .then(user => {
    res.render('users/profile', { user: user });
  })
  .catch((error) =>  next(error))
}

// Preguntar por sacar un modal de confirmación
// No me encuentra la ruta de los partials al usarlos
// Cómo hacer el buscador
module.exports.updateProfile = (req, res) => {
  const { name, email, username, password, lastPeriod, weight, bellyDiameter } = req.body;
  User.findByIdAndUpdate(req.params.userid, { $set: name, email, username, password, lastPeriod, weight, bellyDiameter })
  .then(user => {
    res.render('user/profile', { user: user })
  })
  .catch(error => console.log(`Something went wrong when updating ${user.name} profile`, error))
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/start');
};
