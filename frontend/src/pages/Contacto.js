import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Spinner from '../components/Spinner';
import axios from 'axios';

const Contacto = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [cargando, guardarCargando] = useState(false);

  return (
    <>
      <div className='container-form'>
        <h2 className='title'>Por favor complete todos los campos</h2>
        <Formik
          initialValues={{
            nombre: '',
            correo: '',
            telefono: '',
            mensaje: '',
          }}
          validate={(values) => {
            let errors = {};

            // Validación nombre
            if (!values.nombre) {
              errors.nombre = 'Por favor ingresa un nombre';
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre)) {
              errors.nombre = 'El nombre solo puede contener letras y espacios';
            }

            // Validación correo
            if (!values.correo) {
              errors.correo = 'Por favor ingresa un correo electrónico';
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.correo
              )
            ) {
              errors.correo =
                'El correo solo puede contener letras, números, puntos, guiones y guion bajo';
            }

            // Validación teléfono
            if (!values.telefono) {
              errors.telefono = 'Por favor ingresa un teléfono';
            } else if (
              !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
                values.telefono
              )
            ) {
              errors.telefono = 'Solo puede contener números, máx: 11 dígitos';
            }
            // Validación mensaje
            if (!values.mensaje) {
              errors.mensaje = 'Por favor ingresa un mensaje';
            }
            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            resetForm();
            console.log('Formulario enviado');
            guardarCargando(true);
            await axios.post('http://localhost:4000/api/contacto', values);
            setTimeout(() => guardarCargando(false), 2000);
            setTimeout(() => cambiarFormularioEnviado(true), 2000);
            setTimeout(() => cambiarFormularioEnviado(false), 6000);
          }}>
          {({ errors }) => (
            <Form className='formulario'>
              <fieldset className='shadow-4'>
                <div>
                  <label htmlFor='nombre'>Nombre</label>
                  <Field
                    type='text'
                    id='nombre'
                    name='nombre'
                    placeholder='Tu nombre'
                  />
                  <ErrorMessage
                    name='nombre'
                    component={() => (
                      <div className='error'>{errors.nombre}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor='correo'>Correo</label>
                  <Field
                    type='email'
                    id='correo'
                    name='correo'
                    placeholder='correo@correo.com'
                  />
                  <ErrorMessage
                    name='correo'
                    component={() => (
                      <div className='error'>{errors.correo}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor='Telefono'>Teléfono</label>
                  <Field
                    type='tel'
                    id='telefono'
                    name='telefono'
                    placeholder='Cód. área + número.'
                  />
                  <ErrorMessage
                    name='telefono'
                    component={() => (
                      <div className='error'>{errors.telefono}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor='Mensaje'>Mensaje</label>
                  <Field
                    as='textarea'
                    id='mensaje'
                    name='mensaje'
                    placeholder='Tu Mensaje'
                  />
                  <ErrorMessage
                    name='mensaje'
                    component={() => (
                      <div className='error'>{errors.mensaje}</div>
                    )}
                  />
                </div>
                <button className='btn__form' type='submit'>
                  ENVIAR
                </button>
                {cargando && <Spinner />}
                {formularioEnviado && (
                  <p className='exito'>
                    El formulario fue enviado exitosamente
                  </p>
                )}
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Contacto;
