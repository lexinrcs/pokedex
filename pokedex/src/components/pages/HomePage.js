import React, { useEffect, useState} from 'react';


export default function HomePage(){
    const [pokemonCount, setPokemonCount] = useState();
    const [pokemonList, setPokemonList] = useState([]);

    const [hasMore, setHasMore] = useState(true);
    const [numberOfCards, setNumberOfCards] = useState();
    
    const [beenSorted, setBeenSorted] = useState(false);

    const [currentCards, setCurrentCards] = useState([]);
    
    useEffect(() => {
        fetchPokemonCount();
    }, []); //fetch once

    useEffect(() => {
        if(beenSorted){
            fetchAllPokemons();
        } else {
            fetchFixedCountPokemons(numberOfCards);
        }
        
        const currentPokemons = pokemonList.slice(0, numberOfCards);
        setCurrentCards(currentPokemons);
    }, [numberOfCards, pokemonList])
    
    const fetchPokemonCount = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1}`); //limit = 1; let's just fetch the number of pokemons provided by the api
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const pokemons = await response.json();
            setNumberOfCards(10);
            setPokemonCount(pokemons.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFixedCountPokemons = async (numberOfCards) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfCards}}`); //limit = 1; let's just fetch the number of pokemons provided by the api
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const pokemons = await response.json();
            setPokemonList(pokemons.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAllPokemons = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const allPokemons = await response.json();
            setNumberOfCards(10);
            setPokemonList(allPokemons.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLoadMore = () => {
        if ((numberOfCards+10) >= pokemonCount){
            setNumberOfCards(pokemonCount);
            setHasMore(false);
        } else {
            setNumberOfCards(numberOfCards + 10);
        }
    }

    return (
        <div>
            {currentCards.map((pokemon, index) => (
                <li><button key={pokemon.name} onClick={() => {console.log(pokemon)}}>{pokemon.name}</button></li>
            ))}

            <button onClick={handleLoadMore} disabled={!hasMore}>
                LOAD MORE
            </button>
        </div>
    );
}
