import { Link } from 'react-router-dom';

import Carousel from '../components/Carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const url = 'http://localhost:4000/api/imagenes';

  const [loading, setLoading] = useState(true);
  const [imagenes, setImagenes] = useState([]);

  const cargarImagenes = async () => {
    const response = await axios.get(url);
    setImagenes(response.data);
    setLoading(false);
  };
  useEffect(() => {
    cargarImagenes();
  }, []);

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  return (
    <>
      <main className='container'>
        <div className='grid-container'>
          <div className='grid-items grid-items1'>
            <div className=' titulo centrar-img border torta flex'>
              <Link className='hovered' to='/ofertas'>
                <h2>¡Promociones de esta semana!</h2>
              </Link>
            </div>
          </div>

          <div className='grid-items'>
            <div className=' titulo centrar-img border torta cupcake flex'>
              <h2>Cupcakes</h2>
            </div>
          </div>
          <div className='grid-items'>
            <div className=' titulo centrar-img border  cookie flex'>
              <h2>Cookies</h2>
            </div>
          </div>
          <div className='grid-items grid-items2 titulo__2 centrar-img border tcc flex'>
            <div className='box-1__principal'>
              <ul>
                <li>Tortas</li>
                <li>Cupcakes</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <section className='container-slider'>
        <div>
          <h2 className='destacado'>Destacados</h2>
          <div>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <Carousel
                data={imagenes}
                time={3000}
                width='600px'
                height='800px'
                captionStyle={captionStyle}
                radius='none'
                slideNumber={false}
                slideNumberStyle={slideNumberStyle}
                captionPosition='bottom'
                automatic={false}
                dots={true}
                pauseIconColor='#cc0e74'
                pauseIconSize='40px'
                slideBackgroundColor='#e6b2b2'
                slideImageFit='contain'
                thumbnails={true}
                thumbnailWidth='100px'
                style={{
                  textAlign: 'center',
                  maxWidth: '600px',
                  maxHeight: '800px',
                  margin: '20px auto',
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section className='imagen-contacto'>
        <div className='contenido-contacto'>
          <h2>¡El diseño que imaginas, podemos hacerlo!</h2>
          <div>
            <p>Contanos tu idea... y nosotros la hacemos realidad.</p>
            <p>
              Podés llenar el formulario con tu consulta y te responderemos a la
              brevedad.
            </p>
            <Link className='nav-item btn__nav' to='/contacto'>
              Contactar
            </Link>
            <p>
              Hacé click en el icono de WhatsApp para chatear con nosotros
              ahora.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
