import React, {useState}from "react";

function Buscador({ onSearch }) {
    const[query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return(
        <div className="buscador">
            <input type="text" value={query} onChange={handleChange} placeholder="Buscar personaje..." />
        </div>
    );
}

export default Buscador;