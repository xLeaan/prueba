import React, { useEffect, useState } from 'react';

function Listado(){
    const[personajes, setPersonajes] = useState([]);

    useEffect(() => {
        obtenerPersonajes();
    }, []);

    const obtenerPersonajes = async () => {
        try {
            const respuesta = await fetch('https://rickandmortyapi.com/api/character/');
            console.log(respuesta);
            if(!respuesta.ok) {
                throw new Error('Error al obtener los datos')
            }
            const datos = await respuesta.json();
            setPersonajes(datos.results.slice(0, 50));
        } catch (error){
            console.log("no se obtuvieron los datos")
        }
    };
    return (
        <div>
            <div className='lista-personajes'>
                {personajes.map(personaje => (
                    <div key={personaje.id}>
                        <img src={personaje.image} alt={personaje.nombre}/>
                        <h3>{personaje.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listado;

