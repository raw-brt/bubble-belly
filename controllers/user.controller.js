require('dotenv').config()

const User = require('../models/user.model');
const babyLogic = require('../helpers/baby.logic');
const mongoose = require('mongoose');
const babyInfo = require('../data/info');
const axios = require("axios")
// Import data files


module.exports.start = (_, res) => {
  res.render('users/start')
};

module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
};

module.exports.home = (req, res, next) => {
  let ageInWeeks = babyLogic.updateAge(req.session.user.lastPeriod);

  User.findByIdAndUpdate(req.params.userid, { babyAge: ageInWeeks }, { new: true })
    .then(user => {
      res.render('users/home', { 
        user: user, 
        size: babyInfo.sizes[user.babyAge - 1],
        babyWeight: babyInfo.babyWeights[user.babyAge - 1],
        babySize: babyInfo.babySizes[user.babyAge - 1],
      })
    })
    .catch((error) => next(error))
};

module.exports.create = (req, res, next) => {
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
  User.findOne({ validateToken: req.params.token })
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
    .catch((error) => next(error))
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

module.exports.food = (req, res) => {
  const user = req.session.user;
  res.render('food/foods', { user: user });
}

module.exports.getFood = async (req, res) => {
  const user = req.session.user;
  console.info(user)
  const foodQuery = req.query.foodSearch;
  
  let edamamCall = `https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=${foodQuery}&app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}`
  let recipeCall = `https://api.edamam.com/search?q=${foodQuery}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}`

  try {
    const foodResponse = (await axios.get(edamamCall)).data;
    const recipeResponse = ( await axios.get(recipeCall)).data;
    
    if (babyInfo.notRecommendedFoods.includes(foodResponse.hints[0].food.label)) {
      res.render('food/foods', {
        user: user, 
        foodResponse: foodResponse.hints, 
        recipeResponse: recipeResponse.hits, 
        recommended: false })

    } else {
      res.render('food/foods', {
        user: user, 
        foodResponse: foodResponse.hints, 
        recipeResponse: recipeResponse.hits, 
        recommended: true })
    }

  } catch (axiosErr) {
      console.log(axiosErr)
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/start');
};
