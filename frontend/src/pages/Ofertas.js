import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfertaItem from '../components/ofertas/OfertasItem';

import '../components/ofertas/styles/ofertas.css'

export default function Ofertas() {
    const url = 'http://localhost:4000/api/novedades';

    const [loadingNov, setLoadingNov] = useState(false);
    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const cargarNovedades = async () => {
            setLoadingNov(true);
            const response = await axios.get(url);
            setNovedades(response.data);
            setLoadingNov(false);
        };
        cargarNovedades();
    }, []);

    return (
        <section className='container'>
            <h1 className='titulo-n'>¡Promociones de la semana!</h1>
            <div className="row">
                {loadingNov ? (
                    <p>Cargando...</p>
                ) : (
                    novedades.map((item) => (
                        <OfertaItem
                            key={item.id}
                            titulo={item.titulo}
                            mensaje={item.mensaje}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
