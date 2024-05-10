import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../organism/Navbar.js';

export default function ViewPokemon(){
    const { name } = useParams();

    const [pokemonData, setPokemonData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try{
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                setPokemonData(await response.json());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPokemonData();
    },[])

    if(loading){
        return(
            <div>
                Loading..
            </div>
        )
    } else{
        return(
            <div className='main-container h-min'>
                <NavBar/>
                <div className='pt-[200px]'>
                    {pokemonData.id}
                </div>
            </div>
        )
    }
}