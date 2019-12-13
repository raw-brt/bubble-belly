const Event = require('../models/event.model');
const mongoose = require('mongoose');

module.exports.home = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      let lastFoundEvent = {
        lastEvent: user.events[user.events.length - 1],
      }
    })
    .then(lastEvent => {
      Event.findById(lastEvent)
        .then(lastEventId => {
          // Preguntar si esto está bien, ya que hago el mismo render en el controlador del usuario
          res.render('users/home', { event: lastEventId })
        })
    })
    .catch(error => console.log(`There was an error loading user/'s ${userId} home: `, error))
    next();
};