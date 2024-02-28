import React, { useEffect, useState } from 'react';
import '../App.css';
import Buscador from './Buscador';
import Crear from './Crear';

function Listado({ onSelectedPersonaje }){
    const[personajes, setPersonajes] = useState([]);
    const [filteredPersonajes, setFilteredPersonajes] = useState([]);
    const [female, setFemale] = useState ([]);
    const [male, setMale] = useState ([]);
    const [filteredPersonajesFemale, setFilteredPersonajesFemale] = useState([]);
    const [filteredPersonajesMale, setFilteredPersonajesMale] = useState([]);

    useEffect(() => {
        obtenerPersonajes();
        obtenerPersonajesGuardados();
    }, []);

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStorageChange = () => {
        obtenerPersonajesGuardados();
    };

    const obtenerPersonajesGuardados = () => {
        const personajesGuardados = JSON.parse(localStorage.getItem('personajes')) || [];
        setPersonajes(personajesGuardados);
    }

    const obtenerPersonajes = async () => {
        try {
            const respuesta = await fetch('https://rickandmortyapi.com/api/character/');
            if(!respuesta.ok) {
                throw new Error('Error al obtener los datos')
            }
            const datos = await respuesta.json();
            setPersonajes(datos.results);
            const female = datos.results.filter(personaje => personaje.gender === "Female");
            setFemale(female);
            setFilteredPersonajesFemale(female);
            const male = datos.results.filter(personaje => personaje.gender === "Male");
            setMale(male);
            setFilteredPersonajesMale(male);
            const initialCharacters = datos.results.slice(0, 50);
            setPersonajes(initialCharacters);
            setFilteredPersonajes(initialCharacters)
        } catch (error){
            console.log("no se obtuvieron los datos")
        }
    };

    const handleSearch = (query) => {
        const filteredFemale = female.filter(personaje =>
            personaje.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPersonajesFemale(filteredFemale);
            const filteredMale = male.filter(personaje =>
                personaje.name.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredPersonajesMale(filteredMale);
    };

    const handleClickPersonaje = (personaje) => {
        onSelectedPersonaje(personaje);
    };


    return (
        <div>
            <h2>Buscar un personaje:</h2>
            <Buscador onSearch={handleSearch}/>
            <h2>Almacenar en el localStorage un nuevo personaje:</h2>
            <Crear />
            <h2>Personajes mujeres:</h2>
            <div className='lista-personajes'>
                {filteredPersonajesFemale.map(personaje => (
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
            <h2>Personajes hombres:</h2>
            <div className='lista-personajes'>
                {filteredPersonajesMale.map(personaje => (
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

