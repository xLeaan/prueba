import React, { useEffect, useState } from 'react';
import '../App.css';
import Buscador from './Buscador';

function Listado({ onSelectedPersonaje }){
    const[personajes, setPersonajes] = useState([]);
    const [filteredPersonajes, setFilteredPersonajes] = useState([]);

    useEffect(() => {
        obtenerPersonajes();
    }, []);

    const obtenerPersonajes = async () => {
        try {
            const respuesta = await fetch('https://rickandmortyapi.com/api/character/');
            if(!respuesta.ok) {
                throw new Error('Error al obtener los datos')
            }
            const datos = await respuesta.json();
            const initialCharacters = datos.results.slice(0, 50);
            setPersonajes(initialCharacters);
            setFilteredPersonajes(initialCharacters)
        } catch (error){
            console.log("no se obtuvieron los datos")
        }
    };

    const handleSearch = (query) => {
        const filtered = personajes.filter(personaje =>
            personaje.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPersonajes(filtered);
    };

    const handleClickPersonaje = (personaje) => {
        onSelectedPersonaje(personaje);
    };


    return (
        <div>
            <Buscador onSearch={handleSearch}/>
            <div className='lista-personajes'>
                {filteredPersonajes.map(personaje => (
                    <div key={personaje.id} className='tarjeta-personaje' onClick={() => handleClickPersonaje(personaje)}>
                        <img src={personaje.image} alt={personaje.nombre}/>
                        <h3>{personaje.name}</h3>
                        <p>{personaje.species}</p>
                        <p>{personaje.gender}</p>
                        <p>{personaje.origin.name}</p>
                        <p>{personaje.location.name}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listado;

