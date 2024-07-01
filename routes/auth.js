const express = require('express');
const router = express.Router();
const { User } = require('../models');

/* POST Auth */
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
        role: 'S'
      }
    });
    if(!user){
      return res.status(401).json({
        message: 'Akun tidak ditemukan!'
      });
    }
    return res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
        role: 'A'
      }
    });
    if(!user){
      return res.status(401).json({
        message: 'Akun tidak ditemukan!'
      });
    }
    return res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
