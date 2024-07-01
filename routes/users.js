const express = require('express');
const router = express.Router();
const { User } = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    if(!users){
      return res.status(404).json({
        message: 'Belum ada akun.'
      });
    }
    return res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
