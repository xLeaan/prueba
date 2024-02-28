import React, { useState } from "react";

function Crear() {
    const[name, setName] = useState('');
    const[species, setSpecies] = useState('');
    const[gender, setGender] = useState('');
    const[origin, setOrigin] = useState('');
    const[location, setLocation] = useState('');
    const[image, setImage] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();

    const nuevoPersonaje = { name, species, gender, origin, location, image};
    const personajesGuardados = JSON.parse(localStorage.getItem('personajes')) || [];
    const nuevosPersonajes = [...personajesGuardados, nuevoPersonaje];
    localStorage.setItem('personajes', JSON.stringify(nuevosPersonajes))

    setName('');
    setSpecies('');
    setGender('');
    setOrigin('');
    setLocation('');
    setImage('');

};

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name: " />
            <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="Specie: " />
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender: " />
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin: " />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location: " />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image: " />
            <button type="submit">Agregar personaje</button>
        </form>
    );
};

export default Crear;

