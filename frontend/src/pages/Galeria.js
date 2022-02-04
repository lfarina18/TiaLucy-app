import { useState, useEffect } from 'react';

import axios from 'axios';
import ImagenItem from '../components/imagenes/ImagenItem';


export default function Galeria(props) {

  const url = 'http://localhost:4000/api/imagenes';

  const [loading, setLoading] = useState(false);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {

    const cargarImagenes = async () => {
      setLoading(true);
      const response = await axios.get(url);

      setImagenes(response.data);

      setLoading(false);
    }
    cargarImagenes();
  }, []);



  return (
    <main>
      <section id="galeria" className="galeria container">
        <h2>Galería</h2>
        <ul className="galeria-imagenes">

          {loading ? (
            <p>Cargando...</p>
          ) : (
            imagenes.map(item => <ImagenItem key={item.id}
              imagen={item.imagen} />)

          )}

        </ul>
      </section>

    </main>
  );
}
