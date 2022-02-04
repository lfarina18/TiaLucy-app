import React from 'react'

const OfertaItem = ({ titulo, mensaje }) => {


    return (
        <>

            <div className="card ">
                <h3>{titulo}</h3>
                <p>{mensaje}</p>

            </div>
        </>
    )
}

export default OfertaItem;