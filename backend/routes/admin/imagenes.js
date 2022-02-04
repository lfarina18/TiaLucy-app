const express = require('express');
const router = express.Router();
const imagenesModel = require('../../models/imagenesModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

router.get('/', async (req, res, next) => {
  var imagenes = await imagenesModel.getImagenes();

  imagenes = imagenes.map((image) => {
    if (image.img_id) {
      const imagen = cloudinary.image(image.img_id, {
        width: 100,
        height: 100,
        crop: 'fill',
      });
      return {
        ...image,
        imagen,
      };
    } else {
      return {
        ...image,
        imagen: '',
      };
    }
  });

  res.render('admin/imagenes', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    imagenes,
  });
});

router.get('/agregarImagen', async (req, res, next) => {
  res.render('admin/agregarImagen', {
    layout: 'admin/layout',
  });
});

router.post('/agregarImagen', async (req, res, next) => {
  try {
    var img_id = '';

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.imagen != '' && req.files !== null) {
      await imagenesModel.insertImagen({
        ...req.body,
        img_id,
      });
      res.redirect('/admin/imagenes');
    } else {
      res.render('admin/agregarImagen', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son obligatorios',
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregarImagen', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo cargar',
    });
  }
});

router.get('/modificarImagen/:id', async (req, res, next) => {
  let id = req.params.id;
  let imagen = await imagenesModel.getImagenById(id);
  res.render('admin/modificarImagen', {
    layout: 'admin/layout',
    imagen,
  });
});

router.post('/modificarImagen', async (req, res, next) => {
  try {
    let img_id = '';
    let borrar_img_vieja;

    console.log(req.files);

    if (req.files !== null && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;

      borrar_img_vieja = true;
    } else {
      res.redirect('/admin/imagenes');
    }

    if (borrar_img_vieja && req.body.img_original) {
      await destroy(req.body.img_original);
      let obj = {
        img_id,
      };

      await imagenesModel.modificarImagenById(obj, req.body.id_original);
      res.redirect('/admin/imagenes');
    }
  } catch (error) {
    res.render('admin/modificarImagen', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar la imagen',
    });
  }
});

router.get('/eliminarImagen/:id', async (req, res, next) => {
  var id = req.params.id;

  let imagen = await imagenesModel.getImagenById(id);
  if (imagen.img_id) {
    await destroy(imagen.img_id);
  }

  await imagenesModel.deleteImagenById(id);
  res.redirect('/admin/imagenes');
});

module.exports = router;
