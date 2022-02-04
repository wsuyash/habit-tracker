const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', {
    title: "Habit Tracker - Login",
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: "Habit Tracker - Register",
  });
});

router.post('/register/new-user', (req, res) => {
  console.log(req.body);
  return res.redirect('/dashboard');
});

router.post('/login/user', (req, res) => {
  console.log(req.body);
  return res.redirect('/dashboard');
});

module.exports = router;
