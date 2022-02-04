import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';

const ImagenItem = ({ imagen }) => {

    const [estadoModal, cambiarEstadoModal] = useState(false);


    return (
        <>
            <li>
                <img className="border" src={imagen} alt="imagen torta" onClick={() => cambiarEstadoModal(!estadoModal)} />
            </li>

            <Modal
                estado={estadoModal}
                cambiarEstado={cambiarEstadoModal}
                titulo="Ventana!"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'0px'}
            >
                <Contenido>
                    <img src={imagen} alt="" />
                </Contenido>
            </Modal>
        </>
    )
}

export default ImagenItem;


const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;