const express = require('express');
const router = express.Router();
const { Room } = require('../models');

/* GET rooms listing. */
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    return res.json(rooms);
  } catch (error) {
    console.log(error.message);
  }
});

/* GET rooms listing. */
router.get('/:token', async (req, res) => {
  try {
    const room = await Room.findOne({
      where: {
        token: req.params.token,
      }
    });
    if(!room){
      return res.status(404).json({
        message: 'Ruangan tidak ditemukan!'
      });
    }
    return res.json(room);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
