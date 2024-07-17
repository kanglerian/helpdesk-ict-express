const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const moment = require('moment-timezone');
const { Chat } = require('../models');
const { Op } = require('sequelize');

/* GET chats listing. */
router.get('/', async (req, res) => {
  try {
    res.send('Helpdesk Chat 🇮🇩');
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan di server. Silakan coba lagi nanti.'
    });
  }
});

router.get('/download/:token', async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: {
        token: req.params.token,
        role_sender: 'S'
      }
    });
    if (!chats.length > 0) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`Laporan Helpdesk`);
    sheet.addRow(['No.', 'Ruangan', 'Token', 'Pengirim', 'Pesan', 'Tanggal']);

    chats.forEach((result, index) => {
      const time = moment(result.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
      sheet.addRow([
        index + 1,
        `${result.client}`,
        `${result.name_room} (${result.token})`,
        `${result.name_sender}`,
        `${result.message}`,
        `${time}`,
      ]);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="laporan-helpdesk.xlsx"');

    const buffer = await workbook.xlsx.writeBuffer();
    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan di server. Silakan coba lagi nanti.'
    });
  }
});

router.get('/admin/:token', async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: {
        token: req.params.token
      }
    });
    if (!chats.length > 0) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan di server. Silakan coba lagi nanti.'
    });
  }
});

router.get('/student/:token/:room', async (req, res) => {
  try {
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
    if (!chats.length > 0) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan di server. Silakan coba lagi nanti.'
    });
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
    if (!chats.length > 0) {
      return res.status(404).json({
        message: `Pesan berdasarkan token ${req.params.token} tidak ditemukan!`
      });
    }
    return res.json(chats);
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan di server. Silakan coba lagi nanti.'
    });
  }
});

router.delete('/:token', async (req, res) => {
  try {
    await Chat.destroy({
      where: {
        token: req.params.token,
      }
    });
    return res.json({
      message: `Pesan dengan token ${req.params.token} berhasil dihapus!`
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan di server. Silakan coba lagi nanti.'
    });
  }
});

module.exports = router;
