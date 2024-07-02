const express = require('express');
const router = express.Router();
const { Chat } = require('../models');
const { Sequelize, Op } = require('sequelize');

/* GET chats listing. */
router.get('/', async (req, res) => {
  try {
    res.send('Helpdesk Chat 🇮🇩');
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/admin/:token', async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: {
        token: req.params.token
      }
    });
    if (!chats) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/student/:token/:room', async (req, res) => {
  try {
    console.log(req.body);
    const chats = await Chat.findAll({
      where: {
        token: req.params.token,
        [Op.or]: [
          {
            reply: req.params.room,
          }, {
            client: req.params.room,
          },
        ]
      }
    });
    if (!chats) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/dashboard/:token', async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: {
        token: req.params.token,
        role_sender: 'S'
      }
    });
    if (!chats) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
