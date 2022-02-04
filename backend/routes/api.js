const express = require('express');
const router = express.Router();
const imagenesModel = require('../models/imagenesModel');
const novedadesModel = require('../models/novedadesModel');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');

router.get('/novedades', async (req, res, next) => {
  let novedades = await novedadesModel.getNovedades();
  res.json(novedades);
});

router.get('/imagenes', async (req, res, next) => {
  let imagenes = await imagenesModel.getImagenes();

  imagenes = imagenes.map((imagenes) => {
    if (imagenes.img_id) {
      const imagen = cloudinary.url(imagenes.img_id, {
        quality: 70,
        width: 600,
        fetch_format: 'auto',
        crop: 'scale',
      });
      return {
        ...imagenes,
        imagen,
      };
    } else {
      return {
        ...imagenes,
        imagen: '',
      };
    }
  });

  res.json(imagenes);
});

router.post('/contacto', async (req, res) => {
  const mail = {
    to: 'xxxxxxx@gmail.com',
    subject: 'Contacto web',
    html: `${req.body.nombre} se contacto a traves de la web y quiere más información a este correo: ${req.body.correo} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su teléfono es: ${req.body.telefono}`,
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);
  res.status(201).json({
    error: false,
    message: 'Mensaje enviado',
  });
});

module.exports = router;
