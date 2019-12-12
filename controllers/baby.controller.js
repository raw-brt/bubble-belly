const User = require('../models/user.model');
const Baby = require('../models/baby.model');
const Event = require('../models/event.model');
const mongoose = require('mongoose');

module.exports.home = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      let foundBaby = {
        userBaby: user.babies,
      }
    })
    .then(foundBaby => {
      Baby.findById(foundBaby)
        .then(babyId => {
          // Preguntar si esto está bien, ya que hago el mismo render en el controlador del usuario
          res.render('/home/:userId', { baby: babyId })
        })
    })
    .catch(error => console.log(`There was an error loading user/'s ${userId} home: `, error))
    next();
};