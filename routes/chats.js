const express = require('express');
const router = express.Router();
const { Chat } = require('../models');
const { Sequelize } = require('sequelize');

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
    if(!chats){
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/student/:token', async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: {
        token: req.params.token,
        [Sequelize.Op.and]: [
          { reply: req.body.reply },
          { [Sequelize.Op.or]: [
              { client: req.body.client }
            ]
          }
        ]
      }
    });
    if(!chats){
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
    if(!chats){
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
