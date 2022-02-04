var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async (req, res, next) => {
  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades,
  });
});

router.get('/agregar', async (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout',
  });
});

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != '' && req.body.mansaje != '') {
      await novedadesModel.insertNovedad({
        ...req.body,
      });
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son obligatorios',
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo cargar',
    });
  }
});

router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad,
  });
});

router.post('/modificar', async (req, res, next) => {
  try {
    const { id, titulo, mensaje } = req.body;

    let obj = {
      titulo,
      mensaje,
    };
    await novedadesModel.modificarNovedadById(obj, id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error);
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar la novedad',
    });
  }
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades');
});

module.exports = router;
